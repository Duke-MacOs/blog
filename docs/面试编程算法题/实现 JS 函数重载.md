# 实现 JS 函数重载
模仿实现 JQuery addMethod 方法

## 测试用例
```javascript
addMethod(searcher, 'find', function() {
    console.log('查询所有用户');
});

addMethod(searcher, 'find', function(id) {
    console.log('根据 id 查询用户');
})

addMethod(searcher, 'find', function(firstName, lastName) {
    console.log('根据全名查询用户');
});

searcher.find();
searcher.find(123);
searcher.find('chen', 'zhe');
```

## 代码实现
```javascript
// 方式一
function addMethod(target, name, fn) {
    if(!target || !name || Object.prototype.toString.call(fn) !== '[object Function]') return;
    if(!target[name]) {
        target[name] = function() {
            const args = Array.prototype.slice.call(arguments);
            const _fn = target[name][args.length];
            if(_fn) return _fn.apply(this, args);
            throw new Error('函数未定义');
        }
    }
    target[name][fn.length] = fn;
}


// 方式二
function addMethod(target, name, fn) {
   const old = target[name];
   target[name] = (...args) => {
    if(args.length === fn.length) {
        return fn.apply(this, args);
    }else if(typeof old === 'function') {
        return old.apply(this, args);
    }
   }
}
```