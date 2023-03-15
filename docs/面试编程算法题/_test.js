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
        return fn;
    }

    fn.waitFirst = (time) => {
        queue.splice(0, 0, () => {
            isLocked = true;
            setTimeout(() => {
                isLocked = false;
                run();
            }, time * 1000)
        });
        return fn;
    }

    fn.do = (str) => {
        queue.push(() => {
            console.log(`Start to ${str}`);
        });
        return fn;
    }

    fn.execute = run;

    return fn;
})();

// arrange('William').execute(); // William is notified

// arrange('William').do('commit').execute();
// // William is notified
// // Start to commit

// arrange('William').wait(5).do('commit').execute();
// // William is notified
// // 等待 5 s
// // Start to commit

arrange('William').waitFirst(5).do('push').execute();
// 等待 5s
// William is notified
// Start to push