const fn = (str1, str2) => {
    const arr1 = str1.split('').reverse();
    const arr2 = str2.split('').reverse();
    const list = [];
    let res = '';

    for(let i = 0; i < arr1.length; i++) {
        const newArr = new Array(i).fill(0);
        const val1 = arr1[i];
        let k = 0;
        for(let j = 0; j < arr2.length; j++) {
            const res = val1 * arr2[j] + k;
            k = Math.floor(res / 10);
            newArr.push(res % 10);
            if(j === arr2.length - 1) {
                newArr.push(Math.floor(res / 10));
            }
        }
        list.push(newArr);
    }
    console.log(list);

    let k = 0;
    while(list.some(i => i.length !== 0)) {
        let r = 0;
        list.forEach(l => {
            r += l.shift() || 0;
        });
        r += k;
        k = Math.floor(r / 10);
        res += r % 10;
    }

    return res.split('').reverse().join('');
}

console.log(fn('2342423423424234234234234234242342353454365', '43543534643345343253464363454235234235345346'))