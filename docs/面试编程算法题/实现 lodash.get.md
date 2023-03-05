# 实现 lodash 的 get 方法
实现 lodash 的 get 方法：接受一个对象和多个字符串 key 值，返回对应的 obj value

## 测试用例
```javascript
var obj = {
    selector: {
        to: {
            toutiao: 'FE coder'
        },
    },
    target: [
        1,
        2,
        {
            name: 'byted'
        }
    ]
};

get(obj, 'selector.to.toutiao', 'target[0]', 'target[2].name');
```

## 代码实现
```javascript
var get = (target, ...args) => {
    return args.map(str => {
        let obj = target;
        const keys = str.replaceAll(']', '').replaceAll('[', '.').split('.');
        console.log(keys);
        for(let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if(!obj[key]) return null;
            obj = obj[key];
        }
        return obj;
    });
}
```