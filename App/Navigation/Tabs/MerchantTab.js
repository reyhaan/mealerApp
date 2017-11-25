import React from 'react'
import {Image} from 'react-native'
import styles from '../Navigation.style'
import {Images} from '../../Themes/index'
import {TabNavigator, StackNavigator} from 'react-navigation'
import tabNavigatorConfig from './TabConfig'
import {
    OrdersTab,
    SettingsTab,
    InfoTab,
    MenuScreen
} from '../../Containers/index'

const merchantTabsConfig = {
    One: {
        screen: MenuScreen,
        navigationOptions: {
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
        screen: OrdersTab,
        navigationOptions: {
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
        screen: SettingsTab,
        navigationOptions: {
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