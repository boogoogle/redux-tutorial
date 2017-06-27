/**
 * 异步action
 *
 * 前面我们看到了怎样去发起一个行为(dispatch action) ,并且知道了这些actions通过对应的reducers,怎样改变了应用的状态
 *
 * 但是到此为止,我们只是考虑了同步的action,确切的说,actionCreators是同步创建action的
 * 当我们发起一个动作(action),这些actionCreators 是立即返回对应数据的
 *
 * 现在考虑一种异步的场景,假设
 * 	1. 用户点击了一个按钮,按钮上写着"Say hi 2 seconds"
 * 	2. 点击按钮A,两秒后,把数据hi保存到对应的字段中
 * 	3. 两秒后,更新view为Hi
 *
 * 很明显这条消息是我们应用状态(state)的一部分,所以我们必须把它存在Redux的store里
 * 但是我们希望: 在actionCreator被调用两秒过后,再把这条消息保存到store里
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

// 注意,直接这样写是不生效的,你会发现,reducer接收到的action是一个undefined
var asyncSayActionCreator_0 = function (message) {
    setTimeout(function () {
        return {
            type: 'SAY',
            message
        }
    }, 2000)
}
store_0.dispatch(sayActionCreator_1('Hi'))
// 想一下这里的actionCreator是否会生效?
// 我们说过actionCreator的返回值应该是什么?
// setTimeout这个表达式返回值是什么呢?


// 请务必解答上面三个问题,再看下面代码
var sayActionCreator_1 = function(message) {
	
	// 这里有一个技巧,除了直接返回一个action,我们的actionReducer还可以返回一个函数,
	// !!! 在这个函数中,dispatch一个action !!!
	// 但是如果我们想要让这个函数拥有dispatch action的能力,我们需要传入dispatch这个参数
	return function(dispatch) {
		setTimeout(function(){
			dispatch({
				type: 'SAY',
				message
			})
		}, 2000)
	}
	// 仅仅这么写的话, ActionCreator返回了一个方法,这样redux是会报错的,因为Redux能够接受的action只能
	// 是纯对象,所以这类需要用到一些middleware(中间件)
	
}

store_0.dispatch(sayActionCreator_1('Hi'))


// 中间件请看-> 008_middleware.js








