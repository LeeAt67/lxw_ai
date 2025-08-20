const sleep = time => new Promise(r => setTimeout(r, time));

(async () => {
  console.log("begin");
  await sleep(2000);
  console.log("end");
})();
