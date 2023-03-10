function flatten(arr, id) {
	const map = {};

	const dps = (arr, parents) => {
		if(!arr) return;
		const _parents = [...parents];
		for(let i = 0; i < arr.length; i++) {
			const obj = arr[i];
			const objId = obj.id;
			const children = obj.children;

			map[objId] = _parents;

			dps(children, [...parents, objId]);
		}
	}

	dps(arr, []);

    console.log(map);

	return map[id]
}

var tree = [{
	id: 1,
    name: '11',
	children: [{
		id: 2,
        name: '22',
		children: [{
			id: 3,
		}, {
			id: 4
		}]
	}]
}, {
	id: 5,
	children: [
		{id: 6}
	],
}, {
	id: 7,
	children: [
		{id: 8}
	]
}]

console.log(flatten(tree, 2));