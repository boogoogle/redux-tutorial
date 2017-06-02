/**
 * dispatch action
 * 沿用之前的例子,我们开始触发几个动作(dispatch action)
 */


var userReducer = function(state = {}, action){
	console.log('userReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case 'SET_NAME':
            return {
                ...state,
                name: action.name
            }
        default:
            return state;
    }
}

var itemsReducer = function (state = [], action) {
    console.log('itemsReducer was called with state', state, 'and action', action)

    switch (action.type) {
        case 'ADD_ITEM':
            return [
                ...state,
                action.item
            ]
        default:
            return state;
    }
}

import { createStore, combineReducers } from 'redux'

var reducer = combineReducers({
    user: userReducer,
    items: itemsReducer
})
var store_0 = createStore(reducer)

console.log("\n", '### It starts here')
console.log('store_0 state after initialization:', store_0.getState())
// Output:
// store_0 state after initialization: { user: {}, items: [] }

// 现在触发一个action
store_0.dispatch({
	type:'AN_ACTION'
})
// Output:
// userReducer was called with state {} and action { type: 'AN_ACTION' }
// itemsReducer was called with state [] and action { type: 'AN_ACTION' }

// 因为我们的action没有匹配上userReducer和itemsReducer的的action.type里面
// 所以应用的状态没有任何改变,依然是:

console.log('store_0 state after action AN_ACTION:', store_0.getState())
// Output: store_0 state after action AN_ACTION: { user: {}, items: [] }


// 这里,我们通过actionCreate来生成我们的action
var setNameActionCreater = function(name) {
	return {
		type: 'SET_NAME',
		name: name
	}
}
store_0.dispatch(setNameActionCreater('小明'))
// OUtput:
// userReducer was called with state {} and action { type: 'SET_NAME', name: '小明' }
// itemsReducer was called with state [] and action { type: 'SET_NAME', name: '小明' }
console.log("在store_0 触发了上面的action之后,,store_0的状态是", store_0.getState())
// Output: 在store_0 触发了上面的action之后,,store_0的状态是 { user: { name: '小明' }, items: [] }

// 目前为止应用的运行流程是
// actionCreator 产生一个 action --> store.dispatch发出通知,我这个动作(action)发生了哈--> reducer处理对应的action

// 以上,我们已经用redux完成了一个简单的应用,但是很多情况下,
// 我们可能需要触发一个异步事件(比如ajax),然后再去触发一个action,然后用对应的reducer来处理这个对应的action,然后...
// 请看下一节  007_dispatch_async_action.js