// add 函数， 3个参数
// add.length 3
function add(a, b, c) {
    return a + b + c
}

add(1, 2, 3)

let addCurry = curry(add)

addCurry(1)(2)(3)