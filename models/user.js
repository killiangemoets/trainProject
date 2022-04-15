var mongoose = require('mongoose');

var TicketSchema = mongoose.Schema({
    departure: String, 
    arrival: String,
    date: Date, 
    departureTime: String, 
    price: Number
})

var userSchema = mongoose.Schema({
    name: String,
    firstname: String,
    email: String,
    password: String, 
    userTickets: [TicketSchema],
})

var userModel = mongoose.model('users', userSchema)

module.exports = userModel