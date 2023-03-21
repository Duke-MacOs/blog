# 实现解析 URL
实现一个函数用于解析 URL，获得 URL 的域名、路径、参数

## 测试用例
```javascript
const url = 'https://segmentfault.com/a/1190000012113011?utm_source=tag-newest&name=Duke#123';
console.log(parseURL(url));
```

## 代码实现
```javascript
const parseURL = (url) => {
    const o = new URL(url);
    const search = {};
    for(let [key, value] of o.searchParams.entries()) {
        search[key] = value;
    }
    return {
        domain: o.host,
        pathname: o.pathname,
        search
    }
}
```