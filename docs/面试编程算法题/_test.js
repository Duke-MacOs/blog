class EventEmitter {
    map = new Map();

    $on(name, fn) {
        if(!this.map.has(name)) {
            this.map.set(name, []);
        }
        this.map.get(name).push(fn);
    }

    $off(name, fn) {
        if(this.map.has(name)){
            this.map.get(name)?.filter(i => i !== fn);
        }
    }

    $emit(name, ...args) {
        if(this.map.has(name)) {
            this.map.get(name).forEach(fn => fn(...args));
        }
    }
}

let bus = new EventEmitter();
function test1 () {
    console.log('test 1');
}
bus.$on('test', test1)
bus.$on('test', (a) => {
    console.log('test 2 ' + a)
})
bus.$off('test', test1)
bus.$emit('test', 'aaa');