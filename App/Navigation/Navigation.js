import {Colors} from '../Themes'
import {StackNavigator} from 'react-navigation'
import styles from './Styles/NavigationStyles'
import {Platform} from 'react-native'
import MerchantTab from './Tabs/MerchantTab'
import CustomerTab from './Tabs/CustomerTab'
import {
    LoginScreen,
    SignUpScreen,
} from '../Containers'

export const tabNavigatorConfig = {
    swipeEnabled: false,
    animationEnabled: false,
    tabBarPosition: 'bottom',
    navigationOptions: {
        headerMode: 'none',
        headerStyle: styles.header
    },
    initialRouteName: 'Two',
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


// Manifest of possible screens
export default StackNavigator({
    LoginScreen: {
        screen: LoginScreen
    },
    SignUpScreen: {
        screen: SignUpScreen
    },
    MerchantTab: {
        screen: MerchantTab
    },
    CustomerTab: {
        screen: CustomerTab
    }
}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LoginScreen',
});
