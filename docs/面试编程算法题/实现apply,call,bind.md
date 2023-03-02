# 实现 Array.prototype.reduce
> 实现 apply、call、bind

## 测试用例
```javascript
var fn = function() {
    console.log(this.count + Array.prototype.slice.call(arguments)[0]);
}
var a = {
    count: 1
}

fn.myApply(a, [10, 11, 12]);
fn.myCall(a, 10, 11, 12);
fn.myBind(a)(10, 11, 12);
```

## 代码实现
```javascript
Function.prototype.myApply = function(target, args) {
    var context = target ?? window;
    context.fn = this;
    return context.fn(...args);
}

Function.prototype.myCall = function(target) {
    var args = Array.prototype.slice.call(arguments, 1);
    var context = target ?? window;
    context.fn = this;
    return context.fn(...args);
}

Function.prototype.myBind = function(target) {
    var fn = this;
    var res = function() {
        return fn.apply(target, Array.prototype.slice.call(arguments));
    }

    return res;
}
```