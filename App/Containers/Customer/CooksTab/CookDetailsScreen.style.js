import {StyleSheet} from 'react-native'
import {Colors, Metrics, Fonts} from '../../../Themes/index'

export default StyleSheet.create({
    menuScreenContainer: {
        flex: 1,
    },
    headerOuterContainer: {
        width: Metrics.screenWidth,
        backgroundColor: Colors.background,
        borderBottomColor: Colors.backgroundLighter,
        borderBottomWidth: 1,
        padding: 15,
        height: 75,
    },
    itemContainer: {
        height: 120,
        marginTop: 1,
        marginBottom: 0,
        marginLeft: 4,
        marginRight: 4,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 1,
        borderColor: Colors.lightGray,
    },
    itemName: {
        marginTop: 12,
        fontWeight: 'bold',
        marginLeft: 10,
        fontSize: 16
    },
    itemDetails: {
        fontSize:14,
        marginTop:5,
        marginLeft: 10,
    },
    itemCost: {
        marginTop:10,
        marginLeft: 10,
        fontWeight: 'bold', 
        fontSize: 14
    },

    // FULL MODE STYLES

    fullModeItemContainer: {
        height: 200,
        marginTop: 0,
        marginBottom: 10,
        marginLeft: 5,
        marginRight: 5,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        backgroundColor: Colors.orange
    },
    fullModeItemName: {
        marginTop:5,
        fontWeight:'bold',
        marginLeft: 10,
        color: Colors.charcoal,
        fontSize: 16
    },
    fullModeItemDetails: {
        fontWeight:"200",
        fontSize:13,
        marginTop:5,
        marginLeft: 4,
    },
    fullModeItemCost: {
        marginTop:5,
        marginRight: 10,
        textAlign: 'right',
        fontSize: 14,
        fontWeight: 'bold'
    },
})