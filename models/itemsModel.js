const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    Name: String,
    Price: Number,
    Picture: String
})

module.exports = { Item: mongoose.model('items', ItemSchema), ItemSchema }
