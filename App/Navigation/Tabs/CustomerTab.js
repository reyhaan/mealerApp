import React from 'react';
import IconBadge from 'react-native-icon-badge';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { View, Text } from 'react-native';
import tabNavigatorConfig from './TabConfig';
import styles from '../Navigation.style';
import { store } from '../../../App';
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

let totalItemCount = 0;

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
      navigationOptions: () => {
        store.subscribe(() => {
          const appState = store.getState();
          const cart = appState.cart && appState.cart.cart;
          totalItemCount = cart && cart.totalItemCount ? cart.totalItemCount : totalItemCount;
        });
        return {
          gesturesEnabled: false,
          tabBarIcon: ({ tintColor }) => (
            <IconBadge
              MainElement={
                <View style={{
                  position: 'relative',
                  width: 50,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                >
                  <Icon
                    name="shopping-cart"
                    size={20}
                    color={tintColor}
                  />
                </View>}
              BadgeElement={
                <Text style={{
                  color: '#FFFFFF',
                  fontSize: 8,
                }}
                > {totalItemCount}
                </Text>}
              IconBadge={{
                position: 'absolute',
                width: 50,
                height: 50,
                borderRadius: 20,
                backgroundColor: '#FF0000',
              }}
              IconBadgeStyle={{
                top: 7,
                right: 0,
                marginTop: 5.5,
              }}
              Hidden={false}
            />
          ),
          title: 'Cart',
        };
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
