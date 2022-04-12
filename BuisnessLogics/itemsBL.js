const axios = require('axios')
const Item = require('../models/itemsModel');
const cloudinary = require('cloudinary').v2
cloudinary.config({
    cloud_name: "storeraffraff",
    api_key: "",
    api_secret: ""
});
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
    // function removeFileUrl(url) {
    //     const slashIndex = url.lastIndexOf("/")
    //     let stringToReturn = url.slice(slashIndex+1, url.length)
    //     const dotIndex = stringToReturn.lastIndexOf(".")
    //     stringToReturn = stringToReturn.slice(0,dotIndex) 
    //     console.log(stringToReturn);
    //     return stringToReturn
    // }
    const checkIfExist = await Item.findOne({ Name: itemData.name }).exec();
    if (checkIfExist === null || checkIfExist._id == itemData._id) {
        console.log(itemData.oldName, itemData.name, itemData.picture);
     cloudinary.uploader.destroy(itemData.oldName, function(result) { console.log(result+"hello from result") });

        await Item.findOneAndUpdate({ _id: itemData._id }, {
            Name: itemData.name,
            Price: itemData.price,
            Picture: itemData.picture,
            Description: itemData.description
        }).exec()
        console.log("Item updated")
        return "Item updated"
    } else {
        console.log("Item with the same name already exist");
        return "Item with the same name already exist"
    }
}

function deleteItem(itemId,itemName) {
    return new Promise((resolve, reject) => {
        Item.findByIdAndDelete(itemId, function (err, docs) {
            if (err) {
                console.log(err)
                reject("An error occured, item has not been deleted")
            }
            else {
                cloudinary.uploader.destroy(itemName, function(result) { console.log(result) });
                console.log("Item deleted");
                resolve("Item deleted")
            }
        });
    })
}

async function addItemImage(imageData, imageName) {
    // Need to put the api key and api secret inside .env files
    const response = await cloudinary.uploader.upload(imageData, { public_id: imageName },  (error, result) => {
        if (error) console.log(error)
    });
    return response.secure_url
}
module.exports = {
    getAllItems, getSpecificItem, addItem, editItem, deleteItem, addItemImage
}
