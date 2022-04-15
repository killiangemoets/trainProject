var express = require("express");
var router = express.Router();
var userModel = require("../models/user");
const mongoose = require("mongoose");

router.get("/", async function (req, res, next) {
  if (req.session.user == null) {
    res.redirect("/");
  } else {
    if (req.session.tickets.length == 0) return res.redirect("../tickets");
    var profil = await userModel.findById(req.session.user.id);
    for (var i = 0; i < req.session.tickets.length; i++) {
      profil.userTickets.push({
        departure: req.session.tickets[i].departure,
        arrival: req.session.tickets[i].arrival,
        date: req.session.tickets[i].date,
        departureTime: req.session.tickets[i].departureTime,
        price: req.session.tickets[i].price,
      });
    }
    await profil.save();
    req.session.tickets = [];
    res.render("confirmation");
  }
});

module.exports = router;
