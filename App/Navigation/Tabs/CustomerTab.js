import React from 'react'
import styles from '../Navigation.style'
import {TabNavigator, StackNavigator} from 'react-navigation'
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

                    return {
                        gesturesEnabled: false,
                        tabBarIcon: ({tintColor}) => (
                            <Icon name="shopping-cart" size={20} color={tintColor}/>
                        ),
                        title: 'Cart'
                    }
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