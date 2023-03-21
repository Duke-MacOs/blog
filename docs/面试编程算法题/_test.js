const isContaiNum = (num) => {
    return num % 7 === 0 && num !== 0;
}

console.log(isContaiNum(7)); // true
console.log(isContaiNum(14)); // true
console.log(isContaiNum(10)); // false
console.log(isContaiNum(0)); // false