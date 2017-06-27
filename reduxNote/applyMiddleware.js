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
 * @returns {Function}  返回一个函数,例如: compose(f, g, h)(...args)表示(...args) => f(g(h(...args)))
 */
function compose(...funcs) {
    if ( funcs.length == 0 )
        return arg => arg

    if (funcs.length == 1)
        return funcs[0]

    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}


function f(f){
	let r = 'ffff>>' + f+ '<<ffff'
	console.log(r)
	return r
}
function g(g){
	let r = 'gggg>>' + g + '<<gggg'
	console.log(r)
	return r
}
function h(h){
	let r = 'hhhh>>' + h + '<<hhhh'
	console.log(r)
	return r
}
let funcs = [f, g, h]
compose(funcs)('111')
// let res = funcs.reduce(function(acc, cur){
// 	console.log('accelorator:这是最新的累计执行效果', acc)
// 	return function(...args){
// 		acc(cur(...args))
// 	}
// })
// res('111')
// Output:
// hhhh>>111<<hhhh
// gggg>>hhhh>>111<<hhhh<<gggg
// ffff>>gggg>>hhhh>>111<<hhhh<<gggg<<ffff
// 



function applyMiddleware(...middlewares) {
  // 这是applyMiddleware主函数,首先看第一层,它返回一个函数,接受 createStore为参数
  return (createStore) => (reducer, preloadedState, enhancer) => {
    const store = createStore(reducer, preloadedState, enhancer)
    let dispatch = store.dispatch
    let chain = []

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }
    chain = middlewares.map(middleware => middleware(middlewareAPI))
    // 假设这里只有一个中间件,即 middlewares = [onlyMiddleware]
    // chain = [onlyMiddleware(middlewareAPI)]
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    } // 复制之前store的方法,并且更新store.dispatch方法
  }
}






/** 如何使用 **/


// 先写一个middleware
// middleware要写成固定格式,以方便appleyMiddleware执行
var middleware = function({dispatch, getState}) {  // 通过上面第72行传入,可以在中间件内部拿到当前状态,并dispatch相关action
	// 此时, chain = [function(next){}, function(next){}...]
	// 如果只有一个middleware,则chain = [function(next){}],假设这个function(next){} == fn
	// 然后dispatch = fn(store.dispatch)
	return function(next) {
		return function(action) { // 这里的action可就不是纯对象了,而可能是任意数据类型:函数,Promise等

		}
	}
}

// 写一个方法,它会在延迟一段时间后dispatch一个action
// 之前说过,dispatch只能接受action(纯对象)
// 通过applyMiddleware创建的store,既可以dispatch一个函数
// 那么经过applyMiddleware生成的store内部是什么样的呢?
let asyncAction = function(dispatch) {
	setTimeout(() => {
		dispatch({
			type: 'ADD'
		})
	}, 10)
}








