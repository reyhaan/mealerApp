import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TabNavigator, StackNavigator } from 'react-navigation';
import tabNavigatorConfig from './TabConfig';
import CartTabBadgeIcon from '../../Components/CartTabBadgeIcon';
import styles from '../Navigation.style';
import { Screens } from '../../Screens';

const {
  Vendors,
  Cart,
  Account,
  UserAccount,
  InfoTab,
  Vendor,
  OrderHistory,
} = Screens;

const Root = TabNavigator(
  {
    One: {
      screen: StackNavigator({
        Vendors: {
          screen: Vendors,
        },
        Vendor: {
          screen: Vendor,
        },
      }, {
        headerMode: 'none',
        initialRouteName: 'Vendors',
        navigationOptions: () => ({
          header: null,
        }),
      }),
      navigationOptions: {
        gesturesEnabled: false,
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="cutlery"
            size={20}
            color={tintColor}
          />
        ),
        headerStyle: styles.header,
        title: 'Vendors',
      },
    },
    Two: {
      screen: Cart,
      navigationOptions: () => ({
        gesturesEnabled: false,
        tabBarIcon: ({ tintColor }) => (
          <CartTabBadgeIcon tintColor={tintColor}/>
        ),
        title: 'Cart',
      }),
    },
    Three: {
      screen: StackNavigator({
        Account: {
          screen: Account,
        },
        UserAccount: {
          screen: UserAccount,
        },
        OrderHistory: {
          screen: OrderHistory,
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
        tabBarIcon: ({ tintColor }) => (
          <Icon
            name="info"
            size={20}
            color={tintColor}
          />
        ),
        title: 'Info',
      },
    },
  },
  tabNavigatorConfig,
);

export default StackNavigator({
  Root: {
    screen: Root,
    navigationOptions: () => ({
      header: null,
    }),
  },
});
