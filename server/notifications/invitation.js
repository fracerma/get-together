const express = require("express");
const router = express.Router();
let array = require("../controller/session").socketArray;
console.log(array);

router.get("/", function (req, res) {
  const userId = req.session.userId;
  let io = res.io;
  res.redirect("/client.html");
  let i = 0;
  let dst;
  let len = array.length;
  console.log(array);
  for (i = 0; i < len; i++) {
    if (array[i]["clientId"] == userId) {
      dst = array[i]["socketId"];
      break;
    }
  }
  console.log(dst);
  io.on("connection", function (socket) {
    //socket.emit("friend-request", "Ciao");
    io.to(dst.toString()).emit("friend-request", "Ciao");
    console.log("1: ", socket.id);
  });
});

module.exports = router;
