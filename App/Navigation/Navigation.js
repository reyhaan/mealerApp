import {StackNavigator} from 'react-navigation'
import VendorTab from './Tabs/VendorTab'
import CustomerTab from './Tabs/CustomerTab'
import {
    Login,
    SignUp,
    MenuForm,
    UserSettings,
    Cart,
    Main
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
    VendorTab: {
        screen: VendorTab
    },
    CustomerTab: {
        screen: CustomerTab
    },
    UserSettings: {
        screen: UserSettings
    },
    MenuForm: {
        screen: MenuForm
    },
    Main: {
        screen: Main
    },
    Cart: {
        screen: Cart
    }
}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'Main',
    navigationOptions: ({navigation}) => ({
        header: null,
    })
});
