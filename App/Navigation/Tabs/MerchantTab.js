import React from 'react'
import {Image} from 'react-native'
import styles from '../Navigation.style'
import {Images} from '../../Themes/index'
import {TabNavigator, StackNavigator} from 'react-navigation'
import tabNavigatorConfig from './TabConfig'
import {
    CooksOrders,
    Settings,
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
        screen: CooksOrders,
        navigationOptions: {
            gesturesEnabled: false,
            tabBarLabel: 'Orders',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={Images.ordersWhite}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        },
    },

    Three: {
        screen: Settings,
        navigationOptions: {
            gesturesEnabled: false,
            tabBarLabel: 'Settings',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={Images.settingsWhite}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
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