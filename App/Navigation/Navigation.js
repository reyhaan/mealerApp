import {StackNavigator} from 'react-navigation'
import MerchantTab from './Tabs/MerchantTab'
import CustomerTab from './Tabs/CustomerTab'
import {
    Login,
    SignUp,
    MenuForm,
    UserSettings,
} from '../Screens'

// Manifest of possible screens
export default StackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            gesturesEnabled: false
        }
    },
    SignUp: {
        screen: SignUp,
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
    UserSettings: {
        screen: UserSettings
    },
    MenuForm: {
        screen: MenuForm
    }
}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'Login',
    navigationOptions: ({navigation}) => ({
        header: null,
    })
});
