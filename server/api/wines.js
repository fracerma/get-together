const express= require("express");
const router = express.Router();

// define the home page route
//TODO anche il modello

router.get('/aggiungiamico', function(req, res) {
    res.send('Vini homepage');
  });

module.exports = router;