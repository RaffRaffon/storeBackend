const express = require('express');
const res = require('express/lib/response');
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

router.route('/addItem')
    .post(async (req, resp) => {
        return resp.json(await itemsBL.addItem(req.body.data.itemData));
    })

router.route('/editItem')
    .put(async (req, resp) => {
        // Need to add a response if item with the same name exists or not
        console.log("hello sss");
        return resp.json(await itemsBL.editItem(req.body.data.itemData))
    })
router.route('/getAnItem')
    .get((req, resp) => {
        console.log("XXX");
        resp.send("XXX")
    })

router.route('/deleteItem')
    .delete(async (req, resp) => {
        try{
            return resp.json(await itemsBL.deleteItem(req.body.itemId))
        } catch(e){
            return resp.json((e))
        }
    })