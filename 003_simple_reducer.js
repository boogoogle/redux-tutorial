// 003_ 一个简单的reducer

// 前文最后一句我们提到了用createStore来创建一个store保存应用数据
// 但是这个需要传入一个reducer才能创建,这节我们主要说一下reducer


// reducer首先应该是一个函数类型(Function),至于它的用法和用途,这里先不管它

import { createStore } from 'redux'


// 生成一个store_0,c传入的reducers是 () => {}
var store_0 = createStore(() => {}) 


// 先定义一个reducer,再传入createStore
var reducer = function(...args) {
	console.log("Reducer was call with args", args)
}

var store_1 = createStore(reducer)

// Output : Reducer was call with args [ undefined, { type: '@@redux/INIT' } ]
// 我们应该知道,reducer函数接收两个参数,一个表示应用的状态(state), 一个表示当前触发的动作(action)
// 这里应用一开始是没有定义状态的,所以是undefined,我们的reducer没有触发任何action,但是仍然输出了 { type: '@@redux/INIT' }
// 这是因为redux在初始化应用状态的时候,会默认提供了一个初始的action

// 再重复一下!!!
// reducer是一个函数,它接收两个参数(state, action)
// 很显然,当应用初始化的时候,它的state是没有的,因此是undefined

// 现在应用的执行流程是
// actionCreator  --> action --> reducer

// 但是当redux初始化了应用状态,即触发了默认的action { type: '@@redux/INIT' }时,应用的状态是什么呢?
// 让我们来看一下, 请看004_get_state.js