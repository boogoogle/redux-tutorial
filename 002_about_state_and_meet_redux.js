// state和redux介绍

// action不仅仅是告诉我们"发生了什么",有时候还意味着应该"更新数据"了
// 在一个应用中,数据的更新是一个大问题,主要有一下三个问题
// 在应用的整个生命周期中,我们应该把数据存放在何处?或者说怎么保存这些数据?
// 我该怎样去触发这个数据的更新?
// 我如何把我的变动传递到应用的所有部分呢?(How do I propagate modifications to all parts of my application?)

// 这就是Redux要解决的问题 !!!

/**
 *  redux对以上三个问题的解决方式是这样的
 *  	1. 在应用的整个生命周期中,我们怎么保存数据
 *  		我们可以用任意形式保存数据(JS对象, 数组, 不可变结构)
 *  		应用的数据被称作state(状态), 因为应用在不同时间/不同操作其实就是对应的不同的状态
 *  		只不过这个状态是通过Redux来管理的(Redux是一个状态容器!!! 请记住这一点)
 *  	2. 我怎么触发数据的更新呢?
 *  		通过reducer(reducer 是一个函数)
 *  		reducer 是用来 注册action 的
 *  		reducer 接收 当前状态和action,返回一个新的状态
 *  	3. 我如何把变动传递到应用的所有部分呢(How do I propagate modifications to all parts of my application?)
 *  		通过状态修改的注册函数(Using subscribers to state's modifications)
 *  		
 */

/**
 * redux提供了
 * 		1. 一个地方保存应用的状态(state)
 * 		2. 一个专门用来触发action的机制,reducer
 * 		3. 一个用来订阅状态更新的机制
 */	


// createStore 用来创建一个 store来存放应用的状态

import { createStore } from 'redux'

// 注意!!! 这类的createStore必须接受一个函数(其实这个函数本质是一个reducer,reducer是一个函数,这里先写一个空函数,是es6形式)
var store = createStore(() => {})


// 如此,我们就解决了第一个问题,怎么保存应用的数据
// 请看 simple_reducer.js

