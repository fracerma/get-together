const express= require("express");
const router = express.Router();
const bodyParser=require("body-parser");
const axios= require("axios");
require("dotenv").config();

router.use(bodyParser.json());

// ricerca birre
router.get('/', function(req, res) {
  const query=req.url;
  //ricerca birre per parametro tra food, abvmin,  abvmax, nome o stile
  if(req.query.food || req.query.abv_lt || req.query.abv_gt || req.query.beer_name ){
    axios.get(""+query+).then((response)=>{
      let alldata=response.data;
      alldata=alldata.map((obj) => { 
        return {
        name: obj.name,
        description: obj.description,
        image_url: obj.image_url,
        abv: obj.abv
        }
      });
      console.log(alldata);
      res.send(alldata);
    }).catch((error)=>{
      console.error(error); 
    });

  }
  else {
    res.status(400).send("ERROR: missing searching parameter. Please include in your request one of these parameters: food, abv_lt, abv_gt, beer_name. \n "+
    "Read the documentation  for more informations !!!" );
  }
});


module.exports = router;