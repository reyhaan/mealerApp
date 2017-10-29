import { TabNavigator } from 'react-navigation'
import OrdersTab from '../Containers/OrdersTab'
import SettingsTab from '../Containers/SettingsTab'
import CooksTab from '../Containers/CooksTab'

import styles from './Styles/NavigationStyles'

const tabNavigatorConfig = {
    swipeEnabled: false,
    tabBarPosition: 'bottom',
    headerMode: 'none',
    navigationOptions: {
        headerStyle: styles.header
    },
    tabBarOptions: {
        activeTintColor: 'red',  // Color of tab when pressed
        inactiveTintColor: '#b5b5b5', // Color of tab when not pressed
        showIcon: 'true', // Shows an icon for both iOS and Android
        // showLabel: (Platform.OS !== 'android'), //No label for Android
        labelStyle: {
        fontSize: 11,
        fontWeight: 'bold'
        },
        style: {
        backgroundColor: '#fff', // Makes Android tab bar white instead of standard blue
        // height: (Platform.OS === 'ios') ? 48 : 50 // I didn't use this in my app, so the numbers may be off. 
        }
    }
}

const tabsList = {
    One: {
        screen:  CooksTab,
        headerMode: 'none',
        navigationOptions: {
            title: 'Cooks',
            headerStyle: styles.header
        },
    },

    Two: {
        screen: OrdersTab,
        navigationOptions: {
            title: 'Orders',
        },
    },

    Three: {
        screen: SettingsTab,
        navigationOptions: {
            title: 'Settings',
        },
    }
}

const TabsView = TabNavigator(tabsList, tabNavigatorConfig)

export default TabsView