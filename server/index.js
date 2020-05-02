//Requiring all needed modules
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db= require("./models/index");

app.use(bodyParser.json());

app.use("/", express.static(__dirname + "/client/"));

const api = require("./api/main");

app.use("/api", api);

app.get("/prova",async (req,res)=>{
    let user2= (await db.User.findOne({where: {id:3}}));
    //await user1.setFriends(user2);
    console.log(await user2.getFriends());
});

app.listen(4000);
