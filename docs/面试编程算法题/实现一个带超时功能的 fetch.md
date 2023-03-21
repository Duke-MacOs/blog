# 实现一个带超时功能的 fetch

## 代码实现
```javascript
const creatFetch = (url, time, ...opts) => {
    let controller = new AbortController()
    let signal = controller.signal
    let promise = Promise.race([
        fetch(url, { ...opts, signal }),
        new Promise((resolve, reject) => {
            setTimeout(() => reject(controller.abort()), time * 1000)
        })
    ]);
    return promise
}
```