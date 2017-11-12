import React, {Component} from 'react'
import {connect} from 'react-redux'
import Navigation from './Navigation'

class NavigationContainer extends Component {
    render() {
        return <Navigation navigation={this.props.navigation}/>
    }
}

const mapStateToProps = state => ({nav: state.navigation});
export default connect(mapStateToProps)(NavigationContainer);