# 常见 JavaScript 问题及解决方案

## input 监听中文输入
> 问题描述：在 input 输入框输入中文时，在未完成输入时会频繁触发 input 事件。

> 解决方案：通过 compositionstart、compositionend 两个事件配合"开关"变量，compositionend 会早于 input 事件触发。

```javascript
// 开关
let flag = false
const textEle = document.querySelector("#text");

textEle.addEventListener('input', ev=>{
    if(!flag){
        console.log(ev.target.value)
    }
})

textEle.addEventListener('compositionstart', (ev)=>{
    flag = true;
    console.log('start:', ev.target.value)
})

textEle.addEventListener('compositionend', (ev)=>{
    flag = false;
    console.log('end:', ev.target.value)
})
```

