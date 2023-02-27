# 实现 Array.prototype.reduce
> 实现数组的 reduce 函数

## 测试用例
```javascript
var arr = [1,2,3,4,5];

arr.myReduce((prev, cur) => {
  return prev + cur
}, 0)

arr.myReduce((prev, cur) => {
  return prev + cur
}, 10)

arr.myReduce(123, 0)
```

## 代码实现
```javascript
Array.prototype.myReduce = function(fn, init) {
  if(typeof fn !== 'function') {
    throw new Error(fn + 'is not a function');
  }
  var prev = init || this[0];
  for(let i = init ? 0 : 1; i < this.length; i++) {
    var cur = this[i];
    prev = fn(prev, cur, i, this);
  }
  return prev;
}
```