const express= require("express");
const bodyParser=require("body-parser");

const app= express();
app.use(bodyParser.json());

app.use("/", express.static(__dirname + "/client/"));

const api= require("./api/main");

app.use("/api", api );

app.listen(4000);