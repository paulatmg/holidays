var express = require('express');
var router = express.Router();
var functions = require('../functions/mySQLFunctions');
var moment = require('moment');
const axios = require('axios').default;



router.get('/', function (req, res, next) {


    functions.handlerFunction({
        userID: req.query.userID,
        favoriteColor: req.query.favoriteColor,
        favoriteCar: req.query.favoriteCar,
        favoriteNumber: req.query.favoriteNumber,
        receiveEmail: req.query.receiveEmail        
    })


      .then((response) => res.send(response))
      .catch((error) => res.send(error.message));
  });
  
  module.exports = router;