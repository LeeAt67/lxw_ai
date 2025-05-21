// 函数声明优先于变量声明
console.log(foo); // ƒ foo() { console.log('函数声明') }
var foo = '变量声明';
function foo() {
  console.log('函数声明');
}
