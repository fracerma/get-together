//Requiring all needed modules
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var https = require('https');
var fs = require('fs');

  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const api = require("./api/api");
const controller= require("./controller/controller");

app.use("/api", api);
app.use("/", controller);
app.use("/", express.static(__dirname + "/client/"));

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
.listen(4000, function () {
  console.log('Go to https://localhost:4000/')
})