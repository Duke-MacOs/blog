# 实现 useDebounceFn
实现一个 useDebounceFn 的 hooks

## 代码实现
```javascript
import { useRef, useEffect } from 'react';

const useDebounceFn = (fn, wait) => {
    const timer = useRef(null);

    useEffect(() => {
        return () => {
            if(timer.current) {
                clearTimeout(timer.current);
            }
        }
    })

    return (...args) => {
        if(timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
            fn(...args);
        }, wait);
    }
}
```