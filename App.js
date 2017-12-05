import React, {Component} from 'react'
import {Provider} from 'react-redux'
import RootContainer from './App/Screens/Main/Main'
import createStore from './App/Redux/createStore'
import './App/Config/ReactotronConfig'

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {

    render() {
        return (
            <Provider store={createStore()}>
                <RootContainer/>
            </Provider>
        )
    }
}

export default App
