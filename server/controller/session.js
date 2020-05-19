const express = require("express");
const router = express.Router();
const session = require("express-session");
const User = require("../models/index").User;
const sharedsession = require("express-socket.io-session");
const io = require("../index").io;

//creo la sessione inserendola nel middleware, dandogli un tempo di vita di due ore
//TODO da studiare la criptazione

const TWO_HOURS = 1000 * 60 * 60 * 2;

var sess = session({
  //nome del cookie
  name: "sid",
  resave: false,
  saveUninitialized: false,
  //chiave per la criptazione
  secret: "ssh!secret",
  //parametri del cookie
  cookie: {
    maxAge: TWO_HOURS,
    sameSite: true,
  },
});

io.use(
  sharedsession(sess, {
    autoSave: true,
  })
);

router.use(sess);

//funzione che controlla se vi è una sessione, in caso negativo redirige alla pagina di login
const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login.html");
  } else next();
};

//creo la sessione inserendola nel middleware, dandogli un tempo di vita di due ore
//TODO da studiare la criptazione

const redirectFrontpage = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/frontpage.html");
  } else next();
};

//funzione che controlla se vi è una sessione, in caso affermativo redirige all'Homepage
const redirectHome = (req, res, next) => {
  if (req.session.userId) {
    res.redirect("/");
  } else next();
};

router.get("/", redirectFrontpage);

//nel caso di quaunque richiesta al profile.html applico la funzione rediretHome
router.get("/login.html", redirectHome);

router.post("/login", redirectHome, async (req, res) => {
  const email = req.body.email,
    password = req.body.password;
  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user || !user.authenticate(password)) {
      res.redirect("/login.html");
    } else {
      req.session.userId = user.id;

      res.redirect("/");
    }
  } catch (e) {
    const errObj = {
      name: e.name,
      detail: e.parent.detail,
      code: e.parent.code,
    };
    console.log(errObj);
    res.status(400).send(errObj);
  }
});

//nel caso di quaunque richiesta al register.html applico la funzione rediretHome
router.get("/register.html", redirectHome);

router.post("/register", redirectHome, async (req, res) => {
  //TODO controlli vari di registrazione?
  try {
    await User.create(req.body);
    res.redirect("/login.html");
  } catch (e) {
    const errObj = {
      name: e.name,
      detail: e.parent.detail,
      code: e.parent.code,
    };
    console.log(errObj);
    res.status(400).send(errObj);
  }
});
router.get("/oauthfb", redirectHome, async (req, res) => {
  res.redirect(
    `https://www.facebook.com/v7.0/dialog/oauth?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=https://localhost:4000/loginfb&state={st=1234}&scope=email,user_friends`
  );
});

router.get("/loginfb", redirectHome, async (req, res) => {
  if (req.query.code) {
    const actok = (
      await axios.get(
        `https://graph.facebook.com/v7.0/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&redirect_uri=https://localhost:4000/loginfb&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&code=${req.query.code}`
      )
    ).data.access_token;

    try {
      const apptoken = await axios.get(
        `https://graph.facebook.com/oauth/access_token?client_id=${process.env.FACEBOOK_CLIENT_ID}&client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&grant_type=client_credentials`
      );
      const response = (
        await axios.get(
          `https://graph.facebook.com/v7.0/debug_token?input_token=${actok}&access_token=${apptoken.data.access_token}`
        )
      ).data;
      if (response.data.is_valid) {
        console.log("access token verificato !! ");

        //se ci sta l'idfb nel database
        let user = await User.findOne({
          where: { idfb: response.data.user_id },
        });
        if (user) {
          req.session.userId = user.id;
          user.accessToken = actok;
          await user.save();
          res.redirect("/");
        }
        //se non ci sta idfb ma ci sta l'email nel database
        else {
          const emailtrovata = (
            await axios.get(
              `https://graph.facebook.com/${response.data.user_id}?fields=email&access_token=${actok}`
            )
          ).data.email;
          user = await User.findOne({ where: { email: emailtrovata } });
          if (user) {
            req.session.userId = user.id;
            user.idfb = response.data.user_id;
            user.accessToken = actok;
            await user.save();
            res.redirect("/");
          }
          //se non ci sta nessuna delle due
          else {
            res.redirect("/register.html");
          }
        }
      }
      //se non ci sta idfb ma ci sta l'email nel database
      else {
        const emailtrovata = (
          await axios.get(
            `https://graph.facebook.com/${response.data.user_id}?fields=email&access_token=${actok}`
          )
        ).data.email;
        user = await User.findOne({ where: { email: emailtrovata } });
        if (user) {
          console.log("ciao");
          req.session.userId = user.id;
          user.idfb = response.data.user_id;
          user.accessToken = actok;
          await user.save();
          res.redirect("/profile.html");
        }
        //se non ci sta nessuna delle due
        else {
          res.redirect("/register.html");
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
});

// route for user logout
router.get("/logout", (req, res) => {
  if (req.session.userId) {
    req.session.destroy();
    res.clearCookie("sid");
  }
  res.redirect("/");
});

module.exports = router;
module.exports.redirectLogin = redirectLogin;
/////////////////////////////////////////////////////
