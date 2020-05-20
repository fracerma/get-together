const express = require("express");
const router = express.Router();

const db = require("../models/index");

const redirectToLogin = require("./session").redirectLogin;
const bodyParser = require("body-parser");
const Op = require("sequelize").Op;
//uso la funzione redirect login presa dal file controller session, per controllare che l'utente sia connesso
router.use(bodyParser.json());

//post che permette di aggiungere un amico passando un id di un utente
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
      friends.map((el) => {
        return {
          id: el.User.id,
          firstName: el.User.firstName,
          lastName: el.User.lastName,
          email: el.User.email,
          image: el.User.image,
          status: el.status,
        };
      })
    );
  } catch(e) {
    const errObj = {
      name: e
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
