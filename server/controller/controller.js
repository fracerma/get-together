const express = require("express");
const router = express.Router();

const session = require("./session");
const user = require("./user");
const recipes = require("./recipes");
const parties = require("./parties");
const friends = require("./friends");
const nots = require("./notifications");

const redirectToLogin = require("./session").redirectLogin;

router.use("/", session);
//router.use("/friends", friends);

router.use("/user", user);
router.use("/recipes", recipes);

router.use("/parties", parties);
router.use("/friends", friends);
router.use("/notifications", nots);
//router.use("/parties", redirectToLogin, parties);
//router.use("/notifications", redirectToLogin, nots)
//router.use("/friends", redirectToLogin, friends);
//router.use("/user", redirectToLogin, user);
//router.use("/recipes", redirectToLogin, recipes);

module.exports = router;
