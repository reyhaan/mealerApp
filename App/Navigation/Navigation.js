import {StackNavigator} from 'react-navigation'
import VendorTab from './Tabs/VendorTab'
import CustomerTab from './Tabs/CustomerTab'
import {
    Login,
    SignUp,
    MenuForm,
    UserSettings,
    Cart,
    AppEntry
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
    AppEntry: {
        screen: AppEntry
    },
    Cart: {
        screen: Cart
    }
}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'AppEntry',
    navigationOptions: ({navigation}) => ({
        header: null,
    })
});
