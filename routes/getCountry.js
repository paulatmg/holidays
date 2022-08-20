var express = require('express');
var router = express.Router();
var functions = require('../functions/holiday');
var moment = require('moment');
const axios = require('axios').default;



router.post('/', function (req, res, next) {

    functions.handlerFunction({
        fullName: req.body.fullName,
        email: req.body.email,
        countryByUser: req.body.countryByUser
    })


      .then((response) => res.send(response))
      .catch((error) => res.send(error.message));
  });
  
  module.exports = router;