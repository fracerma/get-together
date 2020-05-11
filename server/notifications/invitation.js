const express = require("express");
const router = express.Router();
var array = require("../index.js");
console.log("array: ", array);

router.get("/", function (req, res) {
  var io = req.app.get("socket.io");
  res.redirect("/client.html");
  console.log(array);
  //io.on("connection", function (socket) {
  console.log("Connected succesfully to the socket ...");

  var news = [
    {
      type: "friend-request",
      data: "You have a new request",
    },
  ];

  // Send news on the socket
  io.to(array[0]).emit("friend-request", "ciao");

  socket.on("my other event", function (data) {
    console.log(data);
  });
  //});
});

module.exports = router;
