# 实现 Symbol
实现一个 Symbol，满足以下条件：
返回的值不能相同
如果我们希望使⽤同⼀个 Symbol 值，可以使⽤ Symbol.for。它接受⼀个字符串作为参数，然后搜索 
有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则返回⼀个新的 Symbol 
值
Symbol 无法作为构造函数使用，即 new Symbol 会报异常

## 测试用例
```javascript
MySymbol('foo');
var a = MySymbol.for('foo');
var b = MySymbol.for('foo');
a === b; // true
```

## 代码实现
```javascript
var MySymbol = (() => {
    const map = new Map();
    const fn = (key) => {
        const value = `${Date.now()}${Math.random().toFixed(5)}`;
        map.set(key, value);
        return value
    }
    fn.for = (key) => {
        if(map.has(key)) {
            return map.get(key);
        }else {
            return MySymbol(key);
        }
    }
    return fn;
})()
```