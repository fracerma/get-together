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

router.get("/", function (req, res) {
  const query = req.url;
  axios
    .get("https://www.thecocktaildb.com/api/json/v1/1/random.php", {
      method: "get",
      responseType: "JSON",
    })
    .then(function (res) {
      let rawData = res.data;
      let allRaw = rawData.drinks[0];
      var ingredient = {};
      let regex = /[0-9]+/;
      var i = 0;
      for (property in allRaw) {
        if (property == "strIngredient" + regex && property.value != null) {
          ingredient["ingredient" + i] = property.value;
          i++;
        }
      }

      var cleanData = rawData.map(function (data) {
        let result = {
          cocktailID: data.drinks[0].idDrink,
          cocktailName: data.drinks[0].strDrink,
          cocktailCat: data.drinks[0].strCategory,
          cocktailType: data.drinks[0].strAlcoholic,
          instructions: data.drinks[0].strInstructions,
          photo: data.drinks[0].strDrinkThumb,
          ingredients: ingredient,
        };
      });
    })
    .catch(function (error) {})
    .finally(function (final) {});
});
module.exports = router;
