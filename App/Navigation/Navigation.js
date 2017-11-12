import {StackNavigator} from 'react-navigation'
import InfoTab from '../Containers/InfoTab'
import {SignUpScreen, LoginScreen} from '../Containers'
import TabsView from './NavigationTab'
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
export default StackNavigator({
    InfoTab: { screen: InfoTab },
    LoginScreen: {
        screen: LoginScreen
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
