const Cart = require('../models/cartModel');
const { verify } = require('../services/jwt.service');
// Need to hide the jwtSecret
async function updateUserCartData(cartData, token) {
    try {
        const userDetails = verify(token);
        if (!userDetails) return null;

        if (cartData.length === 0) {
            await Cart.findOneAndDelete({ UserId: userDetails._id }).exec();
            return { operation: 'deleted' }
        }

        const checkIfExist = await Cart.findOne({ UserId: userDetails._id }).exec();
        if (checkIfExist != null) {
            await Cart.findOneAndUpdate({ UserId: userDetails._id }, {
                Items: cartData
            });
            console.log("Cart updated")
            return { operation: 'update' }
        }

        const newCart = new Cart({
            Items: cartData,
            UserId: userDetails._id
        })

        await newCart.save();
        return { operation: 'created' }
    } catch (error) {
        console.log("🚀 ~ file: cartBL.js ~ line 31 ~ updateUserCartData ~ error", error)
        return { operation: null }
    }

}
async function getUserCartData(token) {
    //  Need to change the retrivation by token to retrivation by uid
    if (token) {
        const userDetails = verify(token);
        const retrievedCart = await Cart.findOne({ UserId: userDetails._id }).exec();
        if (retrievedCart) return retrievedCart
        else return []
    } else return []
}
module.exports = {
    updateUserCartData, getUserCartData
}