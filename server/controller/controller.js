const express= require("express");
const router= express.Router();


const session= require("./session").router;
const user=require("./user");
const recipes=require("./recipes");
const parties=require("./parties");

router.use("/", session);
router.use("/user", user);
router.use("/recipes",recipes);
router.use("/parties",parties);

module.exports= router;