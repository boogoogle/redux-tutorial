// 应用的状态和redux

// action不仅仅是告诉我们"发生了什么",有时候还意味着应该"更新数据"了
// 在一个应用中,数据的更新是一个大问题,主要有以下三个问题
//      在应用的整个生命周期中,我们应该把数据存放在何处?或者说怎么保存这些数据?
//      我该怎样去更新数据,或者说怎么去触发数据的更新?
//      数据改变之后,我怎么通知整个应用(以便采取某些回调)呢?

// 这就是Redux要解决的问题 !!!
// Redux是一个(可预测的状态管理器),这是它的地址  https://github.com/reactjs/redux

/**
 *  redux对以上三个问题的解决方式是这样的
 *  	1. 在应用的整个生命周期中,我们怎么保存数据
 *  		我们可以用任意形式保存数据(JS对象, 数组, 不可变结构)
 *  		应用的数据被称作状态(state,这里是否想到了react中的state?), 因为应用在不同时间/不同操作其实就是对应的不同状态
 *  		只不过这个状态是通过Redux来管理的(Redux是一个状态容器!!! 请记住这一点)
 *  	2. 我怎么触发数据的更新呢?
 *  		通过reducer(reducer 是一个函数)
 *  		reducer 是用来响应action的,也就是说,你发出的action是由reducer来处理的
 *  		reducer 接收 当前状态和action,返回一个新的状态
 *  	3. 数据改变之后,我怎么通知整个应用(以便采取某些回调)呢?
 *  		通过store注册函数store.subscribe(() => {})
 *  		
 */

/**
 * redux提供了
 * 		1. 一个地方保存应用的状态(store),state是store在某个具体时刻的值(类似一个切面)
 * 		2. 一个专门用来执行动作的机制, reducer
 * 		3. 一个用来订阅状态更新的机制(store.subscribe)
 */	


// createStore 用来创建一个 store来存放应用的状态

import { createStore } from 'redux'

// 注意!!! createStore必须接受一个函数(其实这个函数本质是一个reducer,这里先写一个空函数,是es6形式)
var store = createStore(() => {
    console.log("我生成了一个store,来保存整个应用的数据")
})

// Output: 我生成了一个store,来保存整个应用的数据
// 这说明在createStore的时候,你传入的函数,已经被执行了一遍(这里或许有疑惑,不要紧,之后的小节会有解释)
// 也就是说,在createStore(reducers)的时候,传入的reducers都被执行了最少一遍

// 如此,我们就解决了第一个问题,怎么保存应用的数据,那么该怎么去更新数据呢?
// 请看 003_simple_reducer.js

