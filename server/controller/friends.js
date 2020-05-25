const express = require("express");
const router = express.Router();
const User = require("../models/index").User;
const UserParty = require("../models/index").UserParty;
const Recipe = require("../models/index").Recipe;
const Friendship = require("../models/index").Friendship;
const Party = require("../models/index").Party;
const Comment = require("../models/index").Comment;
const notificate = require("./notifications").notificate;
const broadcast = require("./notifications").broadcast;
const bodyParser = require("body-parser");
const { Op } = require("sequelize");


router.use(bodyParser.json({ type: "application/vnd.api+json" }));


router.post("/", async function (req, res) {
  const sourceId = req.session.userId;
  console.log(sourceId);
  const dstId = req.body.id;
  console.log(dstId)
  let checkUser = null;
  try {
    if( dstId != sourceId )
      checkUser = await User.findOne({ where: { id: dstId}});
    if(!checkUser) res.send(false);
  else{
    const dstId = checkUser.id;
    const relObj = { UserId: sourceId, FriendId: dstId, status: "pending" };
    const exist = await Friendship.findOne({
      where: { UserId: sourceId, FriendId: dstId },
    });
    const not = {
      source: sourceId,
      destination: dstId,
      comment: 0,
      party: 0,
      event: "newFriend",
      state: true,
    };
    if (!exist) {
      const relation = await Friendship.create(relObj);
      notificate(not);
    } else if (exist && exist.status == "rejected") {
      exist.status = "pending";
      exist.update({ status: "pending" }).then(function () {});
      exist.save().then(function () {});
      notificate(not);
    }
    res.send(true);
  }
  } catch (e) {
    console.error(e);
  }
});

router.post("/response", async function (req, res) {
  const sourceId = req.session.userId;
  const dstId = req.body.dstId;
  const decision = req.body.decision;
  try {
    const senderFriendship = await Friendship.findOne({
      where: { FriendId: sourceId, UserId: dstId },
    });
    if (senderFriendship) {
      if (senderFriendship.status == "pending") {
        console.log(senderFriendship);
        senderFriendship.status = decision;
        senderFriendship.update({ status: decision }).then(function () {});
        senderFriendship.save().then(function () {});
        const exist = await Friendship.findOne({
          where: { UserId: sourceId, FriendId: dstId },
        });
        const not = {
          source: sourceId,
          destination: dstId,
          comment: 0,
          party: 0,
          event: "accept",
          state: true,
        };
        if (decision == "accepted" && !exist) {
          relObj = { UserId: sourceId, FriendId: dstId, status: "accepted" };
          const relation = await Friendship.create(relObj);
          notificate(not);
        } else if (exist && decision == "accepted") {
          exist.update({ status: decision }).then(function () {});
          exist.save().then(function () {});
          notificate(not);
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
  //const relation = await Friendship.create(relObj);
});

router.post("/remove", async function (req, res) {
  const sourceId = req.session.userId;
  const friendId = req.body.friendId;
  try{
     await Friendship.destroy({
       where: {UserId: sourceId, FriendId: friendId}
     });
     await Friendship.destroy({
       where: { UserId: friendId, FriendId: sourceId }
     });
   }catch(e){
     console.error(e);
   }
});


module.exports = router;
