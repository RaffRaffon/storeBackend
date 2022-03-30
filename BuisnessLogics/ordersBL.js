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
        TotalProducts:orderData.totalProducts,
        TotalPrice:orderData.totalPrice,
        CartDetails:orderData.cartDetails,
        OrderDate:orderData.orderDate
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
    const retrievedOrders = await Orders.find({ 'CartDetails.UserId': userDetails._id }).exec();
    return retrievedOrders
}

async function getSpecificOrder(id){
    const orderToReturn = await Orders.findOne({_id:id}).exec();
    return orderToReturn
}

async function getUserOrders(id){
    return new Promise((resolve, reject) => {
        Orders.find({'CartDetails.UserId':id}, function (err, data) {
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
    saveOrder,getOrders,getSpecificOrder,getUserOrders
}