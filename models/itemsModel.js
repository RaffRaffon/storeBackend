const mongoose = require('mongoose');

let MainSchema = new mongoose.Schema({
    Name:String,
    Price:Number,
    Picture:String,
    Description:String
})

module.exports = mongoose.model('items',MainSchema);
