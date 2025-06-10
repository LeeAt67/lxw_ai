function bar() {
  console.log(myName);
}
function foo() {
  var myName = "极客";
  bar();
}
var myName = "骑士";
foo(); // 全局 -> 函数foo -> 函数bar -> 全局  不会经过函数foo
