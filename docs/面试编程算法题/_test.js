var MySymbol = (() => {
    const map = new Map();
    const fn = (key) => {
        const value = `${Date.now()}${Math.random().toFixed(5)}`;
        map.set(key, value);
        return value
    }
    fn.for = (key) => {
        if(map.has(key)) {
            return map.get(key);
        }else {
            return MySymbol(key);
        }
    }
    return fn;
})()

MySymbol('foo');
var a = MySymbol.for('foo');
var b = MySymbol.for('foo');
console.log(a === b); // true