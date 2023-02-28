> JavaScript 中的 this 总是让人琢磨不透，也是初中级面试中常问的考点。本文就通过最简单的方式教你如何判断 this 的指向。

## 如何判断 this 指向
this 指向一共分为四种：**默认绑定、隐式绑定、强绑定、new 绑定**，优先级从低到高。
### 默认绑定
this 默认绑定在 window 上
```javascript
function show() {
  console.log(this);
}

show(); // window
```
### 隐式绑定
只要这个函数是通过某个对象 . 出来的，那么它的 this 就指向这个对象
```javascript
var a = {
  name: 'a',
  show() {
    console.log(this.name);
  }
}

var b = {
  name: 'b',
  show: a.show,
  c: {
    name: 'c',
    show: a.show,
  }
}

a.show(); // a
b.show(); // b
b.c.show(); // c
```
### 强绑定
call、apply、bind 称为强绑定，this 指向第一个参数
```javascript
var name = 'window'
var a = {
  name: 'a',
  show() {
    console.log(this.name);
  }
}

var b = {
  name: 'b',
  show: a.show,
  c: {
    name: 'c',
    show: a.show,
  }
}

a.show.call(b);
a.show.apply(b.c);
a.show.bind(window)();
```
### new 绑定
通过 new 实例化的对象调用的函数，this 都指向这个实例化函数
```javascript
class Person {
	constructor(name) {
    this.name = name;
  }
  show() {
    console.log(this.name);
  }
}

var Park = new Person('Park');
Park.show();
```
## this 的优先级
当同时出现几种绑定情况时，需要判断 this 的优先级：**new 绑定 > 强绑定 > 隐式绑定 > 默认绑定**

1. **强绑定 > 隐式绑定**
```javascript
var show = function() {
  console.log(this.name);
}
var a = {
  name: 'a'
}
var b = {
  name: 'b',
  show
}

b.show.apply(a); // 'a'
var ShowConstructor = show.bind(a);
var newA = new ShowConstructor();
```

2. **new 绑定 > 强绑定**
```javascript
var show = function() {
  console.log(this.name);
}
var a = {
  name: 'a'
}

// ShowConstructor 已经强绑定在对象 a 上了
var ShowConstructor = show.bind(a);
// new 绑定将 this 指向实例化出来的 newA 对象上，所以是 undefined
var newA = new ShowConstructor(); // undefined
```
## 箭头函数的 this
一句话：箭头函数没有自己的 this，箭头函数的 this 指向它父级作用域的 this
```javascript
var name = 'window';
var show = () => {
  console.log(this.name);
}
var a = {
  name: 'a',
  show
}
// 此时父级作用域是 window，因此 show 的 this 将指向 window
show.apply(a); // window
a.show(); // window

var funA = function() {
  var show = () => {
    console.log(this.name);
  }
  show();
}

funA(); // window
// 此时父级作用域 funA 的 this 指向 a
funA.apply(a) // a


```
## class 中的 this
class 中的 this 大部分时候是指向生成的实例对象，但静态方法内的 this 是指向类，而不是实例对象
```javascript
class Foo {
  static bar() {
    this.baz();
  }
  static baz() {
    console.log('hello');
  }
  baz() {
    console.log('world');
  }
}

Foo.bar() // hello
```
静态方法 bar 的 this 是指向 Foo 类，因此 this.baz 是指向静态方法 baz 而不是实例对象方法 baz
## 总结
this 的指向只需要从默认绑定、隐式绑定、强绑定、new 绑定四个方向考虑，并且优先级从低到高。箭头函数的 this 取决于父级的 this 指向，而 class 中只需要考虑静态方法这个特殊情况即可。
