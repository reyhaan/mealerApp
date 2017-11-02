import { StackNavigator, TabNavigator } from 'react-navigation'
import { SignUpScreen, LoginScreen } from '../Containers'
import TabsView from './AppTabNavigation'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  LoginScreen: {
    screen: LoginScreen
  },
  SignUpScreen: {
    screen: SignUpScreen,
    navigationOptions: {
      headerTitle: 'Sign Up',
    },
  },
  TabsView: {
    screen: TabsView
  }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'SignUpScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
});

export default PrimaryNav
