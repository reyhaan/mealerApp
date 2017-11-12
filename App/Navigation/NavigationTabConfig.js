import styles from './Styles/NavigationStyles'
import {Platform} from 'react-native'
import {Colors} from '../Themes'

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

export default tabNavigatorConfig;
