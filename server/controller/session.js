const express = require("express");
const router = express.Router();
const session = require("express-session");
const User= require("../models/index").User;

//creo la sessione inserendola nel middleware, dandogli un tempo di vita di due ore
//TODO da studiare la criptazione
const TWO_HOURS= 1000* 60 * 60 *2;
router.use(session({
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
    }
}));

//funzione che controlla se vi è una sessione, in caso negativo redirige alla pagina di login
const redirectLogin = (req,res,next)=>{
    if(!req.session.userId){
        res.redirect('/login.html');
    }
    else next();
}
//nel caso di quaunque richiesta al profile.html applico la funzione rediretLogin
router.get("/profile.html",redirectLogin);

//funzione che controlla se vi è una sessione, in caso affermativo redirige all'Homepage
const redirectHome = (req,res,next)=>{
    if(req.session.userId){
        res.redirect('/');
    }
    else next();
}

//nel caso di quaunque richiesta al profile.html applico la funzione rediretHome
router.get("/login.html",redirectHome);

router.post("/login",redirectHome,async (req,res)=>{
    const email = req.body.email,
            password = req.body.password;
    try{
        const user = await User.findOne({ where: { email: email } })            
        if (!user||!user.authenticate(password)) {
            res.redirect('/login.html');
        } else {
            req.session.userId = user.id;
            res.redirect('/');
        }
    }
    catch(e){
        const errObj={
            name: e.name,
            detail: e.parent.detail,
            code: e.parent.code
        }
        console.log(errObj);
        res.status(400).send(errObj);
    };
});

//nel caso di quaunque richiesta al register.html applico la funzione rediretHome
router.get("/register.html",redirectHome);

router.post("/register",redirectHome,async (req,res)=>{
    //TODO controlli vari di registrazione?
    try{
        await User.create(req.body);
        res.redirect("/login.html");
    }
    catch(e){
        const errObj={
            name: e.name,
            detail: e.parent.detail,
            code: e.parent.code
        }
        console.log(errObj);
        res.status(400).send(errObj);
    }
});

// route for user logout
router.get('/logout', (req, res) => {
    if (req.session.userId) {
        req.session.destroy();
        res.clearCookie("sid");
        res.redirect('/');
    }
});

//FIXME temporaneo
router.get("/recipes.html",redirectLogin);

module.exports.router = router;
module.exports.redirectLogin = redirectLogin;
