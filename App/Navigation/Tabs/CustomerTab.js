import React from 'react'
import styles from '../Navigation.style'
import {TabNavigator, StackNavigator} from 'react-navigation'
import {View, Text} from 'react-native'
import tabNavigatorConfig from './TabConfig'
import Icon from 'react-native-vector-icons/FontAwesome';
import {appStore} from '../../../App'
import {
    Vendors,
    Cart,
    Account,
    UserAccount,
    InfoTab,
    VendorDetails,
    CustomerOrderHistory
} from '../../Screens/index';

let totaltemsInCart = 5;

export default StackNavigator({
    Root: {
        screen: TabNavigator({
            One: {
                screen: StackNavigator({
                    Vendors: {
                        screen: Vendors
                    },
                    VendorDetails: {
                        screen: VendorDetails
                    }
                }, {
                    headerMode: 'none',
                    initialRouteName: 'Vendors',
                    navigationOptions: ({navigation}) => ({
                        header: null,
                    })
                }),
                navigationOptions: {
                    gesturesEnabled: false,
                    tabBarIcon: ({tintColor}) => (
                        <Icon name="cutlery" size={20} color={tintColor}/>
                    ),
                    headerStyle: styles.header,
                    title: 'Vendors'
                },
            },

            Two: {
                screen: Cart,
                navigationOptions: () => {
                    let totalItemCount = 0;
                    appStore.subscribe( () => {
                        const state = appStore.getState();
                        const cart = state.cart;
                        totalItemCount  = cart && cart.totalItemCount ? cart.totalItemCount : totalItemCount;
                    });

    Two: {
        screen: Cart,
        navigationOptions: {
            gesturesEnabled: false,
            tabBarIcon: ({tintColor}) => (
              <IconBadge
                MainElement={ <View style={{position: 'relative', width:50, height:50,
                justifyContent: 'center', alignItems: 'center'}}>
                <Icon name="shopping-cart" size={20} color={tintColor} /></View>}
                BadgeElement={
                  <Text style={{color:'#FFFFFF', fontSize: 8}}>
                    {totaltemsInCart}
                  </Text>}
                IconBadge={{
                  position:'absolute',
                  width:50,
                  height:50,
                  borderRadius:20,
                  backgroundColor: '#FF0000'
                }}
                IconBadgeStyle={{top:7, right: 0, marginTop: 5.5}}
                Hidden={false}
              />
            ),
            title: 'Cart'
        },
    },

            Three: {
                screen: StackNavigator({
                    Account: {
                        screen: Account
                    },
                    UserAccount: {
                        screen: UserAccount
                    },
                    CustomerOrderHistory: {
                        screen: CustomerOrderHistory
                    }
                }, {
                    headerMode: 'none',
                    initialRouteName: 'Account',
                    navigationOptions: ({navigation}) => ({
                        header: null,
                    })
                }),
                navigationOptions: {
                    gesturesEnabled: false,
                    tabBarIcon: ({tintColor}) => (
                        <Icon name="user-circle" size={20} color={tintColor}/>
                    ),
                    title: 'Account'
                },
            },

            Four: {
                screen: InfoTab,
                navigationOptions: {
                    gesturesEnabled: false,
                    tabBarIcon: ({tintColor}) => (
                        <Icon name="info" size={20} color={tintColor}/>
                    ),
                    title: 'Info'
                },
            }
        }, tabNavigatorConfig),
        navigationOptions: ({navigation}) => ({
            header: null
        })
    }
});