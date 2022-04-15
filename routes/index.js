var express = require("express");
var router = express.Router();
var journeyModel = require("../models/journey");
var userModel = require("../models/user");
const mongoose = require("mongoose");

// Function to check if an object is empty (come from the internet, not mine) -> Return true if empty, false if not
function isEmpty(obj) {
  for (var prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }
  return JSON.stringify(obj) === JSON.stringify({});
}

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

// Remplissage de la base de donnée, une fois suffit
router.get("/save", async function (req, res, next) {
  if (req.session.user == null) {
    res.redirect("/");
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
  }
});

// Cette route est juste une verification du Save.
// Vous pouvez choisir de la garder ou la supprimer.
router.get("/result", function (req, res, next) {
  if (req.session.user == null) {
    res.redirect("/");
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
  }
});
//////////////////////////////////////////////////////////////

router.get("/", function (req, res, next) {
  req.session.user = null;
  req.session.tickets = null;
  res.render("index");
});

router.get("/home", function (req, res, next) {
  if (req.session.user == null) {
    res.redirect("/");
  } else {
    res.render("home");
  }
});

router.get("/tickets", async function (req, res, next) {
  if (req.session.user == null) return res.redirect("/");
  if (!req.session?.tickets) req.session.tickets = [];
  req.session.tickets.push(await journeyModel.findById(req.query.id));

  res.render("tickets", { tickets: req.session.tickets });
});

router.get("/delete", async function (req, res, next) {
  if (req.session.user == null) return res.redirect("/");

  console.log(req.query.id);
  if (!isEmpty(req.query)) {
    console.log("here");
    console.log(req.session.tickets);

    // If we have 2 times the same ticket, we only want to delete one.
    const firstPosition = req.session.tickets.findIndex(
      (ticket) => ticket._id == req.query.id
    );
    req.session.tickets.splice(firstPosition, 1);
  }

  res.render("tickets", { tickets: req.session.tickets });
  // res.redirect("/tickets");
});

router.get("/lasttrips", function (req, res, next) {
  if (req.session.user == null) {
    res.redirect("/");
  } else {
    res.render("lasttrips");
  }
});

router.get("/confirmation", function (req, res, next) {
  if (req.session.user == null) {
    res.redirect("/");
  } else {
    res.render("confirmation");
  }
});

router.get("/notrain", function (req, res, next) {
  if (req.session.user == null) {
    res.redirect("/");
  } else {
    res.render("notrain");
  }
});

router.post("/results", async function (req, res, next) {
  // On fait ca pour la convertir en date car de base c'est un string
  const date = new Date(req.body.date);

  req.session.results = await journeyModel.find({
    departure: req.body.departure,
    arrival: req.body.arrival,
    date,
  });

  if (req.session.results.length == 0) return res.redirect("/notrain");

  res.render("results", { results: req.session.results });
});

router.get("/logout", async function (req, res, next) {
  req.session.user = null;
  res.redirect("/");
});

module.exports = router;
