const array = []

for (let i = 1; i <= 12; i++) {
    let string=""
    if (i<10) string="0"+i
    else string+=i
    array.push(String(string))
}

console.log(array);