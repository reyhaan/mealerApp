import React from 'react'
import { Colors } from '../../Themes/index'
import { Image, Text } from 'react-native'
import styles from '../Navigation.style'
import { Images } from '../../Themes/index'
import { TabNavigator, StackNavigator } from 'react-navigation'
import tabNavigatorConfig from './TabConfig'
import IconBadge from 'react-native-icon-badge';
import cartService from '../../Services/cart-service'
import {
    Cooks,
    MerchantOrders,
    Settings,
    InfoTab,
    CookDetailsScreen,
    CustomerOrders
} from '../../Screens/index'
import { CustomerCartScreen } from '../../Components/index';

let totaltemsInCart = 0;

cartService.totalItems().then((total) => {
    totaltemsInCart = total
});;

const chefsStack = StackNavigator({
    Root: {
        screen: Cooks
    },
    CookDetailsScreen: {
        screen: CookDetailsScreen
    }
},{
    headerMode: 'none',
    initialRouteName: 'Root',
    navigationOptions: ({navigation}) => ({
        header: null,
    })
});

const customerTabsConfig = {
    One: {
        screen: chefsStack,
        navigationOptions: {
            gesturesEnabled: false,
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
        screen: MerchantOrders,
        navigationOptions: {
            gesturesEnabled: false,
            tabBarIcon: ({tintColor}) => (
                <IconBadge
                    MainElement={<Image
                        source={Images.ordersWhite}
                        style={[styles.icon, {tintColor: tintColor}]}
                    />}
                    IconBadgeStyle={
                        {   
                            backgroundColor: Colors.background
                        }
                    }
                    BadgeElement={<Text style={{ color: 'white' }}>{totaltemsInCart}</Text>}
                    Hidden={totaltemsInCart === 0}
                />
            ),
            title: 'Cart'
        },
    },

    Three: {
        screen: Settings,
        navigationOptions: {
            gesturesEnabled: false,
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
            gesturesEnabled: false,
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
        },
        CookDetailsScreen: {
            screen: CookDetailsScreen
        },
        CustomerOrders: {
            screen: CustomerOrders
        }
    }, {
        headerMode: 'none',
        initialRouteName: 'Root',
        navigationOptions: ({navigation}) => ({
            header: null,
        })
    }
);