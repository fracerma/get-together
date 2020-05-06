const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.json({ type: "application/vnd.api+json" }));

function random(top, length){
  let res = new Array(length);
  let i = 0;
  
  while( i < length){
    let num = Math.floor(Math.random() * top);
    if( !(res.includes(num)) ){
      res[i] = num;
      i++;
    }
  }
  return res;
}

function cleaner(rawData, max){
  let totLength = rawData.drinks.length;
  let limit;
  if( max > totLength) limit = totLength;
  else limit = max;

  let numbers = random(totLength, limit);
  let cleanDt = new Array(limit);
  let Ingredient = new Object();
  let Quantity = new Object();

  let cnt = 0;
  for(;cnt < limit; cnt++){
    Ingredient = {};
    Quantity = {};
    let picked = numbers[cnt];
    let allRaw = rawData.drinks[picked];
    let regex = "strIngredient";
    let i = 0;
    for (property in allRaw) {
      if (property.substring(0, 13) === regex && allRaw[property] != null) {
        Ingredient["i" + i] = allRaw[property];
        i++;
      }
    }
    regex = "strMeasure";
    
    i = 0;
    for (property in allRaw) {
      if (property.substring(0, 10) === regex && allRaw[property] != null) {
        Quantity["q" + i] = allRaw[property];
        i++;
      }
    }
    cleanDt[cnt] = rawData.drinks.filter(x => x === allRaw).map((data) => {
        return {
        cocktailID: data.idDrink,
        cocktailName: data.strDrink,
        cocktailCat: data.strCategory,
        cocktailType: data.strAlcoholic,
        instructions: data.strInstructions,
        photo: data.strDrinkThumb,
        Ingredients: Ingredient,
        Quantity: Quantity
        };
    });

  }
  let tmp = new Array();
  let i = 0; 
  for(; i < limit; i++){
    tmp[i] = (cleanDt[i][0]);
    // (cleanDt[i][0])
  }
  let cleanData = {drinks: tmp}
    return cleanData;
}


//works
router.get("/random" && "/type", function (req, response) {
  const q = req.query;
  var num = q.cocktail_num
  var type = q.cocktail_type;
  axios
    .get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=" + type)
    .then(function (res) {
      let resId = cleaner(res.data, num);

      ////////////////////////////////////
      let x = resId.drinks.length;
      
      var ids = new Array();
      var array = new Array();
      var ress = new Array();
      let i = 0;
      for (; i < x; i++) 
        ids.push(resId.drinks[i].cocktailID);

      i = 0;

      for (; i < x; i++) {
        let url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + ids[i];
        array.push(axios.get(url));
      }

      axios.all(array).then(axios.spread((...responses) => {
        let i;
        for (i = 0; i < x; i++) {
          ress.push(responses[i].data.drinks[0]);
        }
        let finalRaw = { drinks: ress };
        let final = cleaner(finalRaw, num)
        response.send(final);
      })).catch(function (error) {
        console.error(error);
      });
      //////////////////////////////////////////
    })
    .catch(function (error) {
      console.error(error);
    })
    .finally(function (final) { })
});

//works
router.get("/name", function( req, response ){
  const q = req.query; 
  var num = q.cocktail_num
axios
  .get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + q.cocktail_name
)
  .then(function(res){
    let result = cleaner(res.data, num);
    response.send(result);
  })
  .catch(function (error) {
    console.error(error);
  })
  .finally(function (final) { })
});

//works
router.get("/category", function (req, response) {
  const q = req.query;
  var num = q.cocktail_num
  axios
    .get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=' + q.cocktail_category
    )
    .then(function (res) {
      let resId = cleaner(res.data, num);

      ////////////////////////////////////
      let x = resId.drinks.length;

      var ids = new Array();
      var array = new Array();
      var ress = new Array();
      let i = 0;
      for (; i < x; i++) 
        ids.push(resId.drinks[i].cocktailID);
      
      i = 0;

      for (; i < x; i++) {
        let url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + ids[i];
        array.push(axios.get(url));
      }

      axios.all(array).then(axios.spread((...responses) => {
        let i;
        for (i = 0; i < x; i++) {
          ress.push(responses[i].data.drinks[0]);
        }
        let finalRaw = { drinks: ress };
        let final = cleaner(finalRaw, num)
        response.send(final);
      })).catch(function (error) {
        console.error(error);
      });
      //////////////////////////////////////////
    })
    .catch(function (error) {
      console.error(error);
    })
    .finally(function (final) { })
});

//works
router.get("/ingredient", function (req, response) {
  const q = req.query;
  var num = q.cocktail_num
  axios
    .get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=' + q.cocktail_ingredient
    )
    .then(function (res) {

      let resId = cleaner(res.data, num); // contiene la risposta del server con i drink in forma di id

      ////////////////////////////////////
      let x = resId.drinks.length;
  
    
      var ids = new Array();  //ci metto tutti gli id per creare gli url da mettere nelle promise
      var array = new Array(); //conterra' le promises per axios.all 
      var ress = new Array(); //array che contiene tutti i drink ma che devono essere passati in cleaner

      let i = 0;
      for(; i < x; i++)
        ids.push(resId.drinks[i].cocktailID);
      
      i = 0;

      for (; i < x; i++) {
        let url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + ids[i];
        array.push(axios.get(url));
      }

      axios.all(array).then(axios.spread((...responses) => {
        let i;
        for (i = 0; i < x; i++) {
          ress.push(responses[i].data.drinks[0]);
        }
        let finalRaw = {drinks: ress}; // contiene i drink nel formato accettato da cleaner
        let final = cleaner(finalRaw, num) //valore finale
        response.send(final);
      })).catch(function (error) {
        console.error(error);
      });
      //////////////////////////////////////////
    })
    .catch(function (error) { 
      console.error(error);
    })
    .finally(function (final) { })
});


//prende un id e restituisce tutti i dettagli sul cocktail
router.get("/full_cocktail", function(req, response){
  const q = req.query;
  const id = q.cocktail_id;
  axios
    .get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id)
    .then(function (res) {
      let result = cleaner(res.data,  1);
      response.send(result);
    })
    .catch(function (error) { 
      console.error(error);
    })
    .finally(function (final) { })
});

module.exports = router;

