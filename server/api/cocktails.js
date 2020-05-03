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

router.get("/", function (req, response) {
  const query = req.url;
  axios
    .get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(function (res) {
      let rawData = res.data;
      let allRaw = rawData.drinks[0];
      var ingredient = new Object();
      let regex = "strIngredient";
      var i = 0;
      console.log(allRaw);
      console.log(allRaw.strDrink);
      for (property in allRaw) {
        if (property.substring(0, 13) === regex && allRaw[property] != null) {
          ingredient["Ingredient" + i] = allRaw[property];
          i++;
        }
      }
      console.log("ingredient:   " , ingredient);
      
      var cleanData = rawData.drinks.map((data) => {
        console.log(data);
        return {
          cocktailID: data.idDrink,
          cocktailName: data.strDrink,
          cocktailCat: data.strCategory,
          cocktailType: data.strAlcoholic,
          instructions: data.strInstructions,
          photo: data.strDrinkThumb,
          ingredients: ingredient,
        };
      });
      console.log("cleanData: " ,cleanData);
      //var newData = JSON.stringify(cleanData);
      response.send(cleanData);
    })
    .catch(function (error) {})
    .finally(function (final) {});
});
module.exports = router;
