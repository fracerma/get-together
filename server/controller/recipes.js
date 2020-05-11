const express= require("express");
const router= express.Router();
//ottieni le ricette aggiunte dall'utente corrente
router.get("/",(req,res)=>{

});

//ottiene tutte le ricette aggiunte dagli utenti
router.get("/all",(req,res)=>{

});

//ottiene una ricetta nel db
router.get("/:id",(req,res)=>{

});

// Possibilità di aggiungere una ricetta al database:
//TODO gestione associazione ricetta con utente
router.post("/",async (req,res)=>{
  //prendi i dati dal body
    let data=req.body;
    //se è una ricetta presa da un sito web
    if(data.sourceUrl){
      //controllo che siano presenti alcuni campi obbligatori
      if(!data.dishTypes) res.status(400).send({message:"missing dishTypes params"}).end();
      if(!data.cuisines) res.status(400).send({message:"missing cuisines params"}).end();
      if(!data.diets) res.status(400).send({message:"missing diets params"}).end();
      if(!data.leng) res.status(400).send({message:"missing leng params"}).end();
      else{
        //faccio una richiesta a spoonacular per fare il parsing della ricetta
        axios.get(`https://api.spoonacular.com/recipes/extract?apiKey=${process.env.SPOONACULAR_KEY}&url=${data.sourceUrl}&forceExtraction=true`)
        .then(async (response)=>{
          //prendo il risultato e costruisco un oggetto da mettere nel database
          const ricetta= response.data;
          const obj={
            title: ricetta.title,
            image: ricetta.image,
            readyInMinutes: ricetta.readyInMinutes,
            servings: ricetta.servings,
            sourceUrl: ricetta.sourceUrl,
            dishTypes: data.dishTypes,
            cuisines: data.cuisines,
            diets: data.diets,
            instructions: ricetta.instructions,
            extendedIngredients: ricetta.extendedIngredients.map((el)=>{ 
              return {originalName: el.originalName, amount: el.amount,  unit: el.unit, measures: el.measures}
            }),
            leng: data.leng,
            type: "users_recipe_url"
          }
          console.log(obj);
          await Recipe.create(obj);
          //ritorno quello che ho aggiunto
          res.json(obj);
        })
        .catch((error)=>{
          console.error(error);
          res.status(400).send("Impossibile elaborare la richiesta: "+error+"\n");
        });
      }
    }
    else{
      //Controllo che ci siano tutti i parametri richiesti
      if(!data.title) res.status(400).send({message:"missing title params"}).end();
      else if(!data.image) res.status(400).send({message:"missing image params"}).end();
      else if(!data.readyInMinutes) res.status(400).send({message:"missing readyInMinutes params"}).end();
      else if(!data.servings) res.status(400).send({message:"missing servings params"}).end();
      else if(!data.dishTypes) res.status(400).send({message:"missing dishTypes params"}).end();
      else if(!data.cuisines) res.status(400).send({message:"missing cuisines params"}).end();
      else if(!data.diets) res.status(400).send({message:"missing diets params"}).end();
      else if(!data.extendedIngredients) res.status(400).send({message:"missing extendedIngredients params"}).end();
      else if(!data.analyzedInstructions) res.status(400).send({message:"missing analyzedInstructions params"}).end();
      else if(!data.leng) res.status(400).send({message:"missing leng params"}).end();
      else{
        data.type="users_recipe"  
        //TODO summary: su un'unica stringa
        const ricetta=await Recipe.create(obj);
        ricetta
        console.log(data);
        res.status(200).json(data);
      }
    }
  } 
);

module.exports= router;