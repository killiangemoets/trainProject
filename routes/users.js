var express = require("express");
var router = express.Router();
var userModel = require("../models/user");
const mongoose = require("mongoose");
/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('index');
// });

router.post('/sign-up', async function (req, res, next)  {
    var userList = await userModel.findOne({email: req.body.email})
    if(!userList) {
      // CREATION
        var newUser = new userModel ({
        name: req.body.name,
        firstname: req.body.firstname,
        email: req.body.email,
        password: req.body.password , 
      })
      await newUser.save()
      // CONNECTION
      var userList = await userModel.findOne({email: req.body.email})
          req.session.user = {
          name: userList.username,
          id: userList.id
        };
      res.redirect('/home')
    } else {
      res.redirect('/')
    }
  });

  router.post('/sign-in', async function (req, res, next) {
    var userList = await userModel.findOne({
      email: req.body.emailLogin
    })
      if (userList && req.body.passwordLogin == userList.password){
        req.session.user = {
          name : userList.username,
          id : userList._id
        };
            res.redirect('/home')

        } else {
        res.redirect('/')
        }
    })

module.exports = router;