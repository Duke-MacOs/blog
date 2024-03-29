const clean = (str) => {
    const _isNumber = (val) => !isNaN(Number(val));

    str = str.split('').sort((a, b) => _isNumber(a) ? 1 : -1);

    let left = 0;
    let right = str.length - 1;

    while(left < right) {
        const mid = Math.floor((left + right) / 2);
        const val = str[mid];

        if(_isNumber(val)) {
            right  = mid - 1;
        }else {
            left = mid + 1;
        }
    }

    return str.join('').slice(right);
}

var str = '123asd123asd431qwe';

console.log(clean(str)); // 123123431