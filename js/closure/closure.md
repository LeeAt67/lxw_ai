# JavaScript函数式编程深入解析：从arguments到柯里化

## 一、函数基础

### 1.1 函数的本质
在JavaScript中，函数是一等公民，这意味着：
- 函数可以像普通变量一样被赋值
- 函数可以作为参数传递
- 函数可以作为返回值
- 函数可以存储在数据结构中

### 1.2 函数参数
#### 1.2.1 形参和实参
```javascript
function add(a, b) {  // a, b 是形参
    return a + b;
}
add(1, 2);  // 1, 2 是实参
```

#### 1.2.2 arguments对象
- 类数组对象，包含传递给函数的所有参数
- 具有length属性
- 可以通过索引访问元素
- 不是真正的数组，不能使用数组方法

```javascript
function sum() {
    let total = 0;
    for(let i = 0; i < arguments.length; i++) {
        total += arguments[i];
    }
    return total;
}
console.log(sum(1, 2, 3, 4)); // 10
```

#### 1.2.3 剩余参数（Rest Parameters）
```javascript
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4)); // 10
```

## 二、闭包（Closure）

### 2.1 闭包的定义
闭包是指能够访问自由变量的函数。自由变量是指在函数内部使用，但既不是函数参数也不是函数局部变量的变量。

### 2.2 闭包的形成过程
```javascript
function createCounter() {
    let count = 0;  // 自由变量
    return {
        increment() { return ++count; },
        decrement() { return --count; },
        getCount() { return count; }
    };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
```

### 2.3 闭包的作用域链
- 每个函数都有自己的作用域
- 内部函数可以访问外部函数的作用域
- 形成作用域链
- 变量查找遵循就近原则

### 2.4 闭包的应用场景
#### 2.4.1 数据私有化
```javascript
function createPerson(name) {
    let _name = name;  // 私有变量
    return {
        getName() { return _name; },
        setName(newName) { _name = newName; }
    };
}
```

#### 2.4.2 函数工厂
```javascript
function createMultiplier(factor) {
    return function(x) {
        return x * factor;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
```

#### 2.4.3 模块化开发
```javascript
const module = (function() {
    let privateVar = 0;
    
    return {
        increment() { return ++privateVar; },
        decrement() { return --privateVar; }
    };
})();
```

## 三、函数式编程进阶

### 3.1 纯函数
- 相同的输入总是产生相同的输出
- 没有副作用
- 不依赖外部状态

```javascript
// 纯函数
function add(a, b) {
    return a + b;
}

// 非纯函数
let total = 0;
function addToTotal(x) {
    total += x;  // 副作用：修改外部状态
    return total;
}
```

### 3.2 高阶函数
- 接收函数作为参数
- 返回函数作为结果

```javascript
function map(array, fn) {
    return array.map(fn);
}

function filter(array, predicate) {
    return array.filter(predicate);
}
```

## 四、柯里化（Currying）

### 4.1 柯里化的概念
柯里化是将多参数函数转化为一系列单参数函数的技术。

### 4.2 基础柯里化实现
```javascript
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return function(...moreArgs) {
            return curried.apply(this, args.concat(moreArgs));
        }
    }
}
```

### 4.3 柯里化的应用
#### 4.3.1 参数复用
```javascript
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
const addTwo = curriedAdd(2);
console.log(addTwo(3)(4)); // 9
```

#### 4.3.2 延迟执行
```javascript
const log = curry((type, message) => {
    console.log(`[${type}] ${message}`);
});

const logError = log('ERROR');
const logInfo = log('INFO');

logError('发生错误');  // [ERROR] 发生错误
logInfo('系统正常');   // [INFO] 系统正常
```

### 4.4 高级柯里化实现
```javascript
function advancedCurry(fn, arity = fn.length) {
    return function curried(...args) {
        if (args.length >= arity) {
            return fn.apply(this, args);
        }
        return function(...moreArgs) {
            return curried.apply(this, args.concat(moreArgs));
        }
    }
}

// 支持占位符的柯里化
function placeholderCurry(fn, arity = fn.length) {
    const _ = Symbol('placeholder');
    
    function isPlaceholder(arg) {
        return arg === _;
    }
    
    function replacePlaceholders(args, moreArgs) {
        let result = [...args];
        let moreIndex = 0;
        
        for (let i = 0; i < result.length; i++) {
            if (isPlaceholder(result[i]) && moreIndex < moreArgs.length) {
                result[i] = moreArgs[moreIndex++];
            }
        }
        
        return result.concat(moreArgs.slice(moreIndex));
    }
    
    return function curried(...args) {
        if (args.length >= arity && !args.some(isPlaceholder)) {
            return fn.apply(this, args);
        }
        
        return function(...moreArgs) {
            const newArgs = replacePlaceholders(args, moreArgs);
            return curried.apply(this, newArgs);
        }
    }
}
```

## 五、实践应用

### 5.1 函数组合
```javascript
const compose = (...fns) => 
    fns.reduce((f, g) => (...args) => f(g(...args)));

const addOne = x => x + 1;
const double = x => x * 2;
const addOneAndDouble = compose(double, addOne);
console.log(addOneAndDouble(3)); // 8
```

### 5.2 管道操作
```javascript
const pipe = (...fns) => 
    fns.reduce((f, g) => (...args) => g(f(...args)));

const addOneAndDouble = pipe(addOne, double);
console.log(addOneAndDouble(3)); // 8
```

## 六、最佳实践

### 6.1 性能优化
- 避免过度使用闭包
- 及时释放不需要的闭包
- 合理使用柯里化

### 6.2 代码组织
- 使用函数组合提高代码复用性
- 保持函数的纯度和可测试性
- 适当使用函数式编程范式

### 6.3 调试技巧
- 使用console.log追踪闭包变量
- 使用debugger语句进行断点调试
- 使用Chrome DevTools的Scope面板查看闭包

## 七、总结

函数式编程和闭包是JavaScript中强大的编程范式，通过深入理解这些概念，我们可以：
1. 写出更加模块化和可维护的代码
2. 提高代码的复用性和可测试性
3. 更好地处理异步操作和状态管理
4. 实现更优雅的函数组合和转换

掌握这些概念需要实践和耐心，建议从简单的例子开始，逐步深入到更复杂的应用场景。

## 八、函数与对象的关系

### 8.1 函数是特殊的对象
在JavaScript中，函数本质上是一种特殊的对象，具有以下特性：

```javascript
function sayHello(name) {
    console.log(`Hello, ${name}!`);
}

// 函数作为对象，可以添加属性
sayHello.description = "这是一个问候函数";
sayHello.version = "1.0.0";

// 函数作为对象，可以访问属性
console.log(sayHello.description); // "这是一个问候函数"
```

### 8.2 函数的内部属性
每个函数对象都包含以下重要属性：

```javascript
function example() {
    console.log("示例函数");
}

// 1. name属性：函数名
console.log(example.name); // "example"

// 2. length属性：形参个数
function add(a, b, c) {}
console.log(add.length); // 3

// 3. prototype属性：原型对象
console.log(example.prototype); // {constructor: ƒ}

// 4. __proto__属性：指向Function.prototype
console.log(example.__proto__ === Function.prototype); // true
```

### 8.3 函数作为构造函数
函数可以作为构造函数创建对象：

```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// 添加原型方法
Person.prototype.sayHello = function() {
    console.log(`Hello, I'm ${this.name}`);
};

// 创建实例
const person = new Person("张三", 25);
person.sayHello(); // "Hello, I'm 张三"
```

### 8.4 函数作为对象的方法
函数可以作为对象的方法：

```javascript
const calculator = {
    value: 0,
    add(x) {
        this.value += x;
        return this;
    },
    subtract(x) {
        this.value -= x;
        return this;
    },
    getValue() {
        return this.value;
    }
};

console.log(calculator.add(5).subtract(2).getValue()); // 3
```

### 8.5 函数作为对象的属性
函数可以作为对象的属性，实现数据封装：

```javascript
const counter = {
    _count: 0,
    increment() {
        this._count++;
        return this._count;
    },
    decrement() {
        this._count--;
        return this._count;
    },
    getCount() {
        return this._count;
    }
};

console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
```

### 8.6 函数与对象的关系总结

1. 函数是对象
   - 可以添加属性
   - 可以访问属性
   - 可以作为值传递

2. 函数作为构造函数
   - 创建新对象
   - 设置原型链
   - 初始化对象属性

3. 函数作为方法
   - 对象的行为
   - 访问对象属性
   - 修改对象状态

4. 函数作为属性
   - 数据封装
   - 访问控制
   - 状态管理

### 8.7 实际应用示例

#### 8.7.1 函数工厂
```javascript
function createCalculator(initialValue = 0) {
    return {
        value: initialValue,
        add(x) {
            this.value += x;
            return this;
        },
        subtract(x) {
            this.value -= x;
            return this;
        },
        getValue() {
            return this.value;
        }
    };
}

const calc = createCalculator(10);
console.log(calc.add(5).subtract(3).getValue()); // 12
```

#### 8.7.2 模块模式
```javascript
const module = (function() {
    let privateVar = 0;
    
    return {
        increment() {
            privateVar++;
            return privateVar;
        },
        decrement() {
            privateVar--;
            return privateVar;
        },
        getValue() {
            return privateVar;
        }
    };
})();

console.log(module.increment()); // 1
console.log(module.increment()); // 2
console.log(module.getValue());  // 2
```

#### 8.7.3 混合模式
```javascript
function createPerson(name) {
    const person = {
        name,
        sayHello() {
            console.log(`Hello, I'm ${this.name}`);
        }
    };
    
    // 添加更多方法
    Object.assign(person, {
        sayGoodbye() {
            console.log(`Goodbye, ${this.name}`);
        },
        getInfo() {
            return `Name: ${this.name}`;
        }
    });
    
    return person;
}

const person = createPerson("李四");
person.sayHello();    // "Hello, I'm 李四"
person.sayGoodbye();  // "Goodbye, 李四"
console.log(person.getInfo()); // "Name: 李四"
``` 