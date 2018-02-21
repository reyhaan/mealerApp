import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../Navigation.style';
import tabNavigatorConfig from './TabConfig';
import { Screens } from '../../Screens';

const {
  VendorOrders,
  Account,
  InfoTab,
  Menus,
  UserAccount,
  MenuForm,
} = Screens;

const Root = TabNavigator({
  One: {
    screen: StackNavigator({
      Menus: {
        screen: Menus,
      },
      MenuForm: {
        screen: MenuForm,
      },
    }, {
      headerMode: 'none',
      initialRouteName: 'Menus',
      navigationOptions: () => ({
        header: null,
      }),
    }),
    navigationOptions: {
      gesturesEnabled: false,
      tabBarLabel: 'Menu',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="list" size={20} color={tintColor} />
      ),
      headerStyle: styles.header,
    },
  },

  Two: {
    screen: VendorOrders,
    navigationOptions: {
      gesturesEnabled: false,
      tabBarLabel: 'Orders',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="shopping-cart" size={20} color={tintColor} />
      ),
    },
  },

  Three: {
    screen: StackNavigator({
      Account: {
        screen: Account,
      },
      UserAccount: {
        screen: UserAccount,
      },
    }, {
      headerMode: 'none',
      initialRouteName: 'Account',
      navigationOptions: () => ({
        header: null,
      }),
    }),
    navigationOptions: {
      gesturesEnabled: false,
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="user-circle"
          size={20}
          color={tintColor}
        />
      ),
      title: 'Account',
    },
  },

  Four: {
    screen: InfoTab,
    navigationOptions: {
      gesturesEnabled: false,
      tabBarLabel: 'About',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="info" size={20} color={tintColor} />
      ),
    },
  },
}, tabNavigatorConfig);

export default StackNavigator({
  Root: {
    screen: Root,
    navigationOptions: () => ({
      header: null,
    }),
  },
});
