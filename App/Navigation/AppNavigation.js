import { StackNavigator, TabNavigator } from 'react-navigation'
import OrdersTab from '../Containers/OrdersTab'
import SettingsTab from '../Containers/SettingsTab'
import CooksTab from '../Containers/CooksTab'
import { AuthScreen, SignUpScreen } from '../Containers'

import styles from './Styles/NavigationStyles'

const tabNavigatorConfig = {
  swipeEnabled: false,
  tabBarPosition: 'bottom',
  headerMode: 'none',
  navigationOptions: {
    headerStyle: styles.header
  }
}

const tabsList = {
  One: {
      screen:  CooksTab,
      headerMode: 'none',
      navigationOptions: {
          title: 'Cooks',
          headerStyle: styles.header
      },
  },

  Two: {
      screen: OrdersTab,
      navigationOptions: {
          title: 'Orders',
      },
  },

  Three: {
      screen: SettingsTab,
      navigationOptions: {
          title: 'Settings',
      },
  }
}

const TabsView = TabNavigator(tabsList, tabNavigatorConfig)

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
