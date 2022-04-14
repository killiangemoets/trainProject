var express = require("express");
var router = express.Router();
var userModel = require('../models/user')
const mongoose = require("mongoose");
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('index');
// });


// router.post('/sign-up', async function (req, res, next)  {
 
//   console.log("coucou le monde")
  
//     var newUser = new userModel ({
//     name: req.body.name,
//     firstname: req.body.firstname,
//     email: req.body.email,
//     password: req.body.password , 
//   })

//    await newUser.save()


//   res.redirect('/home')
  
// });

module.exports = router;
