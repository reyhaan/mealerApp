import React, {Component} from 'react'
import {View, StatusBar, Alert} from 'react-native'
import AppNavigationContainer from '../Navigation/AppNavigationContainer'
import {connect} from 'react-redux'
import {Font} from 'expo'
import styles from './Styles/RootContainerStyles'
import {LoginScreen} from './index'
import authenticationService from '../Services/authentication-service'

class RootContainer extends Component {
    state = {
        fontLoaded: false,
    };

    async componentDidMount() {
        try {
            const currentUser = await authenticationService.currentUser();
            await Font.loadAsync({
                'ProximaNova-Regular': require('../../assets/fonts/ProximaNova-Regular.ttf'),
                'ProximaNova-Bold': require('../../assets/fonts/ProximaNova-Bold.ttf')
            });
            this.setState({
                fontLoaded: true,
                currentUser: currentUser
            });
        } catch (err) {
            Alert.alert('Error', err);
        }
    }

    render() {
        if (this.state.fontLoaded) {
            if (this.state.currentUser) {
                return (
                    <View style={styles.applicationView}><StatusBar barStyle='light-content'/>
                        <AppNavigationContainer/>
                    </View>
                )
            } else {
                return <LoginScreen/>;
            }
        } else {
            return null;
        }
    }
}

const mapDispatchToProps = dispatch => ({});
export default connect(null, mapDispatchToProps)(RootContainer)
