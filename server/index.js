//Requiring all needed modules
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

////////////////////////////////////////
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
var sockets = [];
module.exports = sockets;
//////////////////////////////////////////

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const api = require("./api/api");
const controller = require("./controller/controller");

app.use(function (req, res, next) {
  res.io = io;
  next();
});

app.use("/api", api);

app.use("/", controller);

app.use("/", express.static(__dirname + "/client/"));

//////////////////////////////////////////////////
const nots = require("./notifications/main");
app.use("/notification", nots);

//console.log(array);

////////////////////////////////////////////////////
server.listen(4000, "192.168.1.114");
