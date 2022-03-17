const Item = require('../models/itemsModel');
function getAllItems() {
    return new Promise((resolve, reject) => {
        Item.find({}, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    })
}



module.exports = {
    getAllItems
}