import React, {Component} from 'react'
import {View, StatusBar} from 'react-native'
import AppNavigationContainer from '../Navigation/AppNavigationContainer'
import {connect} from 'react-redux'
import {Font} from 'expo'
import styles from './Styles/RootContainerStyles'

class RootContainer extends Component {
    state = {
        fontLoaded: false,
    };

    async componentDidMount() {
        await Font.loadAsync({
            'ProximaNova-Regular': require('../../assets/fonts/ProximaNova-Regular.ttf'),
            'ProximaNova-Bold': require('../../assets/fonts/ProximaNova-Bold.ttf')
        });
        this.setState({fontLoaded: true});
    }

    render() {
        return (
            this.state.fontLoaded ? (
                <View style={styles.applicationView}>
                    <StatusBar barStyle='light-content'/>
                    <AppNavigationContainer/>
                </View>
            ) : null
        )
    }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({});

export default connect(null, mapDispatchToProps)(RootContainer)
