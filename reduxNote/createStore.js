
// createStore.js

/**
 * 这是只在Redux内部使用的一个action
 * 对于未知的actions,你必须返回当前的state
 * 如果当前的state未定义,那么你必须返回初始state
 * 不可以在生产环境代码中使用这个 action type
 */
export const ActionTypes = {
	INIT: '@@redux/INIT'
}

/**
 * 创建一个store来保存整个state树
 * 改变store中数据的唯一方式是触发出它的dispatch()
 *
 * 在你的app中,应该只有一个store.那么状态树的不同部分,分别对应不同的action
 * 怎样处理这些不同的action呢? 你需要把各部分不同的reducer联合起来,组成一个大的reducer--> 这就是combineReducers实现的
 *
 *
 * @param {Funcion} [reducer] 一个对象,用来返回下一个状态树,需要传入当前状态树和action
 *
 * @param {any} [preloadedState] 初始状态,可以是各种类型(Function, Object).一般是从服务端拿数据,然后组装而成;或者是还原上一次的用户会话(这句有问题)
 * 如果是用 combineReducers 来作为root reducer方法, 这个初始状态必须是一个对象,并且它的形式得和combineReducers的形式保持一致(一般都是hash)
 *
 * @param {Function} [enhancer] store加强器(这名字翻译的),可选参数.你可以通过第三方库来
 * 扩展store的功能--比如middleware,time travel, persistence等等
 * 增强store的唯一方式是通过 applyMiddleware()方法
 *
 * @return {Store} 返回Redux的store,你可以读取state, dispatch action, subscribe changes
 * 
 */

export default function createStore(reducer, preloadedState, enhancer) {

	// 如果传入的preloadedState是一个方法,而不是一个对象,那么就让enhancer等于它
	if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
		enhancer = preloadedState
		preloadedState = undefined
	}

	if (typeof enhancer !== 'undefined') {
		if (typeof enhancer !== 'function') {
			throw new Error('Excepted the enhancer to be a function')
		}

		return enhancer(createStore)(reducer, preloadedState)
	}

	if (typeof reducer !== 'function') {
		throw new Error('Excepted the reducer to be a function')
	}

	let currentReducer = reducer
	let currentState = preloadedState
	let currentListeners = []  
	let nextListeners = currentListeners // 初始化,当前listener列表和下一个listener列表指向同一个地址
	let isDispatching = false

	// mutate: 变异,变化,使变化
	function ensureCanMutateNextListeners() {
		if (nextListeners === currentListeners) {  // 这里的 === 啥意思?,两个数组指向同一个地址啊
			nextListeners = currentListeners.slice() // 通过slice复制了一份数组
		}
	}

	/**
	 * 读取状态树当前的状态
	 *
	 * @return {any} 返回当前的状态树(state tree) 
	 */
	function getState() {
		return currentState
	}


	/**
	 * 添加一个listener(它是一个回调函数8).每当有一个action被dispatch,它都会被触发
	 * 同时状态树的某一部分可能已经被改变了.你可以在这个回调函数里调用getState()方法来读取当前的state
	 * 当你的listener触发一个dispatch()的时候,可能会在控制台中看到一些警告:
	 * 1. 在每一次的dispatch()执行之前,都会先读取一遍已订阅列表(一个回调函数的列表哈)
	 * 如果这些listeners的执行过程中,你新订阅或者取消了某个订阅,在当前的dispatch()中是不会立即生效的
	 * 然而,下一个dispatch()执行时,会重新读取最新的订阅列表.
	 *
	 * 2. 一个listener不会看到所有的状态变化,因为在一个复杂的dispatch()执行时
	 * 组件的状态很可能已经更新了多次
	 * 
	 * @param  {Function} listener: 每一次dispatch后执行一个回调
	 * @return {Function} 一个方法,用来移除这次变化的listener
	 */
	function subscribe(listener) {
		if (typeof listener !== 'function') {
			throw new Error('Excepted listener to be a function')
		}

		let isSubscribed = true

		ensureCanMutateNextListeners()
		nextListeners.push(listener)

		return function unsubscribe() {
			if(!isSubscribed) {
				return
			}

			isSubscribed = true

			ensureCanMutateNextListeners()
			const index = nextListeners.indexOf(listener)
			nextListeners.splice(index, 1)
		}
	}



	/**
	 * dispatch 一个 action, 这是改变state的唯一方式
	 * reducer方法用来创建store,它接收当前的state tree和action 作为参数.
	 *        返回的数据组成"下一个状态树",同时那些listenders将会得到通知
	 * 基础的dispatch方法只接受"纯对象"作为参数,
	 * 你也可以用dispatch其他的数据类型,比如Promise, Observable,thunk等,这就需要用到对应的middleware
	 * 你需要把 创建store的方法 包裹在对应的middleware中,你可以看react-thunk文档来了解
	 * 事实上,middleware最后也是返回一个纯对象给我们的redux
	 * 
	 * 
	 * @param  {plain Object} 
	 * @return {Object}
	 */
	function dispatch(action) {
		/**
		 *  应该先判断 action类型为 纯函数
		 *             typeof action.type !== 'undefined'
		 */
		
		if (isDispatching) {
			throw new Error('Reducers may not dispatch actions')
		}

		try {
			isDispatching = true
			currentState = currentReducer(currentState, action)
		} finally {
			isDispatching = false
		}

		// 通过subscribe订阅的listener,每次dispatch都会触发他们的执行
		const listeners = currentListeners = nextListeners
		for(let i = 0; i < listeners.length; i++) {
			const listener = listeners[i]
			listener()
		}

		return action
	}

	/**
	 *  替换掉store当前正在使用的reducer,来计算state
	 *  使用场景:
	 *      1. 有时你的代码不是一次性全部加载的,你想动态的加载reducers
	 *      2. 你想要实现Redux的热加载
	 */
	 function replaceReducer(nextReducer) {
	   if (typeof nextReducer !== 'function') {
	     throw new Error('Expected the nextReducer to be a function.')
	   }

	   currentReducer = nextReducer
	   dispatch({ type: ActionTypes.INIT })
	 }

	 dispatch({ type: ActionTypes.INIT})

	 return {
	     dispatch,
	     subscribe,
	     getState,
	     replaceReducer,
	     [$$observable]: observable
	   }
}