const express = require("express");
const router = express.Router();
let sockets = require("../index").sockets;
const Notification = require("../models/index").Notification;
const UserParty = require("../models/index").UserParty;
const User = require("../models/index").User;
const Party = require("../models/index").Party;
const Comment = require("../models/index").Comment;
const io = require("../index").io;

io.on("connection", function (socket) {
  let currentId;
  if (!socket.handshake.session.userId) socket.close();
  else {
    currentId = socket.handshake.session.userId;
    check(socket, currentId);

    Notification.findAll({ raw: true }).then((r) => {
      console.log(r);
    });

    //event e' un oggetto che contiene dentro l'identificatore del destinatario
    socket.on("newFriend", function (event) {
      //Creo la notifica e la aggiungo al db e la setto di default a true, ovvero da leggere.
      let not = {
        source: event.source,
        destination: event.destination,
        event: event.event,
        party: event.party,
        state: true,
      };
      notificate(not);
    });

    socket.on("newComment", async function (event) {
      //Questo oggetto viene creato da event dato hce vi sono anche altre info che non vogliamo
      try {
        //COME SI AGGIUNGONO ELEMENTI ALLE JOIN TABLE????
        //let c = await Comment.create(newComm);
        User.findByPk(event.source).then((user) => {
          user.setComments(event.party).then((sc) => {
            console.log(sc);
          });
        });
        //devo aggiungere io.emit(newCommentOn)
        //e broadcast
        broadcast(not);
      } catch (error) {
        console.error(error);
      }

      //Questo oggetto viene creato da event dato che vi sono anche altre info che non vogliamo

      //notificate(not);
    });

    socket.on("newInvitation", function (event) {
      let not = {
        source: event.source,
        destination: event.destination,
        event: event.event,
        party: event.party,
        state: true,
      };
      notificate(event);
    });

    socket.on("joined", function (event) {
      let partyId = event.party;
      console.log("Sono dentro joined" + partyId);
      let userId = event.source;
      //COME SI AGGIUNGONO ELEMENTI ALLE JOIN TABLE????
      /*User.findByPk(userId).then((user) => {
        user.setParties(partyId).then((sc) => {
          console.log(sc);
        });
      });*/
      //UserParty.create(userId, partyId).then(broadcast(event));
      broadcast(event);
    });

    socket.on("disconnect", () => {
      let currObj = sockets.filter((x) => x.clientId != currentId);
      sockets = currObj;
    });
  }
});

async function notificate(event) {
  console.log("event---->notficate: ", event);
  try {
    //Mi trovo il nome della sorgente della notifica
    const not = await createNotification(event);
    //Creo un oggetto da inviare come notifica che non contiene gli Id
    //ma solo il nome della source e altre info

    //  SE LA NOTIFCA NON E' RELATIVA AD UN PARTY COSA SUCCEDE??? IL PARTY NON SI TROVA E...???
    Notification.create(event).then((toSend) => {
      //Controllo che il client sia nell'array di socket e abbia una socket attiva
      let dstId = event.destination;
      let dstSock = sockets.filter((x) => x.clientId == dstId)[0];

      //In caso positivo invio la notifica e la aggiorno nel db come false, ovvere non da leggere
      if (dstSock != undefined) {
        // Manca ack che il client abbia ricevuto la notifica
        io.to(dstSock.socket.id).emit(not.event, not);

        // Dopo che ho verificato che sia arrivato lo segno come letto
        Notification.findOne({
          where: { id: toSend.id },
        }).then(function (notification) {
          // Check if record exists in db
          if (notification) {
            notification.update({
              state: false,
            });
          }
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
}

async function check(socket, currentId) {
  io.to(socket.id).emit("welcome", currentId);

  //controllo se il client e' gia' nell'array di connessioni
  sockets.push({ clientId: currentId, socket: socket });

  console.log("sockets in connessione/reload---->: ", sockets);

  //Controllo se il client che si connette ha notifiche in sospeso e gliele invio.
  try {
    const notRead = await Notification.findAll({
      raw: true,
      where: { destination: currentId, state: true },
    });
    let i = 0;
    console.log(notRead);
    let len = notRead.length;
    for (i = 0; i < len; i++) {
      let n = notRead[i];
      let e = n.event;
      var notId = n.id;
      // Mi devo prendere il nome del party e della sorgente del commento:
      const not = await createNotification(n);
      // Manca ack che il client abbia ricevuto la notifica
      console.log(socket.id);
      io.to(socket.id).emit(e, not);

      // Dopo che ho verificato che sia arrivato lo segno come letto
      await Notification.update({ state: false }, { where: { id: notId } });
    }
  } catch (error) {
    console.error(error);
  }
}

function broadcast(event) {
  let partyId = event.party;
  let userId = event.source;
  let e = event.event;
  UserParty.findAll({
    raw: true,
    where: { partyId: partyId },
  }).then((array) => {
    for (r in array) {
      let not = {
        source: userId,
        destination: r.userId,
        event: e,
        comment: event.comment,
        party: partyId,
        state: true,
      };
      notificate(not);
    }
  });
}

/*------- LEGENDA EVENTI---------

1. newComment: ogni qual volta un utente scrive un nuovo messaggio relativo ad un party emette l'evento 
              che viene inviato in broadcast poi a tutti i componenti del party 

2. newCommentOn: evento che viene generato dal server per tutti coloro che si trovano sulla pagina effettiva del party cosi che possono visualizzare informazioni sul commento in tempo reale 

3. newInvitation: evento che segnala un invito ad un party 
    3.1 deny: non succede nulla 
    3.2 joined: l'utente ha deciso di partecipare e quindi viene inviata una notifica in broadcast a tutti i componenti del party 

4. newFriend: evento che si genera quando si invia una richiesta di amicizia
    4.1 deny: non succede nulla
    4.2 joined: l'utente ha accettato l'amicizia e quindi viene aggiunto un'amicizia in Friendship


    let data = {
        source: n.source,
        destination: currentId,
        event: e,
        party: n.party,
        state: true,
      };

*/

async function createNotification(event) {
  try {
    const user = await User.find({ raw: true, where: { id: event.source } });
    const party = await Party.find({ raw: true, where: { id: event.source } });
    // Se l'evento riguardo un commento, mi prendo l'oggetto relativo al commento e lo invio
    const comment = await Comment.find({
      raw: true,
      where: { id: event.comment },
    });
    const not = {
      source: user,
      party: party,
      comment: comment,
      event: event.event,
      state: true,
    };
    return not;
  } catch (error) {
    console.error(error);
  }
}

//module.exports.socketArray = sockets;
module.exports = router;
//module.exports.notificate = notificate;
//module.exports.broadcast = broadcast;
