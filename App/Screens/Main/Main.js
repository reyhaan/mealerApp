import React, {Component} from 'react'
import {View, StatusBar, Alert, AsyncStorage} from 'react-native'
import Navigation from '../../Navigation/Navigation'
import {connect} from 'react-redux'
import {Font} from 'expo'
import styles from './Main.styles'
import {LoginScreen} from '../index'
import authenticationService from '../../Services/authentication-service'
import * as ReactNavigation from 'react-navigation'
import {merchantActionCreators} from '../../Redux/Merchant/MerchantActions';

// authenticationService.currentUser().then(user => {
//     if (user && user.type) {
//         // user.type = "merchant";
//         user.type = "customer";
//         activeTab = user.type === "merchant" ? MerchantTab : CustomerTab;
//     }
// });


class RootContainer extends Component {
    state = {
        currentUser: null,
        fontLoaded: false,
    };

    async componentDidMount() {
        try {
            // Calls to initialize app
            const currentUser = await authenticationService.currentUser();
            await Font.loadAsync({
                'proximanova-regular': require('../../../assets/fonts/ProximaNova-Regular.ttf'),
                'proximanova-bold': require('../../../assets/fonts/ProximaNova-Bold.ttf')
            });

            if (currentUser && currentUser.type === "merchant") {

            }

            if (currentUser && currentUser.type === "customer") {

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
                    <View style={styles.applicationView}><StatusBar barStyle='light-content'/>
                        {this.navigationContainer(navigation)}
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

const mapDispatchToProps = dispatch => ({dispatch});
const mapStateToProps = state => ({nav: state.navigation, auth: state.auth});
export default connect(mapStateToProps, mapDispatchToProps)(RootContainer)
