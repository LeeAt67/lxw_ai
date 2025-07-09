function createCounter() {
  // 私有变量
  let count = 0;
}

createCounter既是一个函数，也可以看作成一个类

num 是类的一个属性


function CreateCounter(num) {
  // 对外的接口
  // 对内的私有
  this.num = num; // 公共属性
  // 私有变量 private
  let count = 0;
  return {
    num:num,
    increment: () => {
      count++;
    },
    decrement: () => {
      count--;
    },
  };
}


count 在返回的对象上不可以直接访问了

getCount: () => {
      console.log("count 被访问了");
      return count;
    },

提供get方法将count返回  于是能够访问到私有变量