const sb1 = Symbol();
const sb2 = Symbol(42);
const sb3 = Symbol("42");
const sb4 = Symbol("foo");

console.log(typeof sb1);

console.log(sb2 === 42);

console.log(sb2); // Symbol(42)

console.log(Symbol(42) === Symbol(42)); //false 每个都是唯一的
