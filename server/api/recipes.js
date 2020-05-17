const express= require("express");
const bodyParser=require("body-parser");
const axios= require("axios");
require("dotenv").config();
const Recipe= require("../models/index").Recipe;
const User= require("../models/index").User;


const router = express.Router();

router.use(bodyParser.json());


//ricerco spoonacular cuisine diets intolerances
router.get('/', function(req, res) {
  const query=req.url;
  axios.get(`https://api.spoonacular.com/recipes/search${query}&instructionsRequired=true&apiKey=${process.env.SPOONACULAR_KEY}`)
  .then((response)=>{
    let result=response.data.results;
    result=result.map((ricetta)=>{return ricetta.id});
    return axios.get(`https://api.spoonacular.com/recipes/informationBulk?ids=${result.toString()}&apiKey=${process.env.SPOONACULAR_KEY}`)
  }).then((response)=>{
    let result=response.data;
    result=result.map((ricetta)=>{
      let obj= {
        title: ricetta.title,
        image: ricetta.image,
        readyInMinutes: ricetta.readyInMinutes,
        servings: ricetta.servings,
        sourceUrl: ricetta.sourceUrl,
        dishTypes: ricetta.dishTypes,
        cuisines: ricetta.cuisines,
        diets: ricetta.diets,
        instructions: ricetta.instructions,
        extendedIngredients: ricetta.extendedIngredients.map((el)=>{ 
          return {originalName: el.originalName, amount: el.amount,  unit: el.unit, measures: el.measures}
        }),
        analyzedInstructions:ricetta.analyzedInstructions,
        summary: ricetta.summary,
        leng: "en",
        type: "api_recipe"
      }
      return obj
    });
    //ritorno quello che ho trovato
    res.json(result);
  })
  .catch((error)=>{
    console.error(error);
    res.status(500).end(error);
  });
});

  

//ricerco ricette spoonacular random, per tags
router.get('/random', function(req, res) {
  const query=req.url;
  axios.get(`https://api.spoonacular.com/recipes${query}&apiKey=${process.env.SPOONACULAR_KEY}`)
  .then((response)=>{
    let result=response.data.recipes;
    result=result.map((ricetta)=>{
      let obj= {
        title: ricetta.title,
        image: ricetta.image,
        readyInMinutes: ricetta.readyInMinutes,
        servings: ricetta.servings,
        sourceUrl: ricetta.sourceUrl,
        dishTypes: ricetta.dishTypes,
        cuisines: ricetta.cuisines,
        diets: ricetta.diets,
        extendedIngredients: ricetta.extendedIngredients.map((el)=>{ 
          return {originalName: el.originalName, amount: el.amount,  unit: el.unit, measures: el.measures}
        }),
        analyzedInstructions:ricetta.analyzedInstructions,
        summary: ricetta.summary,
        leng: "en",
        type: "api_recipe"
      }
      return obj
    });
    //ritorno quello che ho trovato
    res.json(result);
  })
  .catch((error)=>{
    console.error(error);
    res.status(500).end(error);
  });
});

module.exports = router;