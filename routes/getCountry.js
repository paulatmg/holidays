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


      .then((response) => res.render('getCountry', {data: response.sort(function(a,b){return a.date > b.date ? 1 : a.date < b.date ? -1 : 0 })}))
      .catch((error) => res.render(error.message));
  });
  
  module.exports = router;