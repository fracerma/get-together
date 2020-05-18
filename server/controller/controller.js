const express = require("express");
const router = express.Router();

const session = require("./session");
const user = require("./user");
const recipes = require("./recipes");
const parties = require("./parties");

const redirectToLogin = require("./session").redirectLogin;

router.use("/", session);
router.use("/user", redirectToLogin, user);
router.use("/recipes", redirectToLogin, recipes);
//router.use("/parties", redirectToLogin, parties);
router.use("/parties", parties);

module.exports = router;
