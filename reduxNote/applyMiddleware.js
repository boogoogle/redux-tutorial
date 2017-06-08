/**
 * 增强store功能 -- middleware
 * 假设我们输入的数据是 resource,  我们使用三个中间件 f, g, h依次处理该数据
 * 	则数据流向是    
 * 		let level1 = h(resource)
 * 		let level2 = h(level1)
 * 		let level3 = h(level2)
 *
 * 		level3就是我们想要的数据
 */


/**
 * 从右到左依次执行函数,最右边的函数可以有多个参数
 * @param funcs  要处理的函数
 * @returns {Function}  返回一个函数,例如: compose(f, g, h)表示(...args) => f(g(h(...args)))
 */
function compose(...funcs) {
    if ( funcs.length == 0 )
        return arg => arg

    if (funcs.length == 1)
        return funcs[0]

    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}


function f(e){
	console.log('ffff' + e + 'ffff')
}
function g(e){
	console.log('gggg' + e + 'gggg')
}
function h(e){
	console.log('hhhh{' + e + '}hhhh')
}
let funcs = [f, g, h]

let res = funcs.reduce(function(acc, val){
	console.log(111111)
	return function(...args){
		acc(val(...args))
	}
})
res('111')