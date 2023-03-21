# 实现 instanceof
instanceof 可以用来判断继承关系，实现一个 myInstanceof 函数用来判断两个对象之间是否有继承关系

## 测试用例
```javascript
function Foo () {}
var f = new Foo()
console.log(myInstanceof(f, Foo)); // true
console.log(myInstanceof(f, Object)); // true
console.log(myInstanceof([1,2], Array)); // true
console.log(myInstanceof({ a: 1 }, Array)); // false
```

## 代码实现
```javascript
const myInstanceof = (target, proto) => {
    let prototype = target.__proto__;
    while(prototype) {
        if(prototype === undefined || prototype === null) return false;
        if(prototype === proto.prototype) return true;
        prototype = prototype.__proto__;
    }
    return false;
}
```