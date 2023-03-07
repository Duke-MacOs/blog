# 实现 url 拆解函数
输入一个 url，返回一个包含 url 所有参数的对象

## 测试用例
```javascript
var url = 'http://sample.com/?a=1&b=2&c=xx&d=2#hash';
queryString(url); // { a: '1', b: '2', c: 'xx', d: '' };
```

## 代码实现
```javascript
var queryString = function(str) {
    var search = new URL(str).search;
    search = search.replace('?', '');
    return search.split('&').reduce((res, cur) => {
        const [key, value] = cur.split('=');
        res[key] = value;
        return res;
    }, {});
}
```
