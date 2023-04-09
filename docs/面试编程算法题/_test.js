const treeSum = (root) => {
    const arr = [];

    const _bfs = (prev, node) => {
        if(node.left) {
            _bfs(prev + node.val, node.left)
        }
        if(node.right) {
            _bfs(prev + node.val, node.right);
        }
        if(node.left === null && node.right === null) {
            arr.push(prev + node.val);
        }
    }
    _bfs('', root);
    return arr.reduce((prev, current) => {
        return prev + Number(current);
    }, 0);
}

const root = {
    val: 1,
    left: {
        val: 2,
        left: {
            val: 4,
            left: null,
            right: null
        },
        right: {
            val: 5,
            left: null,
            right: null
        }
    },
    right: {
        val: 3,
        left: null,
        right: null
    }
}

console.log(treeSum(root)); // 262