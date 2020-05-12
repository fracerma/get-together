/*const express = require("express");
const router = express.Router();

//const comments = require("./comments");
//const friend = require("./friend");
const invitation = require("./invitation");

//router.use("/comments", comments);
//router.use("/friend", friend);
router.use("/invitation", invitation);

module.exports = router;*/
const express = require("express");
const router = express.Router();
let sockets = require("../index").sockets;
const Notification = require("../models/index").Notification;
const io = require("../index").io;

router.get("/", function (req, res) {
  let io = res.io;
  res.redirect("/profile1.html");
  console.log(req.session.userId);
});

io.on("connection", function (socket) {
  if (socket.handshake.session.userId) {
    currentId = socket.handshake.session.userId;
    io.to(socket.id).emit("welcome", currentId);
    //io.to(socket.id).emit("newFriend", currentId);

    //controllo se il client e' gia' nell'array di connessioni
    //se ci sta sostituisco l'oggetto con la nuova websocket
    sockets.push({ clientId: currentId, socket: socket });

    console.log("sockets in connessione/reload---->: ", sockets);

    //Controllo se il client che si connette ha notifiche in sospeso e gliele invio.

    Notification.findAll({
      raw: true,
      where: { destination: currentId, state: true },
    }).then((notRead) => {
      let i = 0;
      console.log(notRead);
      let len = notRead.length;
      for (i = 0; i < len; i++) {
        //console.log(n);
        let n = notRead[i];
        let e = n.event;

        var notId = n.id;
        let data = {
          source: n.source,
          destination: currentId,
          event: e,
          party: n.party,
          state: true,
        };

        // Manca ack che il client abbia ricevuto la notifica
        console.log(socket.id);
        io.to(socket.id).emit(e, data);
        //console.log("event: ", e);

        // Dopo che ho verificato che sia arrivato lo segno come letto
        Notification.findOne({ where: { id: notId } }).then(function (
          notification
        ) {
          // Check if record exists in db
          if (notification) {
            notification.update({
              state: false,
            });
          }
        });
      }
    });
    socket.on("disconnect", () => {
      console.log("Prima di disconnessione...---->", sockets);
      let currObj = sockets.filter((x) => x.clientId != currentId);
      sockets = currObj;
      console.log("sockets in disconnessione: ---->", sockets);
    });

    //event e' un oggetto JSON che contiene dentro l'identificatore del destinatario
    socket.on("newFriend", function (event) {
      console.log(event);
      //Creo la notifica e la aggiungo al db e la setto di default a true, ovvero da leggere.
      Notification.create(event).then((toSend) => {
        //Controllo che il client sia nell'array di socket e abbia una socket attiva
        console.log("sono dentro newFriend");
        let dst = event.destination;
        let dstSock = sockets.filter((x) => x.clientId == dst)[0];

        //In caso positivo invio la notifica e la aggiorno nel db come false, ovvere non da leggere
        console.log("idDest: ", dstSock);
        if (dstSock != undefined) {
          // Manca ack che il client abbia ricevuto la notifica
          io.to(dstSock.socket.id).emit(event.event, event);

          // Dopo che ho verificato che sia arrivato lo segno come letto
          Notification.findOne({ where: { id: toSend.id } }).then(function (
            notification
          ) {
            // Check if record exists in db
            if (notification) {
              notification.update({
                state: false,
              });
            }
          });
        }
      });
    });
    io.on("newComment", function (event) {});

    io.on("newInvitation", function (event) {});
  }
});

//In caso negativo non faccio nulla e la lascio indicata a true, ovvero da leggere

module.exports = router;
