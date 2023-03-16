function isAsyncFunction(fn) {
    return fn[Symbol.toStringTag] === 'AsyncFunction';
}

console.log(isAsyncFunction(() => {})); // false
console.log(isAsyncFunction(async() => {})); // true