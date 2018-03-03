import React from 'react';
import { StackNavigator } from 'react-navigation';
import { View } from 'react-native';
import { Colors } from '../Themes/index';
import VendorTab from './Tabs/VendorTab';
import CustomerTab from './Tabs/CustomerTab';
import Screens from '../Screens';

const {
  Login,
  SignUp,
} = Screens;

const Main = () => (
  <View style={{ flex: 1, backgroundColor: Colors.white }}/>
);

// Manifest of possible screens
export default StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
  VendorTab: {
    screen: VendorTab,
  },
  CustomerTab: {
    screen: CustomerTab,
  },
  Main: {
    screen: Main,
  },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Main',
  navigationOptions: () => ({
    header: null,
  }),
});
