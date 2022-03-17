const mongoose = require('mongoose');

let CartSchema = new mongoose.Schema({
    Items:Array,
    UserId:String
})

module.exports = mongoose.model('cart',CartSchema);
