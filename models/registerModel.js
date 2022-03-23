const mongoose = require('mongoose');
let RegisterSchema = new mongoose.Schema({
    FLname:String,
    Email:String,
    Password:String,
    StreetName:String,
    Hnumber:String,
    Anumber:String,
    City:String,
    Zipcode:String,
    Pnumber:String
})

module.exports = mongoose.model('users',RegisterSchema);
