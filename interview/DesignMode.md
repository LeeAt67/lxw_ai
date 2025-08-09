1. 代理模式
   中间人来应对一下，再交给实际人处理，可以用于虚拟代理，如用一张占位图（代理）来占位，等到加载完后再替换为实际图片

- API 缓存

```js
const apiProxy = {
  cache:new map(),
  getDate(url){
    if(this.cache.has(url)){
      console.log(”缓存命中，代理来解决“);
      return this.cache.get(url)
    }
  }
}
```

- 权限校验

```js
const adminProxy ={
  user:null,
  deleteDatabase(){
    if(!this.user?.isAdmin){
      throw new Error("没权限")
    }
  }
  return realDB.deleteEverything;
}
```
