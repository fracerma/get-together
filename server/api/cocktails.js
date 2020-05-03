const express = require("express");
const router = express.Router();
const request = require("request");
const bodyParser = require("body-parser");

router.use(bodyParser.json());
<<<<<<< HEAD
//TODO : capisci a cosa serve:
=======
>>>>>>> d2cf16d7698679773fbebee77aad8b330bb614ce
router.use(bodyParser.json({ type: "application/vnd.api+json" }));

// define the home page route
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
      //TODO: scegli tre cocktail
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
            //TODO: ritorna valore al client
          }
        );
      }
    );
  }
});

module.exports = router;
