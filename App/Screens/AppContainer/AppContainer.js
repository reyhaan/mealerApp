import React, {Component} from 'react'
import {Colors} from '../../Themes/index'
import {
    Notifications,
    Font,
} from 'expo';
import {View, StatusBar, Alert} from 'react-native'
import Navigation from '../../Navigation/Navigation'
import {connect} from 'react-redux'
import {Login} from '../index'
import authenticationService from '../../Services/authentication-service'
import {registerForPushNotification} from '../../Services/push-notification-service'
import * as ReactNavigation from 'react-navigation'
import {settingsActionCreators} from '../../Redux/Settings/SettingsActions';

class App extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        currentUser: null,
        fontLoaded: false,
    };

    async componentDidMount() {
        try {
            // Calls to initialize app
            const currentUser = await authenticationService.currentUser();
            const {dispatch} = this.props;
            const {getUser, clearCurrentUser} = settingsActionCreators;
            await Font.loadAsync({
                'proximanova-regular': require('../../Assets/Fonts/ProximaNova-Regular.ttf'),
                'proximanova-bold': require('../../Assets/Fonts/ProximaNova-Bold.ttf'),
                'Roboto_medium': require('../../Assets/Fonts/Roboto-Medium.ttf')
            });

            if (currentUser) {
                // Update the user app state
                dispatch(getUser(currentUser.uid));
                registerForPushNotification();
                Notifications.addListener(this._handleNotification);
            } else {
                //clear the user app state
                dispatch(clearCurrentUser())
            }

            this.setState({
                fontLoaded: true,
                currentUser: currentUser
            });
        } catch (err) {
            Alert.alert('Error', err);
        }
    }

    _handleNotification = (notification) => {
        Alert.alert('Error', JSON.stringify(notification));
    };

    navigationContainer = () => {
        const {dispatch, nav} = this.props;
        const navigation = ReactNavigation.addNavigationHelpers({
            dispatch,
            state: nav
        });
        return <Navigation navigation={navigation}/>
    };

    render() {
        if (this.state.fontLoaded) {
            if (this.state.currentUser || this.props.auth.user){
                return (
                    <View style={{flex: 1, backgroundColor: Colors.white}}>
                        <StatusBar barStyle='dark-content'/>
                        {this.navigationContainer()}
                    </View>
                )
            } else {
                return <Login/>
            }
        } else {
            return null;
        }
    }
}

const mapDispatchToProps = dispatch => ({dispatch});
const mapStateToProps = state => ({nav: state.navigation, auth: state.auth});
export default connect(mapStateToProps, mapDispatchToProps)(App)
