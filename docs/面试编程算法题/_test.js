const expand = (arr) => {
    const idxArr = new Array(arr.length).fill(0);
    const result = [];

    while(idxArr.find(i => i < arr[0].length) !== undefined) {
        for(let i = 0; i < arr.length; i++) {
            const row = arr[i];
            const idx = idxArr[i];
            const value = row[idx];
            if(value) result.push(value);
            idxArr[i]++;
            if(idx === 0) break;
        }
    }

	return result;
}

const arr = [
    [1,2,3,4,5,6,7,8],
    [9,10,11,12,13,14,15,16],
    [17,18,19,20,21,22,23,24],
    [25,26,27,28,29,30,31,32]
]

// 规律为对角线输出
console.log(expand(arr)); // [1,2,9,3,10,17,4,11,18,25,5,12,19,26,6,13,20,27,...]