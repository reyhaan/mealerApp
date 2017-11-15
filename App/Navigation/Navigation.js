import {Colors} from '../Themes'
import {TabNavigator, StackNavigator} from 'react-navigation'
import authenticationService from '../Services/authentication-service'
import CustomerTab from './CustomerTabConfig'
import MerchantTab from './MerchantTabConfig'
import styles from './Styles/NavigationStyles'
import {Platform} from 'react-native'
import {
    LoginScreen,
    SignUpScreen,
    UserInfoChangeScreen,
    CreateMenuItemScreen
} from '../Containers'

const tabNavigatorConfig = {
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


/******************************* Determine what type of tab to show *************************************/
let activeTab = TabNavigator(MerchantTab, tabNavigatorConfig);

authenticationService.currentUser().then(user => {
    if (user && user.type) {
        // user.type = "merchant";
        user.type = "customer";
        console.log(user);
        activeTab = user.type === "merchant" ? MerchantTab : CustomerTab;
    }
});
/******************************* ************************************* *************************************/

const TabsScreen = StackNavigator({
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
    }, {
        navigationOptions: ({navigation}) => ({
            header: null,
        }),
        cardStyle: {
            backgroundColor: Colors.background
        }
    }
);

// Manifest of possible screens
export default StackNavigator({
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
});
