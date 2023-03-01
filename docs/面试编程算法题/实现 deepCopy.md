# 实现一个深拷贝函数
> 要求能够处理循环引用，function 和 symbol 直接返回原始值，set、map 不做处理

## 代码实现
```javascript
function deepCopy(target, visited) {
    var visited = visited || new Map();

    const type = Object.prototype.toString.call(value);

    if(['[object Null]', '[object Undefined]', '[object String]', '[object Number]', '[object Boolean]', '[object Function]', '[object Symbol]'].includes(type)) return 

    if(type === '[object Array]') return target.map(i => deepCopy(i, visited));

    if(type === '[object Object]') {
        const newObj = {};
        if(visited.has(target)) {
            return visited.get(target);
        } else {
            visited.set(target, newObj);
        }
        Object.entries(target).forEach(([key, value]) => {
           newObj[key] = deepCopy(value, visited);
        })
        return newObj;
    }
}
```