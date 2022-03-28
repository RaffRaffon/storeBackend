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

async function getSpecificItem(id) {
    const itemToReturn = await Item.findOne({ _id: id }).exec();
    return itemToReturn
}

async function addItem(itemData) {
    const checkIfExist = await Item.findOne({ Name: itemData.name }).exec();
    if (checkIfExist === null) {
        const newItem = new Item({
            Name: itemData.name,
            Price: itemData.price,
            Picture: itemData.picture,
            Description: itemData.description
        })
        newItem.save(function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Item inserted successfully")
            }
        })
        return "Item inserted successfully"
    } else {
        console.log("Item with the same name already exist");
        return "Item with the same name already exist"
    }
}
async function editItem(itemData) {
    // Need to edit the item specific queries, with $set. 
    const checkIfExist = await Item.findOne({ Name: itemData.name }).exec();
    if (checkIfExist === null || checkIfExist._id == itemData._id) {
        await Item.findOneAndUpdate({ _id: itemData._id }, {
            Name: itemData.name,
            Price: itemData.price,
            Picture: itemData.picture,
            Description: itemData.description
        });
        console.log("Item updated")
        return "Item updated"
    } else {
        console.log("Item with the same name already exist");
        return "Item with the same name already exist"
    }
}

function deleteItem(itemId) {
    return new Promise((resolve, reject) => {
        Item.findByIdAndDelete(itemId, function (err, docs) {
            if (err) {
                console.log(err)
                reject("An error occured, item has not been deleted")
            }
            else {
                console.log("Item deleted");
                resolve("Item deleted")
            }
        });
    })

}
module.exports = {
    getAllItems, getSpecificItem, addItem, editItem, deleteItem
}
