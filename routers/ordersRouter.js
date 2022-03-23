const express = require('express');
const router = express.Router();
const ordersBL = require('../BuisnessLogics/ordersBL')
module.exports = router;


router.route('/sendOrder')
    .post((req, resp) => {
        ordersBL.saveOrder(req.body.data.orderData)
        resp.send("ok")
    })

    router.route('/getOrders')
    .post(async(req, resp) => {
        return resp.json(await ordersBL.getOrders(req.body.data.token))
    })