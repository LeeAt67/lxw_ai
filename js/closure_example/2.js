function debounce(fn, delay) {
  //
  // let id = null; 防止污染fn
  return function (args) {
    // 定时器返回ID
    // fn 自由变量
    // fn 对象
    clearTimeout(fn.id);
    fn.id = setTimeout(() => {
      fn(args);
    }, delay);
  };
}

let obj = {
  count: 0,
  inc: debounce(function (val) {
    //this
    console.log(this, "///");

    this.count += val;
  }, 500),
};
logobj.inc(2);
