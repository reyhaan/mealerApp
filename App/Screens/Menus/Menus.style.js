import { StyleSheet, Platform } from 'react-native'
import {Colors, Metrics, Fonts} from '../../Themes/index'

export default StyleSheet.create({
    menuScreenContainer: {
        flex: 1,
    },
    headerOuterContainer: {
        width: Metrics.screenWidth,
        backgroundColor: Colors.snow,
        padding: 15,
        height: 75,
        shadowColor: (Platform.OS === 'ios') ? Colors.charcoal : Colors.snow,
        shadowOpacity: (Platform.OS === 'ios') ? 0.2 : 0.4,
        shadowRadius: (Platform.OS === 'ios') ? 2 : 3,
        shadowOffset: {
            height: (Platform.OS === 'ios') ? 0 : 0,
        },
        elevation: 4,
        zIndex: 10
    },
    itemContainer: {
        height: 120,
        marginTop: 1,
        marginBottom: 2,
        marginLeft: 4,
        marginRight: 4,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 0.7,
        borderColor: '#d6d7da',
    },
    itemName: {
        marginTop:5,
        fontWeight:"600",
        marginLeft: 4,
    },
    itemDetails: {
        fontWeight:"200",
        fontSize:13,
        marginTop:5,
        marginLeft: 4,
    },
    itemCost: {
        marginTop:5,
        marginLeft: 4,
        color: Colors.background
    },
})