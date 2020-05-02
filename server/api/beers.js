const express= require("express");
const router = express.Router();
const bodyParser=require("body-parser");
const axios= require("axios");

router.use(bodyParser.json());

// ricerca birre
router.get('/', function(req, res) {
  const query=req.url;
  //ricerca birre per parametro tra food, abv_lt,  abv_gt, nome o stile
  if(req.query.food || req.query.abv_lt || req.query.abv_gt || req.query.beer_name ){
    axios.get("https://api.punkapi.com/v2/beers"+query).then((response)=>{
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
  else if(req.query.random){
    let ids = "";
    let norepetition = new Array(req.query.random);
    for(let i=0; i<req.query.random; i++) {
      let number = getRandomIntBetween(1,325);
      if(norepetition.includes(number)){
        i--;
        console.log("ho trovato un numero uguale e l'ho scartato");
      }
      else{
        ids+=`${number}|`;
        norepetition[i]=number;
      }
    }
    console.log(ids);
    axios.get("https://api.punkapi.com/v2/beers"+`?ids=${ids}`).then((response)=>{
      let allrandom=response.data;
      allrandom=allrandom.map((obj) => { 
        return {
          name: obj.name,
          description: obj.description,
          image_url: obj.image_url,
          abv: obj.abv
        }
      });
      console.log(allrandom);
      res.send(allrandom);
    }).catch((error)=>{
      console.error(error); 
    });
    }


  else{
    res.status(400).send("ERROR: missing searching parameter. Please include in your request one of these parameters: food, abv_lt, abv_gt, beer_name. \n "+
    "Read the documentation  for more informations !!!" );
  }
});


module.exports = router;

function getRandomIntBetween(min,max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}