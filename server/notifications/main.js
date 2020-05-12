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
let sockets = require("../index");
const Notification = require("../models/index").Notification;

router.get("/", function (req, res) {
  let io = res.io;
  res.redirect("/profile1.html");
  /* io.on("connection", function (socket) {
    io.to(socket.id).emit("welcome", "Connesso al server in /notification");
    const currentId = req.session.userId;

    //controllo se il client e' gia' nell'array di connessioni
    //se ci sta sostituisco l'oggetto con la nuova websocket
    sockets.push({ clientId: currentId, socket: socket });

    console.log("sockets in connessione/reload---->: ", sockets);

    //Controllo se il client che si connette ha notifiche in sospeso e gliele invio.
    Notification.findAll({
      where: { destination: currentId, state: true },
    }).then(function (notRead) {
      console.log("notRead: ------>", notRead);
      for (n in notRead) {
        let e = n.event;
        let notId = n.id;
        let data = {
          source: n.source,
          destination: currentId,
          event: e,
          party: n.party,
          state: true,
        };

        // Manca ack che il client abbia ricevuto la notifica
        io.to(socket.id).emit(e, data);

        // Dopo che ho verificato che sia arrivato lo segno come letto
        Notification.findOne({ where: { id: notId } }).then(function (
          notification
        ) {
          // Check if record exists in db
          if (notification) {
            notification
              .update({
                state: false,
              })
              .success(function () {});
          }
        });
      }
    });

    io.to(socket.id).emit("newFriend", "Hello");

    //event e' un oggetto JSON che contiene dentro l'identificatore del destinatario
    io.on("newComment", function (event) {
      //Creo la notifica e la aggiungo al db e la setto di default a true, ovvero da leggere.
      try {
        Notification.create(event);
      } catch (e) {
        const errObj = {
          name: e.name,
          detail: e.parent.detail,
          code: e.parent.code,
        };
        console.log(errObj);
        res.status(400).send(errObj);
      }

      //Controllo che il client sia nell'array di socket e abbia una socket attiva
      let dst = event.destination;
      let dstSock = sockets.filter((x) => x.destination == dst).socket;

      //In caso positivo invio la notifica e la aggiorno nel db come false, ovvere non da leggere
      if (dstSock) {
        // Manca ack che il client abbia ricevuto la notifica
        io.to(dstSock.id).emit(event.event, event);

        // Dopo che ho verificato che sia arrivato lo segno come letto
        Notification.find({ where: { id: notId } }).then(function (
          notification
        ) {
          // Check if record exists in db
          if (notification) {
            notification
              .update({
                state: false,
              })
              .success(function () {});
          }
        });
      }
    });

    //In caso negativo non faccio nulla e la lascio indicata a true, ovvero da leggere

    io.on("newFriend", function (event) {});

    io.on("newInvitation", function (event) {});

    socket.on("disconnect", () => {
      console.log("Prima di disconnessione...---->", sockets);
      console.log(req.session.userId);
      let currObj = sockets.filter((x) => x.clientId != currentId);
      sockets = currObj;
      console.log("sockets in disconnessione: ---->", sockets);
    });
  });*/
});
module.exports = router;
