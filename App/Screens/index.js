
import React, {Component} from 'react'
import {Colors} from '../Themes/index'
import {Font, AppLoading} from 'expo';
import {View, Alert} from 'react-native'
import Navigation from '../Navigation/Navigation'
import {connect} from 'react-redux'
import * as ReactNavigation from 'react-navigation'
import {authActionCreators} from '../Store/Auth/AuthActions';
import {bindActionCreators} from 'redux'
import Login from './Login/Login'
import SignUp from './SignUp/SignUp'
import Vendors from './Vendors/Vendors'
import Cart from './Cart/Cart'
import OrderHistory from './OrderHistory/OrderHistory'
import VendorOrders from './VendorOrders/VendorOrders'
import Account from './Account/Account'
import UserAccount from './UserAccount/UserAccount'
import InfoTab from './Info/Info'
import Menus from './Menus/Menus'
import Main from './Main/Main'
import MenuForm from './MenuForm/MenuForm'
import VendorDetails from './VendorDetails/VendorDetails'

export const Screens = {
    Login,
    SignUp,
    Vendors,
    Cart,
    Account,
    UserAccount,
    InfoTab,
    Menus,
    MenuForm,
    VendorDetails,
    OrderHistory,
    VendorOrders,
    Main
};


const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        authActions: bindActionCreators(authActionCreators, dispatch)
    }
};

const mapStateToProps = state => ({
    nav: state.navigation,
});

export default connect(mapStateToProps, mapDispatchToProps)(
    class Container extends Component {
        state = {
            fontLoaded: false,
        };

        async componentWillMount() {
            try {
                this.props.authActions.getCurrentUser(); // !important to initialize app

                await Font.loadAsync({
                    'proximanova-regular': require('../Assets/Fonts/ProximaNova-Regular.ttf'),
                    'proximanova-bold': require('../Assets/Fonts/ProximaNova-Bold.ttf'),
                    'Roboto_ medium': require('../Assets/Fonts/Roboto-Medium.ttf')
                });
                this.setState({
                    fontLoaded: true
                });
            } catch (err) {
                Alert.alert('Error', err);
            }
        }

        render() {
            const {dispatch, nav} = this.props;
            const navigation = ReactNavigation.addNavigationHelpers({dispatch, state: nav});

            if (this.state.fontLoaded) {
                return (
                    <View style={{flex: 1, backgroundColor: Colors.white}}>
                        <Navigation navigation={navigation}/>
                    </View>
                )
            }
            else {
                return <AppLoading/>;
            }
        }
    }
)



