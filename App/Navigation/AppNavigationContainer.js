import React, {Component} from 'react'
import * as ReactNavigation from 'react-navigation'
import {connect} from 'react-redux'
import AppNavigation from './AppNavigation'

class NavigationContainer extends Component {
    render() {
        const {dispatch, nav} = this.props;
        const navigation = ReactNavigation.addNavigationHelpers({
            dispatch,
            state: nav
        });
        return <AppNavigation navigation={navigation}/>
    }
}

const mapStateToProps = state => ({nav: state.navigation});
export default connect(mapStateToProps)(NavigationContainer);