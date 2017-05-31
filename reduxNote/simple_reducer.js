import { createStore } from 'redux'
var store_0 = createStore( () => {})
// 如此一来, 每当触发一个action, Redux就会调用这个函数
// createStore接受一个reducer参数,来注册action的触发条件

var reducer = function(...args) {
	console.log("Reducer was call with args", args)
}

var store_1 = createStore(reducer)