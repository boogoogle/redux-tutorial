/**
 *	在state更新之后,做点什么
 *
 *  通过之前的几节,我们已经知道怎样更新组件状态,现在有个问题是,组件的状态更新了,那么怎样同步UI的变化呢?
 *  Redux提供了一个subscribe方法,可以让你在state变化之后执行注册的方法,更新UI或者干些其他的事情
 *
 * store.subscribe(function(){
 * 	console.log(store.getState())
 * })
 * 
 */

import { createStore, combineReducers } from 'redux'

var itemsReducer = function(state=[], action){
	console.log('itemsReducer接收到到state是', state, ", action是", action)

	switch(action.type){
		case "ADD_ITEM":
			return [
				...state,
				action.item
			]
		default:
			return state
	}
}

var reducer = combineReducers({
	items: itemsReducer
})
var store_0 = createStore(reducer)

store_0.subscribe(function(){
	console.log('store_0已更新,最新的store数据是:', store_0.getState(), '\n 我是state更新后的回调')
})

var addItemActionCreator = function(item) {
	return {
		type: 'ADD_ITEM',
		item: item
	}
}
store_0.dispatch(addItemActionCreator({
	id:1111,
	description: '我是新来的'
}))
// itemsReducer接收到到state是 [] , action是 { type: '@@redux/INIT' }   
// itemsReducer接收到到state是 [] , action是 { type: '@@redux/PROBE_UNKNOWN_ACTION_k.0.c.x.2.l.e.l.q.h.e.w.j.5.v.4.e.7.b.9' }  -> 这两行是combineReducers运行时执行本reducer产生的
// itemsReducer接收到到state是 [] , action是 { type: '@@redux/INIT' }       -> 这一行是createStore时,执行本reducer产生的
// itemsReducer接收到到state是 [] , action是 { type: 'ADD_ITEM', item: { id: 1111, description: '我是新来的' } }
// store_0已更新,最新的store数据是: { items: [ { id: 1111, description: '我是新来的' } ] }


/**
 * 通过 store_0.subscribe注册的函数被顺利执行,并且组件的state已经更新
 *
 * 
 * 目前为止,我们已经搞定了Redux管理数据的机制,但是还有几个问题:
 * 	1. 我们怎样准确的更新UI?
 * 	2. 怎么取消已经注册的回调?
 * 	3. 更确切的说,怎么把React和Redux联系起来?
 *
 * 现在我们谈一谈,react中的redux
 * 
 * 首先应该弄明白一点: Redux和React没有必然的联系, Redux是一个"JS应用可预测的状态管理机"
 * 如果我们需要用Redux来管理我们的应用数据,它可以和任意其他库搭配,比如vue, angular等
 *
 * 本节的例子中,我们通过一个简单的subscribe语句就成功注册了一个回调,这样在应用状态更新的时候,Redux会触发这个回调
 * 但是在Redux中,我们需要更好的API来实现这个功能,这就是 react-redux的作用
 * 通过 react-redux提供的provider 和 connect接口,你不需要直接用store.subscribe来注册相关回调,因为直接注册的话是非常繁琐复杂的
 * 我们仍然离不开store.subscribe,但是它的实现细节被隐藏在这两个更高一级的API中了
 * 请看 010_Provider_and_connect.js
 * 
 *
 * 
 */

