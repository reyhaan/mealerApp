import styles from './Styles/NavigationStyles'
import {Colors} from '../Themes'
import {TabNavigator, StackNavigator} from 'react-navigation'
import NavigationTabConfig from './NavigationTabConfig'
import authenticationService from '../Services/authentication-service'
import CustomerTab from './CustomerTabConfig'
import MerchantTab from './MerchantTabConfig'
import {
    LoginScreen,
    SignUpScreen,
    UserInfoChangeScreen,
    InfoTab,
    CreateMenuItemScreen
} from '../Containers'


// Determine what type of tab to show
let activeTab = TabNavigator(MerchantTab, NavigationTabConfig);
authenticationService.currentUser().then(user => {
    if (user && user.type){
        // user.type = "merchant";
        user.type = "customer";
        console.log(user);
        activeTab = user.type === "merchant" ? MerchantTab : CustomerTab;
    }
});

const TabsScreen = StackNavigator(
    {
        Root: {
            screen: activeTab,
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
            screen: CreateMenuItemScreen,
            navigationOptions: ({navigation}) => ({
                title: "CREATE"
            }),
        }
    },
    {
        navigationOptions: ({navigation}) => ({
            header: null,
            // title: `${navigation.state.params}`,
            // headerStyle: {
            //     backgroundColor: Colors.background
            // },
            // headerBackTitle: null,
            // headerBackTitleStyle: {
            //     color: Colors.snow
            // },
            // headerTintColor: Colors.snow,
        }),
        cardStyle: {
            backgroundColor: Colors.background,
            // paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight
        }
    });

// Manifest of possible screens
export default StackNavigator({
    InfoTab: {screen: InfoTab},
    LoginScreen: {
        screen: LoginScreen
    },
    SignUpScreen: {
        screen: SignUpScreen
    },
    TabsScreen: {
        screen: TabsScreen
    }
}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'TabsScreen',
    navigationOptions: {
        headerStyle: styles.header
    }
});
