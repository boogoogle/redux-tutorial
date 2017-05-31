// 003_ 一个简单的reducer

// 前文最后一句我们提到了用createStore来创建一个store保存应用数据
// 但是这个需要传入一个reducer才能创建,这节我们主要说一下reducer


import { createStore } from 'redux'
var store_0 = createStore(() => {})
// 如此一来, 每当触发一个action, Redux就会调用这个函数
// createStore接受一个reducer参数,来注册action的触发条件

var reducer = function(...args) {
	console.log("Reducer was call with args", args)
}

var store_1 = createStore(reducer)
// Output : Reducer was call with args [ undefined, { type: '@@redux/INIT' } ]
// 这里我们的reducer没有触发任何action,但是仍然输出了 { type: '@@redux/INIT' }
// 这是因为redux在初始化应用状态的时候,会默认提供了一个初始的action

// 当调用一个reducer的时候,它接收两个参数(state, action)
// 很显然,当应用初始化的时候,它的state是没有的,因为胃undefined

// 但是当redux初始化了应用状态,即触发了默认的action { type: '@@redux/INIT' }时,应用的状态是什么呢?

// 请看004_get_state.js