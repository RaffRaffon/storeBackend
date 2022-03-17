const express = require('express');
const router = express.Router();
const cartBL = require('../BuisnessLogics/cartBL')
module.exports = router;


router.route('/updateUserCartData')
    .put((req, resp) => {
        cartBL.updateUserCartData(req.body.data.cartData, req.body.data.token);
    })
router.route('/getUserCartData')
    .post(async (req, resp) => {
        return resp.json(await cartBL.getUserCartData(req.body.data.token))
    })