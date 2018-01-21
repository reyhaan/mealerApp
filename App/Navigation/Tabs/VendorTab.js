import React from 'react'
import {Image} from 'react-native'
import styles from '../Navigation.style'
import {Images} from '../../Themes/index'
import {TabNavigator, StackNavigator} from 'react-navigation'
import tabNavigatorConfig from './TabConfig'
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    VendorOrders,
    Account,
    InfoTab,
    Menus
} from '../../Screens/index'

const merchantTabsConfig = {
    One: {
        screen: Menus,
        navigationOptions: {
            gesturesEnabled: false,
            tabBarLabel: 'Menu',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={Images.menuWhite}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
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
                <Image
                    source={Images.infoIcon}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        },
    }
};

export default StackNavigator({
    Root: {
        screen: TabNavigator(merchantTabsConfig, tabNavigatorConfig),
        navigationOptions: ({navigation}) => ({
            header: null
        })
    }
});