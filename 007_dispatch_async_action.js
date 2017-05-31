/**
 * 异步action
 *
 * 前面我们看到了怎样去dispatch action ,斌天气知道了这些actions通过reducers,改变了应用的状态
 *
 * 但是到此为止,我们只是考虑了同步的action,确切的书,actionCreators是同步创建action的
 * 当我们出发一个action,这些actionCreators 立即返回一个数据
 *
 * 现在考虑一种异步的场景,假设有一条消息
 * 	1. 用户点击了一个按钮,按钮上写着"Say hi 2 seconds"
 * 	2. 点击按钮A,两秒后消息显示为hi
 * 	3. 两秒后,更新view为Hi
 *
 * 很明显这条消息是我们应用状态(state)的一部分,所以我们必须把它存在Redux的store里
 * 但是我们希望: 在actionCreator被调用两秒过后,再把这条消息保存到storey
 * 因为很有可能,在应用的状态(state)改变的时候,有一些view是会跟着马上改变的.我们希望两秒后更新视图(view)
 * 
 * 
 */

import { createStore, combineReducers } from 'redux'

var reducer = combineReducers({
	speak: function (state = {}, action) {
		switch (action.type) {
			case "SAY":
				return {
					...state,
					message: action.message
				}
			default: 
				return state
		}
	}
})

var store_0 = createStore(reducer)
var sayActionCreator = function(message) {
	// 注意,直接这样写是不生效的,你会发现,reducer接收到的action是一个undefined
	// setTimeout(function(){ 
	// 	return {
	// 		type: "SAY",
	// 		message
	// 	}
	// }, 2000)

	// 这里有一个技巧,除了直接返回一个action,我们的actionReducer还可以返回一个函数,
	// 这个函数在之后可以dispatch一个action
	// 但是如果我们想要让这个函数拥有dispatch action的能力,我们需要传入dispatch这个参数
	return function(dispatch) {
		setTimeout(function(){
			dispatch({
				type: 'SAY',
				message
			})
		}, 2000)
	}
	// 仅仅这么写的话, ActionCreator返回了一个方法,这样redux是会报错的,因为action只能
	// 是纯对象,所以这类需要用到一些middleware(中间件)
	
}

store_0.dispatch(sayActionCreator('Hi'))


// 中间件请看-> 008_middleware.js








