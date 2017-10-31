import { StackNavigator, TabNavigator } from 'react-navigation'
import { AuthScreen, SignUpScreen } from '../Containers'
import TabsView from './AppTabNavigation'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  AuthScreen: {
    screen: TabsView
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
  initialRouteName: 'AuthScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
