<meta name="referrer" content="no-referrer"/>

> 由于 OOP 思想大行其道，导致很多 JavaScripter 总想在 JavaScript 中践行"类"的设计模式，即便 ES6 新增了 class 语法，但本质上与其它语言的"类"不同，JavaScript 的继承是基于原型链的。
> 这篇文章会介绍 JavaScript 是如何通过原型链来实现继承能力的。

## "类" 设计模式
通常说的面向对象开发都是基于"类"的设计模式，是为了更好的组织代码，提升系统的健壮性、维护性和拓展性。
特点：

- 封装
   - 数据封装在对象内，外部无法直接访问与修改
- 继承
   - 子类继承父类的方法，达到代码复用的目的
- 多态
   - 子类对于同一个抽象方法有不同的实现，但是都满足接口的定义
```javascript
class Animal {
  // 封装
  private type = 'xx';
  getType() {}
  eat() {}
}

class Bird inherits Animal {
  fly()  {}
}

var duck = new Bird();
```
上面的代码中，Bird 类继承了 Animal 类，实例化的 duck 就同时拥有了 fly 和 eat 的能力。
### 多重继承
通常一个子类只会继承一个父类，但是也有些语言会支持多个父类的继承。但是在实际开发中不推崇使用多重继承，因为多重继承可能导致出乎意料的行为。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/137681/1677225283370-eba13ac3-90e4-4790-9ffc-b9b538840e70.png#averageHue=%23fefefe&clientId=ueb87799c-014e-4&from=paste&height=406&id=u4cd03593&name=image.png&originHeight=812&originWidth=904&originalType=binary&ratio=2&rotation=0&showTitle=false&size=36580&status=done&style=none&taskId=ubb11ecd6-df91-4f21-8a32-53d76362a1d&title=&width=452)

如果 D 同时继承了 B 和 C， B、C 又同时拥有 play 方法，此时 D 的实例该调用哪个父类的方法呢？
### 如何模拟"类"的使用
在 JavaScript 中并不存在 "类"，JavaScript 中都是对象，一个对象并不会复制到其它对象中去。而在其它语言中，类都是表现都是一种复制行为。
"聪明的" JavaScript 使用者，总想在 JavaScript 中模拟类的复制行为，其中一种方法就是 mixin（混入）
```javascript
function mixin(source, target) {
  for(let key in source) {
    if(target[key] === undefined) {
      target[key] = source[key];
    }
  }

  return target;
}
```
这种写法并没有讲引用类型真正复制到 target 对象中，这将是个隐患。
## JavaScript 原型链
JavaScript 中的继承依赖于对象原型链，本质上是对象之间的**关联关系**，这和其它语言中的"类"继承有着本质的不同。
要理解 JavaScript 原型链，只需要记住下面三点：

1. 所有的**函数**都有 prototype 属性，指向一个包含 constructor 的对象
2. 所有的**对象**都内置 [[prototype]] 属性(不可直接访问，通过 __proto__访问)，指向关联的对象
3. **对象**属性的访问，会沿着 [[prototype]] 一直寻找，直到找到尽头的 Object.prototype 对象

![image.png](https://cdn.nlark.com/yuque/0/2023/png/137681/1677289403179-aeba0456-c93c-4b20-beda-db7d31cd07cd.png#averageHue=%239f9687&clientId=ued17ee83-283e-4&from=paste&height=522&id=ub8d8b5af&name=image.png&originHeight=1044&originWidth=1470&originalType=binary&ratio=2&rotation=0&showTitle=false&size=1151606&status=done&style=none&taskId=ub4ba0941-9aa3-4855-b8b1-e50b9ecd815&title=&width=735)
### 理解 new
理解了 JavaScript 的原型链，那么要如何利用它来模拟"类"的使用呢？
在 JavaScript 中会使用 new 关键词生成一个类的实例化对象，那么 new 究竟做了什么来改变函数原有行为呢？
下面的例子，不同的函数调用方式会返回不同的结果：
```javascript
function Nothing() {
  console.log('Nothing happen');
}

var a = Nothing();
var b = new Nothing();

a; // undefined
b; // {}
```
结论：new 会劫持所有函数调用，然后执行以下步骤：

1. 生成一个新对象，并将对象的 [[prototype]] 指向函数的 prototype
2. 调用函数，对象作为 this 传递给函数
3. 最终返回这个对象
```javascript
// 伪代码
function myNew(fn) {
  var obj = Object.create(fn.prototype);
  const res = fn.apply(obj, Array.prototype.slice.call(argument, 1));
  return res || obj;
}
```
### 一个类如何写
所有通过 new 生成的实例对象都可以访问到同一个 prototype 对象，因此所有需要实例对象共享的内容都可以添加在函数的 prototype 对象上：
```javascript
function Bird(name) {
  this.name = name;
}
Bird.prototype.fly = function() {
  console.log(this.name + ' 起飞');
}

var duck = new Bird('鸭子');
duck.fly();
```
### 两个类如何写
JavaScript 将子类与父类的 prototype 关联起来就能实现**继承**特性。
```javascript
function Animal() {}
Animal.prototype.eat = function(){
  console.log(this.name + ' 吃饭')
};

function Bird(name) {
  this.name = name;
}
// 原型链继承
Bird.prototype = Object.create(Animal.prototype);
// 恢复 constructor
Bird.prototype.constructor = Bird;
Bird.prototype.fly = function(){
  console.log(this.name + ' 起飞');
};

var duck = new Bird('duck');
duck.fly();
duck.eat();
```
### 多个类如何写
JavaScript 没有办法实现多继承，只能通过 mixin 的方式实现一个伪多继承，这里只是简单写一下实现，就像前面说的，多继承存在一些问题，因此也不推荐使用多继承：
```javascript
function mixin(child, fathers) {
  // 父类 prototype 混合为一个对象
  var _prototype = fathers.reduce(function(prev, cur) {
    return Object.assign(cur.prototype, prev);
  }, Object.create({}));
  
  child.prototype = Object.create(_prototype);
  child.prototype.constructor = child;
}

function Father1() {}
Father1.prototype.exe1 = function() {
  console.log('father1 exe1');
}

function Father2() {}
Father2.prototype.exe2 = function() {
  console.log('father2 exe2');
}

function Child(){}
mixin(Child, [Father1, Father2]);

var c = new Child();
c.exe1();
c.exe2();
```
## Class 语法糖
Class 语法本质上是 JavaScript 原型链继承的语法糖，并不是类的实现，记住以下 class 语法关键点：

- 使用 **extends** 关键字继承
- 父类 super 必须调用
- 类顶层可定义实例属性
- **#**定义内部属性、方法
- **static** 定义静态属性、方法
```javascript
class Animal {
	eat() {}
}

// extends 关键字继承类
class Bird extends Animal {
  // 实例属性可以定义在类内部最顶层
  _alias = '';

  constructor(name) {
    // super 表示父类构造函数，必须调用
    super();
    this.name = name;
  }


  // 私有属性
  // 私有方法
  #count = 1;
  #getCount() {
    return this.#count;
  }
  
  
  // static 定义静态方法、静态属性，实例无法访问，只能通过类来访问
  // 静态内容会被子类继承
  static p = 1;
  static getClassMethod() {}

  // 设置属性的 getter 和 setter
  get prop() {
    return 'getter';
  }
  set prop(value) {
    console.log('setter: '+value);
  }

  fly() {
    
  }
}
```
因为 JavaScript 支持的 class 语法对于原本使用面向对象编程语言的人来说很不习惯，于是 TypeScript 中对 class 语法进行了拓展：
```typescript
class Animal {
  // 只读属性
  readonly count = 9;
  // 默认为 public，类和实例都能访问
	public name = 'animal';
  // 私有的，只能在自身类中访问
  private _props = {};
  // 可以被子类继承，不能被实例访问
  protected props = {};
}

// abstract 定义抽象类，作为基类
abstract class Animal {
    abstract makeSound(): void;
    move(): void {
        console.log('roaming the earch...');
    }
}

// interface、implements 用于定义 class 类型
interface Pingable {
  ping(): void;
}
 class Sonar implements Pingable {
  ping() {
    console.log("ping!");
  }
}
 
```
## 结论
与其它语言的"类"不同，JavaScript 通过原型链实现继承关系，它本质上就是对象之间通过 [[prototype]] 内置属性实现关联关系。
