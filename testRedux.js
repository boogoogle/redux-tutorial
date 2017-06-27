const numAction = {
	type: 'ADD'
}

function createSayAction(text) {
	return {
		type: 'SAY',
		msg: text
	}
}

// let state = {
// 	count: 0
// }

let numReducer = function(state, action){
	let nextState = Object.assign({}, state)
	switch (action.type) {
		case 'ADD':
			nextState.count ++
			break
		case 'INCREASE':
			nextState.count --
			break
		default:
			break;
	}
	return nextState
}

function createStore(reducer, preState) {
	let state = preState
	let currentState = preState

	function dispatch(action) {
		currentState = reducer(state, action)
		console.log('当前状态是', currentState)
	}

	function getState() {
		return currentState
	}

	dispatch({numAction})
	return {
		dispatch,
		getState
	}
	/**
	 * 通过 store = createStore(reducer, [preState])
	 * 因为 函数内部return的对象一直被引用,所有这块内存永远不会被回收
	 * 再函数运行时候定义赋值的 currentState变量一直存在(并随着应用变化不断更新变化)
	 * 所以可以说: 应用每一时刻的状态(state)都保存在这个空间中,随时可取可用
	 * 这就是我疑惑的: 组件的状态保存在哪里呢?  问题
	 */
}

// var sayStore = createStore(sayReducer)

var store = createStore(numReducer) 
console.log(store.getState())
// 当前状态是 { count: 1 }
store.dispatch(numAction)
console.log(store.getState())
// 当前状态是 { count: 2 }