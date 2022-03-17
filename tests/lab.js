const argon2 = require('argon2');

async function test() {
    let password = await argon2.hash("1231231")
    console.log(password)
}

test()