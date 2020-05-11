const express = require("express");
const router = express.Router();

//const comments = require("./comments");
//const friend = require("./friend");
const invitation = require("./invitation");

//router.use("/comments", comments);
//router.use("/friend", friend);
router.use("/invitation", invitation);

module.exports = router;
