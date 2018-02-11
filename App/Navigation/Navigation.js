import {StackNavigator} from 'react-navigation'
import VendorTab from './Tabs/VendorTab'
import CustomerTab from './Tabs/CustomerTab'
import {Screens} from '../Screens';

const {
    Login,
    SignUp,
    Main
} = Screens;

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
    Main: {
        screen: Main
    },
}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'Main',
    navigationOptions: ({navigation}) => ({
        header: null,
    })
});
