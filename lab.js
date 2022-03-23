const argon2 = require('argon2');


async function argon() {

    console.log(await argon2.hash("asdasd"))
}

argon()