const express= require("express");
const router= express.Router();
const User = require("../models/index").User;
const Party = require("../models/index").Pary;
//ritorna tutti i party dell'utente corrente
router.get("/",(req,res)=>{

});

//aggiungi un party
router.post("/",async (req,res)=>{
    //questo deve avere un array di partecipanti, di id di ricette che sono già state aggiunte al db?
    //di birre, vini e cocktails
    try{
        const party= await Party.new({
            wines: req.body.wines,
            cocktails: req.body.cocktails,
            beers: req.body.beers
        });
        req.body.partecipants.forEach(async (el)=>{
            const friend= await User.findByPk(el);
            await party.setUser(friend);
        });
        await party.setUser(req.session.userId);
        await party.save();
    }catch(e){
        const errObj={
            name: e.name,
            detail: e.parent.detail,
            code: e.parent.code
        }
        console.log(errObj);
        res.status(400).send(errObj);
    }
});

//ottieni il party con id
router.get("/:id",(req,res)=>{

});
//modifica il party con id
router.put("/:id",(req,res)=>{

});
//elimina il party d'id
router.delete("/:id",(req,res)=>{

});
//ottiene tutti i commenti
router.get("/:id/comments",(req,res)=>{

});
//aggiunge un commento
router.post("/:id_party/comments",(req,res)=>{
    req.params.id_party
});
//visualizza un commento
router.get("/:party_id/comments/:comment_id",(req,res)=>{

});
//elimina un commento
router.delete("/:party_id/comments/:comment_id",(req,res)=>{

});


module.exports= router;