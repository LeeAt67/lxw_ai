console.log("同步start");
const promise1 = Promise.resolve("First Promise");
const promise2 = Promise.resolve("Second Promise");
const promise3 = new Promise((resolve) => {
  console.log("Promise3");
  resolve("Third Promise");
});
setTimeout(() => {
  console.log("下一把");
  const promise4 = Promise.resolve("Forth Promise");
  promise4.then((value) => {
    console.log(value);
  });
}, 0);
setTimeout(() => {
  console.log("下下把");
}, 0);
promise1.then((value) => {
  console.log(value);
});
promise2.then((value) => {
  console.log(value);
});
promise3.then((value) => {
  console.log(value);
});

console.log("同步end");
