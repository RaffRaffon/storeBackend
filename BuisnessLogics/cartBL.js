const Cart = require('../models/cartModel');
const jwtSecret = 'sxw51D@ehWt'
const jwt = require('jsonwebtoken');
// Need to hide the jwtSecret
async function updateUserCartData(cartData, token) {
    const userDetails = jwt.verify(token, jwtSecret);
    if (cartData.length === 0) {
        Cart.findOneAndDelete({ UserId: userDetails._id }, function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                console.log("Cart deleted");
            }
        });
        return
    }
    const checkIfExist = await Cart.findOne({ UserId: userDetails._id }).exec();
    if (checkIfExist === null) {
        const newCart = new Cart({
            Items: cartData,
            UserId: userDetails._id
        })
        newCart.save(function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Cart inserted successfully")
            }
        })
    } else {
        await Cart.findOneAndUpdate({ UserId: userDetails._id }, {
            Items: cartData
        });
        console.log("Cart updated")
    }
}
async function getUserCartData(token) {
    //  Need to change the retrivation by token to retrivation by uid
    if (token) {
        const userDetails = jwt.verify(token, jwtSecret);
        const retrievedCart = await Cart.findOne({ UserId: userDetails._id }).exec();
        if (retrievedCart) return retrievedCart
        else return []
    } else return []
}
module.exports = {
    updateUserCartData, getUserCartData
}