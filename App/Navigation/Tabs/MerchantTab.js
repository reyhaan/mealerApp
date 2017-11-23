import React from 'react'
import {Colors} from '../../Themes/index'
import {Image} from 'react-native'
import styles from '../Styles/NavigationStyles'
import {Images} from '../../Themes/index'
import {TabNavigator, StackNavigator} from 'react-navigation'
import tabNavigatorConfig from './TabConfig'
import {
    OrdersTab,
    SettingsTab,
    InfoTab,
    MenuTab,
    UserInfoChangeScreen,
    EditMenuScreen
} from '../../Containers/index'

const merchantTabsConfig = {
    One: {
        screen: MenuTab,
        navigationOptions: {
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
        },
        UserInfoChangeScreen: {
            screen: UserInfoChangeScreen,
            navigationOptions: ({navigation}) => ({
                title: `${navigation.state.params.page}`,
            }),
        },
        CreateMenuItemScreen: {
            screen: EditMenuScreen,
            navigationOptions: ({navigation}) => ({
                title: "CREATE"
            }),
        }
    }, {
        navigationOptions: ({navigation}) => ({
            header: null,
        }),
        cardStyle: {
            backgroundColor: Colors.background
        }
    }
);