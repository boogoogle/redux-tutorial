import React from 'react'
import Home from './home'
import { Provider } from 'react-redux'

export default class Application extends React.Component {
    render () {
        return (
            // Provider必须包裹在根组件上,这样,它以及它的子组件就都能读取Redux的store了,当然了,store必须绑定给Provider
            <Provider store={ this.props.store }>
                <Home />
            </Provider>
        )
    }
}