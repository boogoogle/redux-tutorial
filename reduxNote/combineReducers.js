/**
 * 传入一个对象,这个对象的所有values都是 reducer function
 * 这个函数会把这个对象转换成 单个reducer function
 * 它将会调用对象中的每一个reducer(包括子reducer),然后把他们的执行结果聚集到一个state object中
 * 这个state object的key对应着传入的reducer function 的key
 * 
 * @param  {Object} reducers  一个对象,它的values对应不同的reducer function.
 * 我们可以通过es6的 import * as reducers 语句方便的得到他们
 *
 * @return {Function} 在这个函数内部,每一个reducer都会被执行,然后组成一个相同形式的state object
 */
export default function combineReducers(reducers) {
	const reducerKeys = Object.keys(reducers)
	const finalReducers = {} // 为啥这里是复数?  
	                         // 先对reducers对象进行过滤,排除掉非法的reducer,把过滤后reducer键值对存入finalReducers
	for(let i=0; i<reducerKeys.length; i++) {
		const key = reducerKeys[i]

		if (typeof reducers[key] === 'undefined') {
			console.log(`No reducer provided for key ${key}`)
		}

		if (typeof reducers[key] === 'function') {
			finalReducers[key] = reducers[key]
		}
	}
	console.log("finalReducers:\n", finalReducers)
	const finalReducerKeys = Object.keys(finalReducers)

	return function combination(state={}, action) {  // 这里实际上遍历执行了所有传入combineReducers中的reducer
													 // 所以要求我们在写reducer的时候,如果没有action发生,或者发生的action没有被定义,必须要返回一个传入的state(switch 的 default语句)
													 // 以保证每次只改变一个branch
													 // 其实redux在combineReducers函数里面对各种情况作了判断,如果你写了错误的action或者reducer(比如没有返回传入的state)都会报错
		let hasChanged = false
		for(let i=0; i<finalReducerKeys.length; i++) {
			const key = finalReducerKeys[i]
			const reducer = finalReducers[key]
			const previousStateForKey = state[key] // 取到当前key对应的state branch
			const nextStateForKey = reducer(previousStateForKey, action)  // 执行对应的reducer

			nextState[key] = nextStateForKey	   // 更新当前key 对应的state branch 
			hasChanged = hasChanged || nextStateForKey !== previousStateForKey  // 判断是否需要更新state
		}
		return hasChanged ? nextState : state
	}
}


/*
	combineReducer使用:

 var userReducer = function(state = {}, action) {
	console.log('userReducer was called with state', state, 'and action', action)

    switch (action.type) {
        // etc.
        default:c
            return state;
    }
}

var itemsReducer = function (state = [], action) {
    console.log('itemsReducer was called with state', state, 'and action', action)

    switch (action.type) {
        // etc.
        default:
            return state;
    }
}


 var reducer = combineReducers({
 	user: userReducer,   // 把state整理成两个branch,分别是 state.user ,  state.items
 	items: itemsReducer  // 检测到某一个action发生,执行所有的reducer,但是只会更新对应的branch
 })

 // 这时候打印reducer你会看到
 reducer = function(state={}, action) { // 这就是一个简单的reducer
 	// 第73行代码,也可以把传入的对象拿出来(这正是第13~28行代码做的)
 	let reducerObj = {
 		user: userReducer,
 		items: itemsReducer
 	}
 	let keys = Object.keys(reducerObj)
 	let nextState = {} // 暂时用来保存app的下一个状态

 	keys.forEach((item) => {          // 这里只拿 item == 'user' 的情况距离
 		let preState4Key = state[key] // 读取user对应的state branch,即 state.user
 		let reducer4Key = reducerObj[key]  // 通过这里的key,拿到对应的reducer,执行后得到最新的state.user
 		let nextState4Key = reducer4Key(preState4Key, action) // 这里把对应的state branch拿出来,加上action,一起让对应的reducer处理

 		nextState[key] = nextState4Key == preState4Key ? preState4Key : nextState4Key // 更新总的state中,当前key对应的branch
 		// 这里判断了 preState4Key 和 nextState4Key
 		// 如果传入的action是针对items的,也就是说在处理user的action中并没有定义这种类型
 		// 那么 preState4Key == nextState4Key
 		// 这个时候我们同样为nextState[key]赋值,因为这是在JS中的,React会把这个nextState和state比较,如果没有改变,那么也就不会更新dom
 	});
 }

 */

  
