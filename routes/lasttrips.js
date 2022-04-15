var express = require("express");
var router = express.Router();
var userModel = require("../models/user");
const mongoose = require("mongoose");

router.get("/", async function (req, res, next) {
    if (req.session.user == null) {
      res.redirect("/");
    } else {
     var ticketProfile = await userModel.findById(req.session.user.id);
     res.render("lasttrips", {lastTrips : ticketProfile.userTickets});
    }
  });



module.exports = router;