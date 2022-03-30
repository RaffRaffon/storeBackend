const User = require('../models/registerModel');
const Cart = require('../models/cartModel');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const jwtSecret = 'sxw51D@ehWt'

// Need to return catched errors and send their status messages 
// Need to hide the jwtSecret
// Need to add jwt to user edit
async function registerUser(userData) {
    const checkIfExist = await User.findOne({ Email: userData.email }).exec();
    if (checkIfExist === null) {
        const newUser = new User({
            FLname: userData.flname,
            Email: userData.email,
            Password: await argon2.hash(userData.password),
            StreetName: '',
            Hnumber: '',
            Anumber: '',
            City: '',
            Zipcode: '',
            Pnumber: ''
        })
        newUser.save(function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("User inserted successfully")
            }
        })
    } else {
        console.log("User already exist")
    }
}

async function checkCreds(userData) {
    const checkIfExist = await User.findOne({ Email: userData.email }).exec();
    if (checkIfExist !== null) {
        if (await argon2.verify(checkIfExist.Password, userData.password)) {
            console.log("Passwords match")
            const payload = {
                _id: checkIfExist._id,
                username: checkIfExist.FLname
            };
            const token = jwt.sign(payload, jwtSecret);
            // const userDetails = jwt.verify(token, jwtSecret);
            return { checkCredsResult: true, token, userName: checkIfExist.FLname }
        } else {
            console.log("Passwords doesn't match")
            return { checkCredsResult: false }
        }
    } else {
        console.log("This email doesn't exist in the database")
        return { checkCredsResult: false }
    }
}

async function checkEmail(email, token) {
    if (token) {
        const userDetails = jwt.verify(token, jwtSecret);
        const isTheUserWithTheSameEmail = await User.findOne({ _id: userDetails._id }).exec();
        if (isTheUserWithTheSameEmail.Email === email) return true
    }
    const checkForDuplicate = await User.findOne({ Email: email }).exec();
    if (checkForDuplicate === null) return true
    else return false
}

async function getUsername(email) {
    const userData = await User.findOne({ Email: email }).exec();
    return userData.FLname
}
async function getUserId(email) {
    const userData = await User.findOne({ Email: email.toLowerCase() }).exec();
    return userData?._id
}
async function getPersonalData(token) {
    const userDetails = jwt.verify(token, jwtSecret);
    let userData = await User.findOne({ _id: userDetails._id }).exec();
    userData.Password = ''
    console.log("returning user data");
    return userData
}

async function updatePersonalData(userData) {
    await User.findOneAndUpdate({ Email: userData.oldEmail }, {
        FLname: userData.flname,
        Email: userData.newEmail.toLowerCase(),
        Password: await argon2.hash(userData.password),
        StreetName: userData.streetName,
        Hnumber: userData.hnumber,
        Anumber: userData.anumber,
        City: userData.city,
        Zipcode: userData.zipcode,
        Pnumber: userData.pnumber
    }).exec()
}


async function checkTokenForLogin(token) {
    //     Add the second parameter to the function as the decoded data.
    // Because there is only one parameter, the verify function will send the decodes data there and throw the exception, as it happens to you.
    // With a second parameter, the verify will call your cb with err if it throws.
    let userDetails = jwt.verify(token, jwtSecret)
    let userData = await User.findOne({ _id: userDetails._id }).exec();
    return userData.FLname
}

async function moveCartToDB(cartData, email) {
    const cartObject = (JSON.parse(cartData))
    const cartArray = []
    for (let index in cartObject) {
        cartArray.push(cartObject[index])
    }
    const userData = await User.findOne({ Email: email }).exec();
    const cart = new Cart({
        Items: cartArray,
        UserId: userData._id
    })
    cart.save(function (err, result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Cart inserted successfully")
        }
    })
}
module.exports = {
            registerUser, checkCreds, checkEmail, getUsername, getPersonalData,
            updatePersonalData, checkTokenForLogin, moveCartToDB,getUserId
        }