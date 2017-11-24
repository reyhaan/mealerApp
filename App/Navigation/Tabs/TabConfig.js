import styles from '../Navigation.style'
import {Colors} from '../../Themes'

import {Platform} from 'react-native'

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
        activeTintColor: Colors.snow,
        inactiveTintColor: Colors.pinkLight1,
        showIcon: true,
        showLabel: true,
        labelStyle: {
            fontSize: 10,
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