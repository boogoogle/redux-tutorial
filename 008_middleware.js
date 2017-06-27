/**
 * 008_middleware中间件
 *
 * 上一节我们的异步action报错了,然后说需要用middleware来解决,那么middleware是什么呢?
 *
 * 简单来说:中间件的作用是, 数据从A流出,流经中间件,然后流入B,数据的流向如下
 *
 * A--> middleware1 --> middleware2 --> middleware3 --> ... --> B
 */

/**
 * 那么Redux中中间件是怎样工作的呢?
 * 还记得上一节中,因我们的actionCreator 返回了一个异步的function
 * 但是Redux的reducer只能接收形式为"纯对象"的action
 * 现在我们在actionCreator和reducer之间放置一个中间件,把上面actionCreator返回的函数转换成对象,不就行了?
 * action --> dispatcher  --> middleware1 --> middleware2 --> reducers
 */

/**
 * 每当一个action被触发(dispatch)的时候(包括异步的function中的),我们的中间件都会被触发
 * 当异步条件满足时,中间件会把actionCreator返回的异步方法,转换成Redux需要的action
 */

// Redux中,中间件都是函数,并且其结构应该被定义为如下形式
var anyMiddleware = function ({dispatch, getState}) {
	return function(next) {
		return function (action) {

			// middleware codes
		}
	}
}

/**
 * 如你所见,一个中间件是一个三层函数,他们会被依次执行
 * 1. 第一层提供了dispatch和getState方法给第二层的函数调用,你可能需要在你的middleware或者actionCreator中读取当前的状态
 * 2. 第二层函数提供了一个next方法,通过这个next你可以把转换后的数据传给下一个middleware或者是直接给Redux(这样Redux就可以出发执行reducers了)
 * 3. 第三层函数提供了你从上一个middleware或者diapatch接收到action,你可以把这个action传递给下一个middleware,或者以转换成其他的方式传递
 */

/**
 * 我们给一个异步的actionCreator创建的中间件可以被称之为 thunk,可以参看 https://github.com/gaearon/redux-thunk.
 * 这里是它的一个简单实现(es5语法)
 */

var thunkMiddleware = function({dispatch, getState}) {
	// console.log('进入thunkMiddleware')
	return function(next) {
		// console.log('next动作是', next)//Output: 因为这里只有一个middleware,是 function dispatch(action){...}
		return function(action) {
			// console.log("触发action", action) // Output: function(dispatch){setTi....)
			return typeof action == 'function' ?
				action(dispatch, getState) :
				next(action)
		}
	}
}


// 如果我们需要使用多个middleware,就需要使用Redux提供的 applyMiddleware函数
// applyMiddleware接收一个或多个middleware作为参数,其返回值是一个function,
// 然后这个function会接收createStore作为参数.
// 当这个function执行后,会返回一个执行完所有middleware和dispatch的新store,

// 让我们看看,怎样在Redux里面使用middleware
import { createStore, combineReducers, applyMiddleware } from 'redux'

// const finalCreateStore = applyMiddleware(thunkMiddleware)(createStore)
// 如果有多个middleware,就写 applyMiddleware(middleware1, middleware2, ...)(createStore)

var reducer = combineReducers({
	speaker: function(state={}, action){
		console.log('speaker was called with state', state, 'and action', action)
		switch (action.type){
			case 'SAY':
				return {
					...state,
					message: action.message
				}
			default:
				return state
		}
	}
})

// const store_0 = finalCreateStore(reducer)

console.log('>>>>>>>>>>>>>>', finalCreateStore , '<<<<<<<<<<<<')
// 现在看一个异步的action

var asyncSayActionCreator_1 = function(message){
	return function (dispatch) {
		console.log('我拿到了dispatch', new Date())
		setTimeout(function(){
			console.log(new Date(), 'Dispatch action now')
			dispatch({
				type: "SAY",
				message
			})
		}, 2000)
	}
}
// console.log('\n', new Date(), "Running out async action creator: ", '\n')
// store_0.dispatch(asyncSayActionCreator_1('我是异步的哦'))
// 2017-05-29T04:41:24.954Z Running out async action creator:
// 
// 2017-05-29T04:41:26.959Z 'Dispatch action now'
// speaker was called with state {} and action { type: 'SAY', message: '我是异步的哦' }

// 如上,在actionCreator运行两秒之后, 触发了异步的action,这个异步action的作用是两秒后更新message

/**
 * 目前为止我们学习到了:
 * 	1 怎么去定义action 和 actionCreators
 * 	2 怎样去触发一个action(dispatch action)
 * 	3 怎样使用middleware来触发异步的action
 *
 * 但是还有一个问题是,当state变化时,怎么监听到其变化并作出应有的反应
 * 请看 009_state_subscriber.js
 */


/* 分析分析 */

const finalCreateStore = applyMiddleware(thunkMiddleware)(createStore)
/* finalCreateStore 函数体如下
	(reducer, preloadedState, enhancer) => {
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
*/
const store_0 = finalCreateStore(reducer)
/* store_0 还是一个正常的store对象 
           但是它的dispatch经过finalCreateStore改变了

store_0 = {
	...store, // 这个store是在applyMiddleware函数执行内部形成的
	dispatch  // 这个dispatch是经过中间件处理之后的dispatch
	           打印store_0.dispatch 可得到: 

	          	 function (action) {
					console.log("触发action", action); // Output: function(dispatch){setTi....)
					return typeof action == 'function' ? action(dispatch, getState) : next(action);
				 }

	           

          // 可见,现在的dispatch 是中间件里面最里面一层的返回值(因为这里的传入的action实际上是一个function)
}
*/

function createAsyncFunc(){
	return function(){
		setTimeout(() => {
			console.log('等了我两秒钟啊')
		}, 2000)
	}
}
store_0.dispatch(createAsyncFunc())
// dispatch一个异步方法, 假设createAsyncFunc 返回的函数叫做fn, 即
// fn == function(){
// 		setTimeout(() => {
// 			console.log('等了我两秒钟啊')
// 		}, 2000)
// 	}
// store_0.dispatch(createAsyncFunc()) 返回 fn(),即fn函数的<<<执行结果>>>














