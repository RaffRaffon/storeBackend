const express = require('express');
const router = express.Router();
const usersBL = require('../BuisnessLogics/usersBL')
module.exports = router;

router.route('/consoleLog')
    .get((req, resp) => {
        console.log("logging into the terminal");
    })
router.route('/registerUser')
    .post((req, resp) => {
        usersBL.registerUser(req.body.data.userData)
    })

router.route('/checkCreds')
    .post(async (req, resp) => {
        return resp.json(await usersBL.checkCreds(req.body.data.userData));
    })


router.route('/checkEmail')
    .post(async (req, resp) => {
        return resp.json(await usersBL.checkEmail(req.body.data.email, req.body.data.token))
    })

router.route('/getUsername')
    .post(async (req, resp) => {
        return resp.json(await usersBL.getUsername(req.body.data.email))
    })
router.route('/getPersonalData')
    .post(async (req, resp) => {
        return resp.json(await usersBL.getPersonalData(req.body.data.token))
    })
router.route('/updatePersonalData')
    .put((req, resp) => {
        usersBL.updatePersonalData(req.body.data.userData)
    })
router.route('/checkTokenForLogin')
    .post(async (req, resp) => {
        return resp.json(await usersBL.checkTokenForLogin(req.body.data.token))
    })
router.route('/moveCartToDB')
    .post((req, resp) => {
        usersBL.moveCartToDB(req.body.data.cartData, req.body.data.email);
    })