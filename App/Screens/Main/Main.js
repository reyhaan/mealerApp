import React, {Component} from 'react'
import Expo from 'expo'
import {View, StatusBar, Alert} from 'react-native'
import Navigation from '../../Navigation/Navigation'
import {connect} from 'react-redux'
import styles from './Main.styles'
import {Login} from '../index'
import authenticationService from '../../Services/authentication-service'
import * as ReactNavigation from 'react-navigation'
import {settingsActionCreators} from '../../Redux/Settings/SettingsActions';

class RootContainer extends Component {
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
            await Expo.Font.loadAsync({
                'proximanova-regular': require('../../../assets/fonts/ProximaNova-Regular.ttf'),
                'proximanova-bold': require('../../../assets/fonts/ProximaNova-Bold.ttf')
            });

            if (currentUser) {
                // Update the user app state
                dispatch(getUser(currentUser.uid))
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

    navigationContainer = (navigation)=>{
        return <Navigation navigation={navigation}/>
    };

    render() {
        const {dispatch, nav, auth} = this.props;
        const navigation = ReactNavigation.addNavigationHelpers({
            dispatch,
            state: nav
        });

        if (this.state.fontLoaded) {
            if (this.state.currentUser || auth.user) {
                return (
                    <View style={styles.applicationView}><StatusBar barStyle='dark-content'/>
                        {this.navigationContainer(navigation)}
                    </View>
                )
            } else {
                return <Login/>;
            }
        } else {
            return null;
        }
    }
}

const mapDispatchToProps = dispatch => ({dispatch});
const mapStateToProps = state => ({nav: state.navigation, auth: state.auth});
export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
