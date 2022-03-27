const express = require('express');
const router = express.Router();
const itemsBL = require('../BuisnessLogics/itemsBL')
module.exports = router;


router.route('/sendAllItemsData')
    .get(async (req, resp) => {
        let data = await itemsBL.getAllItems();
        return resp.json(data);
    })


router.route('/getSpecificItem')
    .get(async (req, resp) => {
        return resp.json(await itemsBL.getSpecificItem(req.query.id));
    })
