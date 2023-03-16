console.log(bigSum('123456789123456','12345678912345678'));
console.log(bigSum2('123456789123456','12345678912345678'));


function bigSum(a, b) {
    return (BigInt(a) + BigInt(b)).toString();
}
function bigSum2(a, b) {
    let result = '';
    a = a.split('');
    b = b.split('');
    let val1 = a.pop();
    let val2 = b.pop();
    let carry = 0;

    while(val1 || val2 || carry) {
        const cur = Number(val1 || 0) + Number(val2 || 0) + carry;
        result += cur % 10;
        val1 = a.pop();
        val2 = b.pop();
        carry = Math.floor(cur / 10);
    }

    return result.split('').reverse().join('');
}