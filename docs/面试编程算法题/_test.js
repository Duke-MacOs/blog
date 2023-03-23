function cal(m) {
	const arr1 = [100000, 80000, 60000, 40000, 20000, 5000, 2000, 500, 0];
	const arr2 = [0.45, 0.4, 0.35, 0.3, 0.25, 0.2, 0.15, 0.1, 0.05];
	let result = 0;

	for(let i = 0; i < arr1.length; i++) {
		const val = arr1[i];

		if(m > val) {
			const need = m - val;
			result += need * arr2[i];
			m -= need;
		}
	}
	return result;
}

console.log(cal(123456))