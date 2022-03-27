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

async function getSpecificItem(id){
  const itemToReturn = await Item.findOne({_id:id}).exec();
  return itemToReturn
}

module.exports = {
    getAllItems,getSpecificItem
}
