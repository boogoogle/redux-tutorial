// combineReducers
// combine:使结合,联合


// 首先,创建几个reducer
var reducer_0 = function(state = {}, action){
	console.log("reducer_0接收的state是", state, "; action是", action)

	switch(action.type) {
		case 'SAY':
			return {
				...state, // 注意这是es6的写法 三个点...展开数组
				message: action.value
			}
		default:  // 主要:如果用了switch语句,一定要用default条件返回传入的state哦
			return state
	}
}

// 等一等,现在只有一个SAY动作,如果我们有10个action的时候,会是怎样呢
var reducer_1 = function (state = {}, action) {

    switch (action.type) {
        case 'SAY_SOMETHING':
            return {
                ...state,
                message: action.value
            }
        case 'DO_SOMETHING':
            // ...
        case 'LEARN_SOMETHING':
            // ...
        case 'HEAR_SOMETHING':
            // ...
        case 'GO_SOMEWHERE':
            // ...
        // etc.
        default:// 不要忘了我哦!!!
            return state;
    }
}

// 这TMD也太多了,我们不可能把所有的action都写在一个reducer里面
// 因为不同的动作要因为模块,组件,功能的不同而写到不同的reducer里面,解耦,模块化/组件化都不允许我们这么写
// Redux也认识到了这个情况,所以这里它提供了一个方法,来把我们不同功能的reducer整合起来

var userReducer = function(state = {}, action) {
	console.log('userReducer was called with state', state, 'and action', action)

    switch (action.type) {
        // etc.
        default:
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

/**
 * 如果代码不是复制的话,你应该注意到了:
 * 			userReducer的state初始化为一个 对象, 而
 * 			itemsReducer的state初始化为一个 数组
 * 这里这么写的目的仅仅是为了告诉读者:state可以是不同的数据类型!!!
 * 这是很重要的--因为你应该根据不同的需求设计适当的数据结构来作为应用的状态
 *
 *
 * 这里写了两个reducer,他们每人负责整个应用状态(state)的一部分
 * 但是问题来了--createStore只能接收一个reducer 作为参数!!!
 *
 * so?那么怎么把这两个reducer 合并成一个呢?
 * 在把多个reducer合并之后,我再出发一个action,Redux怎么从里面找出处理当前这个action的哪一个reducer呢
 * combineReducers就是解决上面两个问题的,它接收一个hash(你可以理解为一个JS对象),然后返回一个函数(它本质是一个reducer)
 * 在combineReducers函数执行内部,会调用所有的reducers(他们都是函数),每一个reducer会返回应用状态的一部分,可以理解为"局部状态(state)"
 * 把每一部分整合成一个总的应用状态
 * 具体内部实现可以看源码,说起来很晕乎,但是代码其实不难.现在让我们用一下
 */

import { createStore, combineReducers } from 'redux'

var reducer = combineReducers({
	user: userReducer,
	items: itemsReducer
})
// Output:  
// userReducer was called with state {} and action { type: '@@redux/INIT' }
// userReducer was called with state {} and action { type: '@@redux/PROBE_UNKNOWN_ACTION_j.n.h.f.c.x.g.9.8.q.j.0.r.6.i.x.j.e.m.i' }
// itemsReducer was called with state [] and action { type: '@@redux/INIT' }
// itemsReducer was called with state [] and action { type: '@@redux/PROBE_UNKNOWN_ACTION_r.9.v.s.f.4.2.2.a.r.r.n.0.e.f.p.3.n.m.i' }

// -> 执行combineReducers的时候,内部hash引用到的所有reducer都被执行了两遍
// -> 为什么执行了两遍呢?因为源码中会校验每一个reducer是否设置了default的return值,上面Output的第2/4行就是校验执行的结果


var store_0 = createStore(reducer)
// Output:
// userReducer was called with state {} and action { type: '@@redux/INIT' }
// itemsReducer was called with state [] and action { type: '@@redux/INIT' }

// 如你所见,每一个reducer都被执行,并且触发了redux内置的初始action :{ type: '@@redux/INIT'}
console.log('store_0 state after initialization:', store_0.getState())
// Output: store_0 state after initialization: { user: {}, items: [] }

// 通过combineReducers,createStore之后, Redux返回了应用状态为一个对象 { user: {}, items: [] }

// 现在我们已经知道了reducers的工作原理,现在应该触发(dispatch)一个action,看看它是怎么影响我们应用状态的
// 请看 006_dispatch_action.js


