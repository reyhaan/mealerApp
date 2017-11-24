import styles from '../Navigation.style'
import {Colors} from '../../Themes'

import { Platform } from 'react-native'

export default {
    swipeEnabled: false,
    animationEnabled: false,
    tabBarPosition: 'bottom',
    navigationOptions: {
        headerMode: 'none',
        headerStyle: styles.header
    },
    initialRouteName: 'One',
    tabBarOptions: {
        activeTintColor: (Platform.OS === 'ios') ? Colors.backgroundLighter : Colors.background,
        inactiveTintColor: (Platform.OS === 'ios') ? Colors.lightGray : Colors.gray,
        showIcon: true,
        showLabel: false,
        labelStyle: {
            fontSize: 10,
            fontWeight: 'bold',
            marginTop: (Platform.OS === 'ios') ? -2 : 2,
            paddingBottom: (Platform.OS === 'ios') ? 6 : 0
        },
        style: {
            backgroundColor: Colors.snow,
            height: (Platform.OS === 'ios') ? 48 : 48,
            shadowColor: '#000',
            shadowOpacity: 0.4,
            shadowRadius: 3,
            shadowOffset: {
              height: 3,
            },
            zIndex: 1,
            elevation: 3,
            paddingBottom: 2,
            borderColor: (Platform.OS === 'ios') ? Colors.clear : Colors.lightGray,
            borderTopWidth: (Platform.OS === 'ios') ? 0 : 1
        },
        tabStyle: {
            borderColor: Colors.snow
        },
        indicatorStyle: styles.indicator,
    }
};