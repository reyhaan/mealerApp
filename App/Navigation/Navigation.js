import styles from './Styles/NavigationStyles'
import {Platform, AsyncStorage, StatusBar} from 'react-native'
import {Colors} from '../Themes'
import {TabNavigator, StackNavigator} from 'react-navigation'
import CustomerTab from './CustomerTab'
import MerchanTab from './MerchanTab'
import {
    LoginScreen,
    SignUpScreen,
    UserInfoChangeScreen,
    InfoTab,
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
    initialRouteName: 'One',
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

const activeTab = TabNavigator(CustomerTab, tabNavigatorConfig);

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
    InfoTab: { screen: InfoTab },
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
