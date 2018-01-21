import React from 'react'
import {Colors} from '../../Themes/index'
import {Image, Text} from 'react-native'
import styles from '../Navigation.style'
import {Images} from '../../Themes/index'
import {TabNavigator, StackNavigator} from 'react-navigation'
import tabNavigatorConfig from './TabConfig'
import IconBadge from 'react-native-icon-badge';
import cartService from '../../Services/cart-service'
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    Vendors,
    Cart,
    Account,
    InfoTab,
    VendorDetails,
    CustomerOrderHistory
} from '../../Screens/index';

// let totaltemsInCart = 0;
//
// cartService.totalItems().then((total) => {
//     totaltemsInCart = total
// });

const chefsStack = StackNavigator({
    Root: {
        screen: Vendors
    },
    VendorDetails: {
        screen: VendorDetails
    }
}, {
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
                <Icon name="cutlery" size={20} color={tintColor} />
            ),
            headerStyle: styles.header,
            title: 'Vendors'
        },
    },

    Two: {
        screen: Cart,
        navigationOptions: {
            gesturesEnabled: false,
            tabBarIcon: ({tintColor}) => (
                <Icon name="shopping-cart" size={20} color={tintColor} />
            ),
            // tabBarIcon: ({tintColor}) => (
            //     <IconBadge
            //         MainElement={<Image
            //             source={Images.ordersWhite}
            //             style={[styles.icon, {tintColor: tintColor}]}
            //         />}
            //         IconBadgeStyle={
            //             {
            //                 backgroundColor: Colors.background
            //             }
            //         }
            //         BadgeElement={<Text style={{ color: 'white' }}>{totaltemsInCart}</Text>}
            //         Hidden={totaltemsInCart === 0}
            //     />
            // ),
            title: 'Cart'
        },
    },

    Three: {
        screen: Account,
        navigationOptions: {
            gesturesEnabled: false,
            tabBarIcon: ({tintColor}) => (
                <Icon name="user-circle" size={20} color={tintColor} />
            ),
            title: 'Account'
        },
    },

    Four: {
        screen: InfoTab,
        navigationOptions: {
            gesturesEnabled: false,
            tabBarIcon: ({tintColor}) => (
                <Icon name="info" size={20} color={tintColor} />
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
        VendorDetails: {
            screen: VendorDetails
        },
        CustomerOrderHistory: {
            screen: CustomerOrderHistory
        }
    }, {
        headerMode: 'none',
        initialRouteName: 'Root',
        navigationOptions: ({navigation}) => ({
            header: null,
        })
    }
);