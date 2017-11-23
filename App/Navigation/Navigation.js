import {StackNavigator} from 'react-navigation'
import MerchantTab from './Tabs/MerchantTab'
import CustomerTab from './Tabs/CustomerTab'
import {
    LoginScreen,
    SignUpScreen,
    EditMenuScreen
} from '../Containers'


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
    },
    EditMenuScreen: {
        screen: EditMenuScreen
    }
}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LoginScreen',
});
