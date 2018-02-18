
import React, { Component } from 'react';
import { Font, AppLoading } from 'expo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReactNavigation from 'react-navigation';
import { View, Alert } from 'react-native';
import Navigation from '../Navigation/Navigation';
import { authActionCreators } from '../Store/Auth/AuthActions';
import { Colors } from '../Themes/index';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Vendors from './Vendors/Vendors';
import Cart from './Cart/Cart';
import OrderHistory from './OrderHistory/OrderHistory';
import VendorOrders from './VendorOrders/VendorOrders';
import Account from './Account/Account';
import UserAccount from './UserAccount/UserAccount';
import InfoTab from './Info/Info';
import Menus from './Menus/Menus';
import Main from './Main/Main';
import MenuForm from './MenuForm/MenuForm';
import Vendor from './Vendor/Vendor';

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
  Vendor,
  OrderHistory,
  VendorOrders,
  Main,
};

const mapDispatchToProps = dispatch => ({
  dispatch,
  authActions: bindActionCreators(authActionCreators, dispatch),
});

const mapStateToProps = state => ({
  nav: state.navigation,
});

export default connect(mapStateToProps, mapDispatchToProps)(class Container extends Component {
        state = {
          fontLoaded: false,
        };

        async componentWillMount() {
          try {
            this.props.authActions.getCurrentUser(); // !important to initialize app

            /* eslint-disable global-require */
            await Font.loadAsync({
              'proximanova-regular': require('../Assets/Fonts/ProximaNova-Regular.ttf'),
              'proximanova-bold': require('../Assets/Fonts/ProximaNova-Bold.ttf'),
              'Roboto_ medium': require('../Assets/Fonts/Roboto-Medium.ttf'),
            });
            /* eslint-enable global-require */

            this.setState({
              fontLoaded: true,
            });
          } catch (err) {
            Alert.alert('Error', err);
          }
        }

        render() {
          const { dispatch, nav } = this.props;
          const navigation = ReactNavigation.addNavigationHelpers({ dispatch, state: nav });

          if (this.state.fontLoaded) {
            return (
              <View style={{ flex: 1, backgroundColor: Colors.white }}>
                <Navigation navigation={navigation} />
              </View>
            );
          }

          return <AppLoading />;
        }
});

