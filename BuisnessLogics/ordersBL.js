const Orders = require('../models/ordersModel');
const jwt = require('jsonwebtoken');
const jwtSecret = 'sxw51D@ehWt'


function saveOrder(orderData){
    const newOrder = new Orders({
        FLname:orderData.flname,
        Email:orderData.email,
        StreetName:orderData.streetName,
        Hnumber:orderData.hnumber,
        Anumber:orderData.anumber,
        City:orderData.city,
        Zipcode:orderData.zipcode,
        Pnumber:orderData.pnumber,
        Notes:orderData.notes,
        Cnumber:orderData.cnumber,
        EDateDay:orderData.eDateDay,
        EDateMonth:orderData.eDateMonth,
        CVV:orderData.cvv,
        TotalProducts:orderData.totalProducts,
        TotalPrice:orderData.totalPrice,
        CartDetails:orderData.cartDetails
    })
    newOrder.save(function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Order inserted successfully")
        }
    })
}

async function getOrders(token){
    const userDetails = jwt.verify(token, jwtSecret);
    const retrievedOrders = await Orders.find({ UserId: userDetails._id }).exec();
    return retrievedOrders
}


module.exports = {
    saveOrder,getOrders
}