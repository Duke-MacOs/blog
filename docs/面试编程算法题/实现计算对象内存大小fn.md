# 实现计算对象内存大小函数
> 实现一个函数，用于计算 JavaScript 对象在内存中占用多少内存

## 测试用例
```javascript
var o1 = {
    name: 'Jack',
    male: false,
    age: 18,
    friends: ['小王', '旺柴']
}

sizeOf(o1); // 64
```

## 代码实现
```javascript
const set = new WeakSet();

function sizeOf(obj) {
	if(obj === null) {
		return 0;
	}

	const map = new Map();

	let size = 0;

	// 注意：对象的 key  也是要占用字节的
	const keys = Object.keys(obj);
	for(let i = 0; i < keys.length; i++) {
		const key = keys[i];
		const val = obj[key];

		// 计算 Key
		size += cal(key);

		if(typeof val === 'object' && val !== null) {
			// 判断是否重复引用
			if(set.has(val)) {
				continue;
			}else {
				set.add(val);
			}
		}

		size += cal(val);
	}
	

	return size;
}



function cal(obj) {
	const type = typeof obj;

	switch(type) {
		case 'string': {
			return obj.length * 2;
		}
		case 'number': {
			return 8
		}
		case 'boolean': {
			return 4;
		}
		case 'object': {
			if(Array.isArray(obj)) {
				// 处理数组
				return obj.map(cal).reduce((res, cur) => res + cur);
			}else {
				// 处理对象
				return sizeOf(obj);
			}
		}
		default: {
			return 0;
		}

	}
}
```