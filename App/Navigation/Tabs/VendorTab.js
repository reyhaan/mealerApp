import React from 'react'
import styles from '../Navigation.style'
import {TabNavigator, StackNavigator} from 'react-navigation'
import tabNavigatorConfig from './TabConfig'
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    VendorOrders,
    Account,
    InfoTab,
    Menus,
    MenuForm
} from '../../Containers/index'

export default StackNavigator({
    Root: {
        screen: TabNavigator({
            One: {
                screen: StackNavigator({
                    Menus: {
                        screen: Menus
                    },
                    MenuForm: {
                        screen: MenuForm
                    }
                }, {
                    headerMode: 'none',
                    initialRouteName: 'Menus',
                    navigationOptions: ({navigation}) => ({
                        header: null,
                    })
                }),
                navigationOptions: {
                    gesturesEnabled: false,
                    tabBarLabel: 'Menu',
                    tabBarIcon: ({tintColor}) => (
                        <Icon name="list" size={20} color={tintColor} />
                    ),
                    headerStyle: styles.header
                },
            },

            Two: {
                screen: VendorOrders,
                navigationOptions: {
                    gesturesEnabled: false,
                    tabBarLabel: 'Orders',
                    tabBarIcon: ({tintColor}) => (
                        <Icon name="shopping-cart" size={20} color={tintColor} />
                    ),
                },
            },

            Three: {
                screen: Account,
                navigationOptions: {
                    gesturesEnabled: false,
                    tabBarLabel: 'Account',
                    tabBarIcon: ({tintColor}) => (
                        <Icon name="user-circle" size={20} color={tintColor} />
                    ),
                },
            },

            Four: {
                screen: InfoTab,
                navigationOptions: {
                    gesturesEnabled: false,
                    tabBarLabel: 'About',
                    tabBarIcon: ({tintColor}) => (
                        <Icon name="info" size={20} color={tintColor} />
                    ),
                },
            }
        }, tabNavigatorConfig),
        navigationOptions: ({navigation}) => ({
            header: null
        })
    }
});