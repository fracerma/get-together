//Requiring all needed modules
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();
const User = require("./models/index").User;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var socketArray = [];

////////////////////////////////////////////////////////////////
const sharedsession = require("express-socket.io-session");

const http = require("http");
const server = http.createServer(app);
const io = require("socket.io").listen(server);

//creo la sessione
const TWO_HOURS = 1000 * 60 * 60 * 2;
var sess = session({
  name: "sid",
  resave: false,
  saveUninitialized: false,
  secret: "ssh!secret",
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

//io.on("connection", function (socket) {
//socket.handshake.session.userId = 15;
//socket.handshake.session.save();
//console.log(socket);
//socketArray.push(socket);
//console.log("------------------", socketArray);
/////////////////////////////////////////////////////////////////

app.use(sess);

const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/login.html");
  } else next();
};

app.use("/profile.html", redirectLogin);

const redirectHome = (req, res, next) => {
  if (req.session.userId) {
    res.redirect("/");
  } else next();
};
app.use("/login.html", redirectHome);

app.post("/login", (req, res) => {
  const { userId } = req.session;
  if (userId) res.redirect("/profile.html");
  else {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ where: { email: email } }).then(function (user) {
      if (!user || !user.authenticate(password)) {
        res.redirect("/login.html");
      } else {
        req.session.userId = user.id;
        //////////////////////////////
        // socket.handshake.session.userId = user.id;
        // socket.handshake.session.save();
        // socketArray.push(socket);
        /////////////////////////////////////////
        res.redirect("/profile.html");
      }
    });
  }
});

app.use("/register.html", redirectHome);

app.post("/register", (req, res) => {
  console.log("Trying to login");

  const { userId } = req.session;
  if (userId) res.redirect("/profile.html");
  else {
    User.create(req.body);
    res.redirect("/login.html");
  }
});

// route for user logout
app.get("/logout", (req, res) => {
  if (req.session.userId) {
    req.session.destroy();
    ////////////////////////////////////
    // if (socket.handshake.session.userId) {
    //   delete socket.handshake.session.userId;
    //   socket.handshake.session.save();
    // }
    //////////////////////////////////////
    res.clearCookie("sid");
    res.redirect("/");
  }
});
module.exports = socketArray;
//});

const api = require("./api/main");

//////////////////////////////////////////////////////

const nots = require("./notifications/main");
app.use("/api", api);
app.use("/notification", nots);
app.set("socket.io", io);
app.set("express-socket.io-session", sharedsession);
app.use("/", express.static(__dirname + "/client/"));
///////////////////////////////////////////////////////

server.listen(4000);
