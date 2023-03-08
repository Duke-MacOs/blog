class Scheduler {
    limit = 2;
    queue = [];
    currentCount = 0;

    add(fn) {
        this.queue.push(fn);
        this.run();
    }

    run() {
        while(this.queue.length !== 0 && this.currentCount < this.limit) {
            const fn = this.queue.shift();
            this.currentCount++;
            fn().finally(() => {
                this.complete();
            })
        }
    }

    complete() {
        this.currentCount--;
        this.run();
    }
}


var scheduler = new Scheduler();
var print = (str, time) => {
    return () => new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(Date(), str);
            resolve();
        }, time)
    })
}

scheduler.add(print(1, 1000)); // 1s 后打印 1
scheduler.add(print(2, 2000)); // 2s 后打印 2
scheduler.add(print(3, 3000)); // 4s 后打印 3
scheduler.add(print(4, 4000)); // 6s 后打印 4