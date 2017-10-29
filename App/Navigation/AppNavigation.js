import { StackNavigator } from 'react-navigation'
import { AuthScreen, SignUpScreen } from '../Containers'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  AuthScreen: {
    screen: AuthScreen
  },
  SignUpScreen: {
    screen: SignUpScreen,
    navigationOptions: {
      headerTitle: 'Sign Up',
    },
  },
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'AuthScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
