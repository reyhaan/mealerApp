import React, {Component} from 'react'
import {connect} from 'react-redux'
import AppNavigation from './AppNavigation'

class NavigationContainer extends Component {
    render() {
        return <AppNavigation navigation={this.props.navigation}/>
    }
}

const mapStateToProps = state => ({nav: state.navigation});
export default connect(mapStateToProps)(NavigationContainer);