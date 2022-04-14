var express = require("express");
var router = express.Router();
var journeyModel = require("../models/journey");
var userModel = require("../models/user")
const mongoose = require("mongoose");

// useNewUrlParser ;)




var city = [
  "Paris",
  "Marseille",
  "Nantes",
  "Lyon",
  "Rennes",
  "Melun",
  "Bordeaux",
  "Lille",
];
var date = [
  "2018-11-20",
  "2018-11-21",
  "2018-11-22",
  "2018-11-23",
  "2018-11-24",
];

/* GET home page. */

router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/home", function (req, res, next) {
  if(req.session.user == null ) {
    res.redirect('/')
  } else {
  res.render("home");
}});

router.get("/results", function (req, res, next) {
  if(req.session.user == null ) {
    res.redirect('/')
  } else {
  res.render("results");
}});

router.get("/tickets", function (req, res, next) {
  if(req.session.user == null ) {
    res.redirect('/')
  } else {
  res.render("tickets");
}});

router.get("/lasttrips", function (req, res, next) {
  if(req.session.user == null ) {
    res.redirect('/')
  } else {
  res.render("lasttrips");
}});

router.get("/confirmation", function (req, res, next) {
  if(req.session.user == null ) {
    res.redirect('/')
  } else {
  res.render("confirmation");
}});

// Remplissage de la base de donnée, une fois suffit
router.get("/save", async function (req, res, next) {
  if(req.session.user == null ) {
    res.redirect('/')
  } else {
  // How many journeys we want
  var count = 300;

  // Save  ---------------------------------------------------
  for (var i = 0; i < count; i++) {
    departureCity = city[Math.floor(Math.random() * Math.floor(city.length))];
    arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))];

    if (departureCity != arrivalCity) {
      var newUser = new journeyModel({
        departure: departureCity,
        arrival: arrivalCity,
        date: date[Math.floor(Math.random() * Math.floor(date.length))],
        departureTime: Math.floor(Math.random() * Math.floor(23)) + ":00",
        price: Math.floor(Math.random() * Math.floor(125)) + 25,
      });

      await newUser.save();
    }
  }
  res.render("index", { title: "Express" });
}});

// Cette route est juste une verification du Save.
// Vous pouvez choisir de la garder ou la supprimer.
router.get("/result", function (req, res, next) {
  if(req.session.user == null ) {
    res.redirect('/')
  } else {
  // Permet de savoir combien de trajets il y a par ville en base
  for (i = 0; i < city.length; i++) {
    journeyModel.find(
      { departure: city[i] }, //filtre

      function (err, journey) {
        console.log(
          `Nombre de trajets au départ de ${journey[0].departure} : `,
          journey.length
        );
      }
    );
  }
  res.render("index", { title: "Express" });
}});

router.get("/notrain", function (req, res, next) {
  if(req.session.user == null ) {
    res.redirect('/')
  } else {
  res.render("notrain", { title: "Express" });
}});




// router.post('/sign-up', async function (req, res, next)  {
//   var userList = await userModel.findOne({email: req.body.email})
//   if(!userList) {
//       var newUser = new userModel ({
//       name: req.body.name,
//       firstname: req.body.firstname,
//       email: req.body.email,
//       password: req.body.password , 
//     })
//       req.session.user = {
//         name: req.session.username,
//         id: req.session.id
//       };
//     await newUser.save()
//     res.redirect('/home')
//   } else {
//     res.redirect('/')
//   }
// });

// router.post('/sign-in', async function (req, res, next) {
//   var userList = await userModel.findOne({
//     email: req.body.emailLogin
//   })
 
//     if (userList && req.body.passwordLogin == userList.password){
//       req.session.user = {
//         name : userList.username,
//         id : userList._id
//       };
//           res.redirect('/home')

//       } else {
//       res.redirect('/')  
//     }
   
// })

  router.get('/logout', async function (req, res, next) {
    req.session.user = null;
      res.redirect('/');
    });
    



module.exports = router;
