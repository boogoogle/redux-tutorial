// 010 Provider and Connect

// 这是JS bundle 的入口,我们在这里创建Redux store,实例化React应用的根组件并且把根组件绑定到DOM上

import React from 'react'
import { render } from 'react-dom'


// 因为有可能要用到服务端的数据来初始化应用,所以重写了createStore方法
import createStore from './create-store'

// Application是我们项目的根组件,Redux的Provider 应该绑定在Application上
import Application from './application'

var store = createStore()

render(
	<Application store = {store} />,
	document.getElementById('app-wrapper')
)

