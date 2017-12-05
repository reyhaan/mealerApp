import {StackNavigator} from 'react-navigation'
import MerchantTab from './Tabs/MerchantTab'
import CustomerTab from './Tabs/CustomerTab'
import {
    LoginScreen,
    SignUpScreen,
    EditMenuScreen,
    UserInfoChangeScreen,
    CookDetailsScreen
} from '../Screens'

// Manifest of possible screens
export default StackNavigator({
    LoginScreen: {
        screen: LoginScreen,
        navigationOptions: {
            gesturesEnabled: false
        }
    },
    SignUpScreen: {
        screen: SignUpScreen,
        navigationOptions: {
            gesturesEnabled: false
        }
    },
    MerchantTab: {
        screen: MerchantTab
    },
    CustomerTab: {
        screen: CustomerTab
    },
    UserInfoChangeScreen: {
        screen: UserInfoChangeScreen
    },
    EditMenuScreen: {
        screen: EditMenuScreen
    },
    CookDetailsScreen: {
        screen: CookDetailsScreen
    }
}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LoginScreen',
    navigationOptions: ({navigation}) => ({
        header: null,
    })
});
