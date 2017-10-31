import React from 'react'
import { Image, Platform } from 'react-native'
import { TabNavigator } from 'react-navigation'
import OrdersTab from '../Containers/ordersTab/OrdersTab'
import SettingsTab from '../Containers/settingsTab/SettingsTab'
import CooksTab from '../Containers/cooksTab/CooksTab'
import { Colors, Images } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './Styles/NavigationStyles'

const tabNavigatorConfig = {
    swipeEnabled: false,
    animationEnabled: false,
    tabBarPosition: 'bottom',
    headerMode: 'none',
    navigationOptions: {
        headerStyle: styles.header
    },
    tabBarOptions: {
        activeTintColor: Colors.snow,
        inactiveTintColor: Colors.pinkLight1,
        showIcon: true,
        labelStyle: {
            fontSize: 11,
            fontWeight: 'bold',
            marginTop: 2
        },
        style: {
            backgroundColor: Colors.backgroundDarker,
            height: (Platform.OS === 'ios') ? 48 : 60 
        },
        tabStyle: {
            borderColor: Colors.backgroundDarker
        },
        indicatorStyle: styles.indicator,
    }
}

const tabsList = {
    One: {
        screen:  CooksTab,
        headerMode: 'none',
        navigationOptions: {
            tabBarLabel: 'Cooks',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={ Images.cooksWhite }
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
            headerStyle: styles.header
        },
    },

    Two: {
        screen: OrdersTab,
        navigationOptions: {
            title: 'Orders',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={ Images.ordersWhite }
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        },
    },

    Three: {
        screen: SettingsTab,
        navigationOptions: {
            title: 'Settings',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={ Images.settingsWhite }
                    style={[styles.icon, {tintColor: tintColor}]}
                />
            ),
        },
    }
}

const TabsView = TabNavigator(tabsList, tabNavigatorConfig)

export default TabsView