var b = 10;
(function b() {
    "use strict"
    b = 20; // 不生效的
    console.log(b);
})()