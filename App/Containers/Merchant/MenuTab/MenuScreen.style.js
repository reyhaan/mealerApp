import {StyleSheet} from 'react-native'
import {Colors, Metrics, Fonts} from '../../../Themes/index'

export default StyleSheet.create({
    menuScreenContainer: {
        flex: 1,
    },
    headerOuterContainer: {
        width: Metrics.screenWidth,
        backgroundColor: Colors.background,
        borderBottomColor: Colors.pink2,
        borderBottomWidth: 1,
        padding: 15,
        height: 75,
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
    },
})