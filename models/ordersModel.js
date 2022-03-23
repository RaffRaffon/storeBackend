const mongoose = require('mongoose');

let OrdersSchema = new mongoose.Schema({
    FLname:String,
    Email:String,
    StreetName:String,
    Hnumber:String,
    Anumber:String,
    City:String,
    Zipcode:String,
    Pnumber:String,
    Notes:String,
    Cnumber:String,
    EDateDay:String,
    EDateMonth:String,
    CVV:String,
    TotalProducts:Number,
    TotalPrice:Number,
    CartDetails:Object
})

module.exports = mongoose.model('orders',OrdersSchema);
