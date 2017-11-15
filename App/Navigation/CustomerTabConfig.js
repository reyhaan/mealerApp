import React from 'react'
import {Image} from 'react-native'
import styles from './Styles/NavigationStyles'
import {Images} from '../Themes'
import {
    CooksTab,
    OrdersTab,
    SettingsTab,
} from '../Containers'

const customerTabsList = {
    One: {
        screen: CooksTab,
        navigationOptions: {
            // tabBarLabel: 'COOKS',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={Images.cooksWhite}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
            headerStyle: styles.header
        },
    },

    Two: {
        screen: OrdersTab,
        navigationOptions: {
            // tabBarLabel: 'ORDERS',
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
            // tabBarLabel: 'SETTINGS',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={Images.settingsWhite}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        },
    },

    Four: {
        screen: OrdersTab,
        navigationOptions: {
            // tabBarLabel: 'SETTINGS',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={Images.infoIcon}
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        },
    }
};

export default customerTabsList;