function addMethod(target, name, fn) {
    const old = target[name];
    target[name] = (...args) => {
     if(args.length === fn.length) {
         return fn.apply(this, args);
     }else if(typeof old === 'function') {
         return old.apply(this, args);
     }
    }
 }

const searcher = {};
addMethod(searcher, 'find', function() {
    console.log('查询所有用户');
});

addMethod(searcher, 'find', function(firstName, lastName) {
    console.log('根据全名查询用户');
});

addMethod(searcher, 'find', function(id) {
    console.log('根据 id 查询用户');
})



searcher.find();
searcher.find(123);
searcher.find('chen', 'zhe');