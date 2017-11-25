import React from 'react'
import {Colors} from '../../Themes/index'
import {Image} from 'react-native'
import styles from '../Navigation.style'
import {Images} from '../../Themes/index'
import {TabNavigator, StackNavigator} from 'react-navigation'
import tabNavigatorConfig from './TabConfig'
import {
    CooksTab,
    OrdersTab,
    SettingsTab,
    InfoTab,
} from '../../Containers/index'

const customerTabsConfig = {
    One: {
        screen: CooksTab,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={Images.cooksWhite}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
            headerStyle: styles.header,
            title: 'Chef'
        },
    },

    Two: {
        screen: OrdersTab,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={Images.ordersWhite}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
            title: 'Orders'
        },
    },

    Three: {
        screen: SettingsTab,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={Images.settingsWhite}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
            title: 'Settings'
        },
    },

    Four: {
        screen: InfoTab,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={Images.infoIcon}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
            title: 'Info'
        },
    }
};

export default StackNavigator({
        Root: {
            screen: TabNavigator(customerTabsConfig, tabNavigatorConfig),
            navigationOptions: ({navigation}) => ({
                header: null
            })
        }
    }
);