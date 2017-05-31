// Provicder and connect

/** 
 * 看过了之前的章节,你应该对这个文件也感到熟悉.但是有一点不同的是:
 * 这里我们没有使用前的thunkMiddleware,取而代之的是.我们使用了一个promise middleware方案,
 * 它允许我们触发异步的actionCreator,并且实现UI的实时更新(或者有条件的更新)
 * 强烈建议看这个示例  https://github.com/erikras/react-redux-universal-hot-example
 */

import { createStore, applyMiddleware, combineReducers } from 'redux'
import promiseMiddleware from './promise-middleware'

// 虽然这里只有一个reducer,但是用下面这种es6的写法,我们可以导入一个reducer的哈希.
import * as reducers from './reducers'

/**
 * @param  data, 这里的参数data用来初始化Redux的store,因为我们会后这种需求
 * 	             在App的初始化过程中,我需要从服务端获取一些初始数据,处理这些数据,然后才决定我一开始显示什么
 * 	             虽然这里我们没有从服务端拉取数据,但是这是一种非常不错的做法
 */
export default function(data) {
	var reducer = combineReducers(reducers)
	var finalCreateStore = applyMiddleware(promiseMiddleware)(createStore)
	var store = finalCreateStore(reducer, data)

	return store
}