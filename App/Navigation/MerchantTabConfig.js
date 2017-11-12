import React from 'react'
import {Image} from 'react-native'
import styles from './Styles/NavigationStyles'
import {Images} from '../Themes'
import {
    OrdersTab,
    SettingsTab,
    InfoTab,
    MenuTab,
} from '../Containers'

const  merchantTabsList = {
    One: {
        screen: MenuTab,
        navigationOptions: {
            // tabBarLabel: 'COOKS',
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
        screen: InfoTab,
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
export default merchantTabsList;