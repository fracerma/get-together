const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");

router.use(bodyParser.json());
router.use(bodyParser.json({ type: "application/vnd.api+json" }));

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
      console.log(cleanData);
      
    })
    .catch(function (error) {})
    .finally(function (final) {});
});
module.exports = router;
