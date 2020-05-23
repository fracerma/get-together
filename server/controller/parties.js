const express = require("express");
const router = express.Router();
const User = require("../models/index").User;
const UserParty = require("../models/index").UserParty;
const Recipe = require("../models/index").Recipe;
const Friendship = require("../models/index").Friendship;
const Party = require("../models/index").Party;
const Comment = require("../models/index").Comment;
const notificate = require("./notifications").notificate;
const broadcast = require("./notifications").broadcast;
const bodyParser = require("body-parser");
const { Op } = require("sequelize");

router.use(bodyParser.json());
router.use(bodyParser.json({ type: "application/vnd.api+json" }));

//ritorna tutti i party dell'utente corrente
router.get("/", async (req, res) => {
  try{
    const user= await User.findByPk(req.session.userId);
    const party= await user.getParties({
      raw: true,
      where: {
        owner: req.session.userId
      }
    
    });
    console.log(party);
    res.send(party);
  }
  catch(e){
    console.log(e);
  }
});

//ritorna tutti i parties a cui l'utente è stato invitato
router.get("/other", async (req, res) => {
  try{
    const user= await User.findByPk(req.session.userId);
    const party= await user.getParties({
      raw: true,
      where: {
        owner: {[Op.ne]: req.session.userId}
      }
    });
    console.log(party);
    res.send(party);
  }
  catch(e){
    console.log(e);
  }
});

//aggiungi un party
router.post("/", async (req, res) => {
  //questo deve avere un array di partecipanti, di id di mie ricette che sono già state aggiunte al db?
  //di birre, vini e cocktails
  sourceId = req.session.userId;
  try {
    const ownerObj = await User.findOne({ where: { id: sourceId } });
    const apiRecipes=req.body.recipes.filter(el=>el.type==="api_recipe");
    const userRecipes=req.body.recipes.filter(el=>el.type==="user_recipe");
    console.log(apiRecipes,userRecipes);
    
    const party = await Party.create({
      name: req.body.name,
      owner: sourceId,
      wines: req.body.wines,
      cocktails: req.body.cocktails,
      startDate: req.body.startDate,
      finishDate: req.body.finishDate,
      apiRecipes: apiRecipes,
      beers: req.body.beers
    });
    userRecipes.forEach(async el=>{
        const recipe= await Recipe.findByPk(el.id);
        await party.addUserRecipe(recipe);
    });

    let people = req.body.partecipants;
    //req.body.partecipants.forEach(async (el) => {
    let i = 0;
    await party.addUser(ownerObj, { through: { status: "accepted" } });
    for (; i < people.length; i++) {
      console.log(people[i]);
      const friend = await User.findOne({ where: { id: people[i] } });
      await party.addUser(friend, { through: { status: "pending" } });
    }
    for (i = 0; i < people.length; i++) {
      let not = {
        source: sourceId,
        destination: people[i],
        party: party.id,
        event: "newInvitation",
        comment: 0,
        state: true,
      };
      notificate(not);
    }
    // /broadcast(not);
    res.send(party);
  } catch (e) {
    const errObj = {
      name: e
      //detail: e.parent.detail,
      //code: e.parent.code,
    };
    console.log(errObj);
    res.status(400).send(e);
  }
});

//ottieni il party con id e carica tutti i commenti e le info relative
router.get("/:id", async function (req, res) {
  const partyId = req.params.id;
  console.log(partyId);
  try {
    //const comments = []; //await Party.getComments(partyId); //Devo fare una chiamata al db che ritorna tutti i commenti relativi ad un party

    const party = await Party.findOne({
      //raw: true,
      where: { id: partyId },
      include: [
        {
          // Notice `include` takes an ARRAY
          model: User,
          attributes: ["firstName", "id", "email"],
        },
        {
          model: Comment,
          //where: { PartyId: partyId },
          attributes: ["id", "UserId", "text", "createdAt"],
        },
        {
          model: Recipe,
          as:"userRecipes",
          attributes: { exclude: ['PartyRecipe'] }
        }
      ],
      //
    });

    console.log(JSON.stringify(party));

    let response = party;
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});
//modifica il party con id
router.put("/:id", (req, res) => {});
//elimina il party d'id
router.delete("/:id", (req, res) => {});

//aggiunge un commento
router.post("/:id/comment", async function (req, res) {
  const sourceId = req.session.userId;
  const commentTxt = req.body.commentTxt;
  const partyId = req.params.id;
  let newCommObj = {
    text: commentTxt,
    PartyId: partyId,
    UserId: sourceId,
  };

  console.log(newCommObj);
  try {
    //COME SI AGGIUNGONO ELEMENTI ALLE JOIN TABLE???
    const newComm = await Comment.create(newCommObj);
    let not = {
      source: sourceId,
      party: partyId,
      event: "newComment",
      comment: newComm.id,
      state: true,
    };
    console.log(not);
    broadcast(not);
  } catch (error) {
    console.error(error);
  }
});

router.post("/:id/response", async function (req, res) {
  const partyId = req.params.id;
  const partecipantId = req.session.userId;
  const decision = req.body.decision;
  try {
    const person = await UserParty.findOne({
      //raw: true,
      where: { UserId: partecipantId, PartyId: partyId },
    });
    // Check if record exists in db
    console.log(person);
    if (person.status == "pending") {
      person.status = decision;
      person.save().then(function () {});
      if (decision == "accepted") {
        const not = {
          source: partecipantId,
          party: partyId,
          event: "joined",
          comment: [],
          state: true,
        };
        console.log(decision);
        await broadcast(not);
      }
    }
  } catch (error) {
    console.error(error);
  }
});

//Non serve
//visualizza un commento
router.get("/:party_id/comments/:comment_id", (req, res) => {});

//elimina un commento
router.delete("/:party_id/comments/:comment_id", (req, res) => {});

module.exports = router;
