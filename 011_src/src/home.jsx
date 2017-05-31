/**
 *  ***  Provider and connect  ***
 *
 *  我们之前的几节主要讲的就是怎样从Redux的store中读取状态,和怎样dispatch action
 *  在redux-react中,所有的问题都可以用connect来解决
 * 
 *  通过Provider,可以让应用中所有的组件都可以和Redux建立联系.
 *
 *  使用connect,你可以让组件和store建立联系,可以通过组件的属性(props)来dispatch action.
 *  同时它还在组件上增加了一些属性,来让你读取这个组件的state.
 *
 *  connect是一个HOC(Higher Order Component 高阶组件),它出自函数式编程.
 *  它能够以非继承的方式,给输入值增加一些特性或者行为.它能够应对各种应用场景,不管是hi一个简单的示例,还是一个复杂的应用.
 *  在这个例子中,我们的使用并不复杂,如果有兴趣的话,看这里了解更多https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
 *
 *  connect的API是这样的
 *  connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])
 *  实际用起来是这样的
 *  const wrappedComponentClass = connect(...)(ComponentClass)
 *
 *  这里我们只使用了 mapStateToProps 这个参数,一般来说它是一个对象.你想把哪些props暴露给组件
 *  
 *
 *  
 */


import React from 'react'
import { connect } from 'react-redux'

import * as actionCreators from './action-creator'

class Home extends React.Component {
	onTimeButtonClick(delay) {
		debugger
		this.props.dispatch(actionCreators.getTime(delay))
	}
    componentWillReceiveProps(nextProps) {

    }
	render() {
		var { frozen, time, reduxState } = this.props//通过下面的mapStateToProps把state上面的对应值赋给了this.props,所以这里能够拿到(这也是es6写法)
		var attrs = {}
		const DELAY = 500 // 毫秒

		if (frozen) {
			attrs = {
				disabled: true
			}
		}

		return (
		    <div>
				<div>
					<button {...attrs} onClick={() => this.onTimeButtonClick(DELAY)}>   获取时间	</button>
				</div>
				<pre>
					redux state = { JSON.stringify(reduxState, null, 2) }
				</pre>
            </div>
		)
	}
}

const mapStateToProps = (state/*, props*/) => {
	// 这里可以对这些数据走一些处理,因为是演示,就直接返回了
	return {
		frozen: state._time.frozen,
		time: state._time.time,
		// 一般我们都会用state.xxx来读取state上的某个属性,不会直接: state 输出整个state,这里仅仅是演示使用
		reduxState: state
	}
}
const ConnectedHome = connect(mapStateToProps)(Home)

export default ConnectedHome