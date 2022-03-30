const argon2 = require('argon2');

async function test(){
    console.log(await argon2.hash("qweqwe"));
}

test()

