// 读取状态
import { createStore } from 'redux'

var reducer_0 = function(state, action) {
	console.log('reducer_0接收到的state是', state, '; action是', action)
}

var store_0 = createStore(reducer_0)
// Output: reducer_0接收到的state是 undefined ; action是 { type: '@@redux/INIT' }

console.log("redux初始化应用状态之后,store_0的状态(state)是", store_0.getState())
// Output: redux初始化应用状态之后,store_0的状态(state)是 undefined

/**
 * 哈哈,初始化之后应用的state仍然是undefined,当然是这样啦!
 * 因为我们的reducer 没有返回任何新的东西(之前说过了,reducer应该返回一个新的state)
 */ 

// 现在,我们写一个新的reducer,如果传入的state是undefined,让它返回一些东西
var reducer_1 = function(state, action) {
	console.log('reducer_1接受到的state是:', state, '; action是', action)
	if (typeof state === 'undefined') {
		return {}
	}
	return state
}

var store_1 = createStore(reducer_1);
// reducer_1接受到的state是: undefined ; action是 { type: '@@redux/INIT' }
console.log('redux初始化之后store_1的状态(state)是', store_1.getState())
// redux初始化应用状态之后, store_1的状态(state)是 {}

// 正如所期望的那样, 这里返回的是我们reducer_1的返回值


// 通过es6,我们可以可以写的更清楚一点
var reducer_2 = function(state = {}, action) {// 这里通过es6写法,我们给state初始化传入一个空对象
	console.log('reducer_2接受到的state是:', state, '; action是', action)
	return state
}

var store_2 = createStore(reducer_2);
// Output: reducer_2接受到的state是: {} ; action是 { type: '@@redux/INIT' }
// 这是因为我们用es6的写法给传入的state设置了一个初值
console.log('redux初始化之后store_2的状态(state)是', store_2.getState())
// Output: redux初始化之后store_2的状态(state)是 {}


// 现在,让我们写一个













