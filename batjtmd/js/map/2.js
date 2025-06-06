// parseInt num  将num 以radix 进制转换为十进制的数字
['1', '2', '3'].map((num, index, arr) => {
  console.log(num, index, arr);
  return num;
})
// 第二个参数是进制 radix 
console.log(parseInt('1', 0, ['1', '2', '3']));
console.log(parseInt('2', 1, ['1', '2', '3']));
console.log(parseInt('3', 3, ['1', '2', '3'])); // NaN 
