const express = require("express");
const router = express.Router();

const session = require("./session");
const user = require("./user");
const recipes = require("./recipes");
const parties = require("./parties");

const redirectToLogin = require("./session").redirectLogin;

router.use("/", parties);
router.use("/user", redirectToLogin, user);
router.use("/recipes", redirectToLogin, recipes);
//FIXME remove comment
router.use("/parties", /*redirectToLogin,*/ parties);

module.exports = router;
