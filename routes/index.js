var express = require("express");
var router = express.Router();
var journeyModel = require("../models/journey");
const mongoose = require("mongoose");

// useNewUrlParser ;)
var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// --------------------- BDD -----------------------------------------------------

const password = "El7mQWrLv3gIiiws";
mongoose.connect(
  `mongodb+srv://admin:${password}@cluster0.fvcy8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  options,
  function (err) {
    if (err) {
      console.log(
        `error, failed to connect to the database because --> ${err}`
      );
    } else {
      console.info("*** Database Ticketac connection : Success ***");
    }
  }
);

// BELLOW comment content TO DELETE ! CONTENT ADDED IN models/journey.JS

// var journeySchema = mongoose.Schema({
//   departure: String,
//   arrival: String,
//   date: Date,
//   departureTime: String,
//   price: Number,
// });
// var journeyModel = mongoose.model('journey', journeySchema);

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
  res.render("home");
});

router.get("/results", function (req, res, next) {
  res.render("results");
});
router.get("/tickets", function (req, res, next) {
  res.render("tickets");
});

// Remplissage de la base de donnée, une fois suffit
router.get("/save", async function (req, res, next) {
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
});

// Cette route est juste une verification du Save.
// Vous pouvez choisir de la garder ou la supprimer.
router.get("/result", function (req, res, next) {
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
});

module.exports = router;
