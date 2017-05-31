// 001 一个简单的 actionCreator

// action creater 就是一个简单的函数,顾名思义,它返回一个action
// 什么是action??? 这个你肯定已经知道啦

var actionCreator = function() {
	return {
		type: 'AN_ACTION'
	}
}

// 哈哈,这就是一个actionCreator,它只返回了一个简单的action
// 当然它也可以返回其他的数据类型,比如Function, Promise, 异步action(会在dispatch_async_action.js里看到)

// 我们可以调用这个actionCreator,就会得到我们想要的action
console.log(actionCreator());
// Output: {type: 'AN_ACTION'}


// 那么具体我们应该怎么使用它呢?
// 如果想让系统知道哪一个action被触发了?我们就需要去注册一个函数(handles,有的翻译叫句柄...)

// 到目前为止,再我们的app中,数据的流向是这样的
// ActionCreator -> Action

// 请看002_about_state_and_meet_redux.js