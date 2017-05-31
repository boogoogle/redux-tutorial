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
	const finalReducers = {}
	for(let i=0; i<reducerKeys.length; i++) {
		const key = reducersKeys[i]

		if (typeof reducers[key] === 'undefined') {
			console.log('No reducer provided for key "{$key}')
		}

		if (typeof reducers[key] === 'function') {
			finalReducers[key] = reducers[key]
		}
	}
	const finalReducerKeys = Object.keys(finalReducers)

	return function combination(state={}, action) {
		let hasChanged = false
		for(let i=0; i<finalReducerKeys.length; i++) {
			const key = finalReducerKeys[i]
			const reducer = finalReducers[key]
			const previousStateForKey = state[key]
			const nextStateForKey = reducer(previousStateForKey, action)

			nextState[key] = nextStateForKey	
			hasChanged = hasChanged || nextStateForKey !== previousStateForKey
		}
		return hasChanged ? nextState : state
	}
}
