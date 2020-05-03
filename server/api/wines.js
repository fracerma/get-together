const express= require("express");
const router = express.Router();

router.get('/pairing', function(req, res) {
  axios.get(`https://api.spoonacular.com/food/wine/pairing${query}&apiKey=${process.env.SPOONACULAR_KEY}`)
  .then((response)=>{
    res.send(response.data);
  });
});

module.exports = router;