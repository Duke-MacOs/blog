# 实现 fetch 进度管理
fetch 返回 promise，那么在使用 fetch 的时候如何知道当前进度？

## 代码实现
```javascript
async function getSomething(url, method, data) {
    return new Promise((resolve) => {  
        const resp = await fetch(url, {
            method, 
            body: data
        });

        const total = resp.headers.get('content-length');
        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let body = '';
        let loaded = 0;
        while(1) {
            const { done, value } = await reader.read();
            if(done) break;

            loaded += value.length;
            body += decoder.decode(value);
        }
        resolve(body);
    })
}
```