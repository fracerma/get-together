const express = require("express");
const router = express.Router();
const User = require("../models/index").User;
const UserParty = require("../models/index").UserParty;
const Recipe = require("../models/index").Recipe;
const Friendship = require("../models/index").Friendship;
const Party = require("../models/index").Party;
const Comment = require("../models/index").Comment;
const notificate = require("../notifications/main").notificate;
const broadcast = require("../notifications/main").broadcast;
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.json({ type: "application/vnd.api+json" }));

router.get("/", function (req, res) {});

router.post("/", async function (req, res) {
  const sourceId = req.body.userId;
  const dstId = req.body.dstId;

  const relObj = { UserId: sourceId, FriendId: dstId, pending: true };
  try {
    const exist = await Friendship.findOne({
      where: { UserId: sourceId, FriendId: dstId },
    });
    if (!exist) {
      const relation = await Friendship.create(relObj);
      const not = {
        source: sourceId,
        destination: dstId,
        comment: 0,
        party: 0,
        event: "newFriend",
        state: true,
      };
      notificate(not);
    }
  } catch (e) {
    console.error(e);
  }
});

router.post("/response", async function (req, res) {
  const sourceId = req.body.userId;
  const dstId = req.body.dstId;
  const decision = req.body.decision;
  try {
    const senderFriendship = await Friendship.findOne({
      where: { FriendId: sourceId },
    });
    if (senderFriendship) {
      senderFriendship.pending = decision;
      senderFriendship.save().then(function () {});
      console.log(decision);
      if (decision == "false") {
        relObj = { UserId: sourceId, FriendId: dstId, pending: true };
        const relation = await Friendship.create(relObj);
        const not = {
          source: sourceId,
          destination: dstId,
          comment: 0,
          party: 0,
          event: "accept",
          state: true,
        };
        notificate(not);
      }
    }
  } catch (e) {
    console.error(e);
  }

  //const relation = await Friendship.create(relObj);
});
module.exports = router;
