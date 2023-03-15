# 实现 arrange
实现一个任务执行控制函数，支持 do，wait, waitFirst, execute 四种函数，具体的执行内容见测试用例

## 测试用例
```javascript
arrange('William').execute(); // William is notified

arrange('William').do('commit').execute();
// William is notified
// Start to commit

arrange('William').wait(5).do('commit').execute();
// William is notified
// 等待 5 s
// Start to commit

arrange('William').waitFirst(5).do('push').execute();
// 等待 5s
// William is notified
// Start to push
```

## 代码实现
```javascript
var arrange = (() => {
    const queue = [];
    let isLocked = false;

    const run = () => {
        while(queue.length !== 0 && isLocked === false) {
            const fn = queue.shift();
            fn();
        }
    }

    const fn = (name) => {
        queue.push(() => {
            console.log(`${name} is notified`);
        });
        return fn;
    }

    fn.wait = (time) => {
        queue.push(() => {
            isLocked = true;
            setTimeout(() => {
                isLocked = false;
                run();
            }, time * 1000)
        })
    }

    fn.waitFirst = (time) => {
        queue.splice(0, 0, () => {
            isLocked = true;
            setTimeout(() => {
                isLocked = false;
                run();
            }, time * 1000)
        })
    }

    fn.do = (str) => {
        queue.push(() => {
            console.log(`Start to ${str}`);
        })
    }

    fn.execute = run();

    return fn;
})();

```