// --------------------- BDD -----------------------------------------------------

const mongoose = require("mongoose");

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

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