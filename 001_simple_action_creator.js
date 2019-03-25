// 001 一个简单的 actionCreator

// action creator 就是一个简单的函数,顾名思义,它返回一个action
// 什么是action??? 一般来说action是一个"纯对象(plain object)",当然之后我们还可能会遇到function类型的

var actionCreator = function() {
	return {
		type: 'AN_ACTION'
	}
}

// 这就是一个actionCreator,它只返回了一个简单的action
// 当然它也可以返回其他的数据类型,比如Function, Promise, 异步action(会在dispatch_async_action.js里看到)

// 我们可以调用这个actionCreator,就会得到我们想要的action
console.log(actionCreator());

// 执行 npm run example 001_simple_action_creator.js  查看输出
// Output: {type: 'AN_ACTION'}

// ok,现在我们生成了一个action, 我们知道,一个action实际上是描述了一个"动作"的发生,那么现在就有两个问题:
//	  1. 我们应该怎样"执行(dispatch)"这个"动作(action)"呢?
//    2. 怎么让系统知道某个具体动作已经被触发了,以便对这个动作做出回应(更新ui,发送请求等)
// 要解决上面两个问题,Redux为我们提供了store这个工具,请看下一节请看002_about_state_and_meet_redux.js

// 到目前为止,在我们的app中,应用的工作流程是这样的
// ActionCreator -> Action