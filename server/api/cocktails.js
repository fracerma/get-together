const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.json({ type: "application/vnd.api+json" }));

// define the home page route
/*
router.get("/cocktails", function (req, res) {
  var city = req.body.city;
  if (req.body.random == true) {
    request.get(
      {
        url: "https://www.thecocktaildb.com/api/json/v1/1/random.php",

        method: "GET",
      },
      function (error, response, body) {
        console.error("error:", error);
        console.log("statusCode:", response && response.statusCode);
        console.log("body:", body);
        const res = JSON.parse(body);
        console.log(res);
      }
    );
  } else {
    var ingredient = req.body.ingredient;
    request.get(
      {
        url:
          "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" +
          ingredient,
        method: "GET",
      },
      function (error, response, body) {
        console.error("error:", error);
        console.log("statusCode:", response && response.statusCode);
        //console.log("body:", body);
        const res = JSON.parse(body);
        const drink_id = JSON.parse(body).drinks[0].idDrink;
        request.get(
          {
            url:
              "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" +
              drink_id,
            method: "GET",
          },
          function (error, response, body) {
            console.error("error:", error);
            console.log("statusCode:", response && response.statusCode);
            console.log("body:", body);
            const res = JSON.parse(body);
            //Ho preso il primo cocktail
          }
        );
      }
    );
  }
});
*/

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

function cleaner(res, max){
  let rawData = res.data;
  var totLength = rawData.drinks.length;
  var limit;
  if( max > totLength) limit = totLength;
  else limit = max;

  let numbers = random(totLength, limit);
  let cleanData = new Array(limit);
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
    cleanData[cnt] = rawData.drinks.filter(x => x === allRaw).map((data) => {
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
    return cleanData;
}


router.get("/random", function (req, response) {
  const query = req.url;
  axios
    .get("https://www.thecocktaildb.com/api/json/v1/1/random.php", {
      method: "get",
      responseType: "JSON",
    })
    .then(function (res) {
      var cleanData = cleaner(res, 5);
      response.send(cleanData);
    })
    .catch(function (error) {})
    .finally(function (final) {});
});

router.get("/name", function( req, response ){
axios
  .get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita"
)
  .then(function(res){
    let result = cleaner(res, 2);
    response.send(result);
  })
  .catch()
  .finally()
});
module.exports = router;
