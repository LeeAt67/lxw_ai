const arr = ['1', '2', '3']
console.log(typeof arr);
const date = new Date();
console.log(typeof date);
// 如何区分Object 的这些类型？
// [object Array]
// [object Date]
console.log(typeof Object.prototype.toString.call(arr));
console.log(Object.prototype.toString.call(date));


// 会在MDN
function getType(value){
  // string api 的选择
  // split + substring
  return Object.prototype.toString.call(value).slice(8,-1);
}
console.log(getType(arr));
