const express = require("express");
const router = express.Router();

const db = require("../models/index");
const User = require("../models/index").User;

const redirectToLogin = require("./session").redirectLogin;
const bodyParser = require("body-parser");
const Op = require("sequelize").Op;
//uso la funzione redirect login presa dal file controller session, per controllare che l'utente sia connesso
router.use(bodyParser.json());

//post che permette di aggiungere un amico passando un id di un utente

router.get("/info", async function(req, res){
  const userId = req.session.userId;
  try{
    const profile = await db.User.findOne({ raw: true, where: {id: userId}})
    const final = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      image: profile.image,
    }
    res.send(final);
  }catch(e){
    console.error(e);
  }

})

router.put("/update", async function(req, res){
  const userId = req.session.userId;
  const name = req.body.name;
  const lastName = req.body.lastName;
  const email = req.body.email;
  try{
    let user = await User.findByPk(userId);
    if( name ){
      await user.update({firstName: name}).then(()=>{});
    }
    if (lastName) {
      await user.update({ lastName: lastName }).then(() => { });
    }
    if (email) {
      await user.update({ email: email }).then(() => { });
    }
    res.send(true);
  }catch(e){
    console.error(e);
  }
})

router.post("/friend", async (req, res) => {
  const userId = req.session.userId;
  try {
    await db.Friendship.friendRequest(userId, req.body.friendId);
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

router.get("/friend", async (req, res) => {
  const userId = req.session.userId;
  try {
    let friends = await db.Friendship.findAll({
      where: {
        UserId: userId,
      },
      include: db.User,
    });
    res.send(
      friends.filter(el => el.status != "rejected").map((el) => {
          return {
            id: el.User.id,
            firstName: el.User.firstName,
            lastName: el.User.lastName,
            email: el.User.email,
            status: el.status,
        };
      
      })
    );
  } catch {
    const errObj = {
      name: e.name,
      detail: e.parent.detail,
      code: e.parent.code,
    };
    console.log(errObj);
    res.status(400).send(errObj);
  }
});

router.post("/accept", async (req, res) => {
  const userId = req.session.userId;
  try {
    await db.Friendship.acceptRequest(userId, req.body.friendId);
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

router.get("/search", (req, res) => {
  try {
    //TODO SQL INJECTION
    let users = db.User.findAll({
      where: {
        fistName: {
          [Op.like]: `%${req.body.query}%`,
        },
      },
    });
    console.log(users);
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

module.exports = router;
