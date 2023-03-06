# 实现 pip 执行函数
实现一个 pipe 函数，将需要嵌套执行的函数平铺

## 测试用例
```javascript
var add = x => x + 3;
var square = x => x * 2;
var sub = x => x - 1;

var calc = pipe(sub, square, add);

calc(2); // 5
```

## 代码实现
```javascript
var pipe = (...fns) => {
    return async(...args) => {
        var result = args[0];
        args = args.slice(1);
        for(let i = 0; i < fns.length; i++) {
            const fn = fns[i];
            result = await fn(result, ...args);
        }
        return result;
    }
}
```