
### 箭头函数与indexof方法

``` javascript
const findWordsContaining = (words, x)=> { 
    let res = []  
    words.forEach((item, index) => { 
        if (item.indexOf(x) !== -1) res.push(index) 
            }) 
    return res 
};

//  Obj.forEach((item,index)=>{})
//  forEach方法与箭头函数搭配，item是obj中每个元素，index是当前索引

//item.indexOf(x) !== -1 
// indexOf(x) 方法查找字符x在字符串item中首次出现的位置，存在返回索引，不存在返回-1
```

## 字母异位词分组
### for of 与for in的区别
### 类型转换和map的使用

``` javascript
const groupAnagrams = (strs) => {
    const map = new Map();
    for (let str of strs) {
        // 循环迭代  str 当前strs中的元素   for..in  则是 当前的索引 
        let array = Array.from(str);
        // 将字符串转换为字符数组
        array.sort();
        let key = array.toString();
        // 将数组转为字符串
        let list = map.get(key) ? map.get(key) : new Array();
        // 如果key存在返回对应的值，不存在返回undefined
        list.push(str);
        map.set(key, list);
    }
    return Array.from(map.values());
    // 将map的所有值转换为数组
};

const groupAnagrams = (strs) => {
    const map = new Object(); 
    for (let s of strs) {
        const count = new Array(26).fill(0);
        for (let c of s) {
            count[c.charCodeAt() - 'a'.charCodeAt()]++;
        }
        map[count] ? map[count].push(s) : map[count] = [s];
    }
    return Object.values(map);
};

```

## 哈希集合

### set集合

### 要点： 

####     1，st.has()方法  判断元素是否存在

```javascript
var longestConsecutive = function(nums) {
    let ans = 0;
    const st = new Set(nums); // 把 nums 转成哈希集合
    for (const x of st) { // 遍历哈希集合  
        if (st.has(x - 1)) {  // st.has() 判断是否存在该元素
            continue;
        }
        // x 是序列的起点
        let y = x + 1;
        while (st.has(y)) { // 不断查找下一个数是否在哈希集合中
            y++;
        }
        // 循环结束后，y-1 是最后一个在哈希集合中的数
        ans = Math.max(ans, y - x); // 从 x 到 y-1 一共 y-x 个数
    }
    return ans;
};

```

