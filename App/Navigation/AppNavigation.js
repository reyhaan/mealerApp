import {StackNavigator, TabNavigator} from 'react-navigation'
import InfoTab from '../Containers/InfoTab'
import {SignUpScreen, LoginScreen} from '../Containers'
import TabsView from './AppNavigationTab'
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  InfoTab: { screen: InfoTab },
    LoginScreen: {
        screen: TabsView
    },
    SignUpScreen: {
        screen: SignUpScreen
    },
    TabsView: {
        screen: TabsView
    }
}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'TabsView',
    navigationOptions: {
        headerStyle: styles.header
    }
});

export default PrimaryNav
