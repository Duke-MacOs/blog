const myInstanceof = (target, proto) => {
    let prototype = target.__proto__;
    while(prototype) {
        if(prototype === proto.prototype) return true;
        prototype = prototype.__proto__;
    }
    return false;
}

function Foo () {}
var f = new Foo()
console.log(myInstanceof(f, Foo)); // true
console.log(myInstanceof(f, Object)); // true
console.log(myInstanceof([1,2], Array)); // true
console.log(myInstanceof({ a: 1 }, Array)); // false