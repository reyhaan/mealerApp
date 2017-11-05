import React from 'react'
import {Image, Platform, StatusBar} from 'react-native'
import {TabNavigator, StackNavigator} from 'react-navigation'
import {Colors, Images} from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './Styles/NavigationStyles'

import {
    CooksTab,
    OrdersTab,
    SettingsTab,
    UserInfoChangeScreen
} from '../Containers'

const tabNavigatorConfig = {
    swipeEnabled: false,
    animationEnabled: false,
    tabBarPosition: 'bottom',
    navigationOptions: {
        headerMode: 'none',
        headerStyle: styles.header
    },
    initialRouteName: 'One',
    tabBarOptions: {
        activeTintColor: Colors.snow,
        inactiveTintColor: Colors.pinkLight1,
        showIcon: true,
        showLabel: false,
        labelStyle: {
            fontSize: 11,
            fontWeight: 'bold',
            marginTop: (Platform.OS === 'ios') ? -2 : 2,
            paddingBottom: (Platform.OS === 'ios') ? 6 : 0
        },
        style: {
            backgroundColor: Colors.backgroundDarker,
            height: (Platform.OS === 'ios') ? 48 : 48
        },
        tabStyle: {
            borderColor: Colors.backgroundDarker
        },
        indicatorStyle: styles.indicator,
    }
};

const tabsList = {
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

const TabsView = TabNavigator(tabsList, tabNavigatorConfig);
const RootStack = StackNavigator({
    Root: {
        screen: TabsView,
        navigationOptions: ({navigation}) => ({
            // TODO: grab this string from state object which tracks the currently active tab
            title: 'Available Cooks',
            headerTitleStyle: { alignSelf: 'center' },
            header: null
        })
    },
    UserInfoChangeScreen: {
        screen: UserInfoChangeScreen,
        navigationOptions: ({navigation}) => ({
            title: `${navigation.state.params.page}`,
        }),
    },
}, {
    navigationOptions: ({navigation}) => ({
        // title: `${navigation.state.params}`,
        headerStyle: {
            backgroundColor: Colors.background
        },
        headerBackTitle: null,
        headerBackTitleStyle: {
            color: Colors.snow
        },
        headerTintColor: Colors.snow,
    }),
    cardStyle: {
        backgroundColor: Colors.background,
        // paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
    }
});

export default RootStack