const mongoose = require('mongoose');
const { ItemSchema } = require('./itemsModel')

let CartSchema = new mongoose.Schema({
    Items: [ItemSchema],
    UserId: String
})

module.exports = mongoose.model('cart', CartSchema);
