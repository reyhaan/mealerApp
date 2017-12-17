import {StyleSheet, Platform} from 'react-native'
import {Colors, Metrics, Fonts} from '../../Themes/index'

export default StyleSheet.create({
    menuScreenContainer: {
        flex: 1,
    },
    headerOuterContainer: {
        width: Metrics.screenWidth,
        backgroundColor: Colors.clear,
        borderBottomWidth: 0,
        padding: 15,
        height: 75,
    },
    itemContainer: {
        height: 115,
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
        fontSize: 16,
        color: Colors.background
    },
    itemDetails: {
        fontSize:14,
        marginTop:5,
        marginLeft: 10,
        color: Colors.gray
    },
    itemCost: {
        marginTop:10,
        marginLeft: 10,
        fontWeight: 'bold', 
        fontSize: 14
    },

    // FULL MODE STYLES

    fullModeItemContainer: {
        height: 265,
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: Colors.snow,
        borderRadius: 3,
        shadowColor: '#000',
        shadowOpacity: (Platform.OS === 'ios') ? 0.2 : 0.4,
        shadowRadius: (Platform.OS === 'ios') ? 2 : 3,
        shadowOffset: {
          height: (Platform.OS === 'ios') ? 2 : 3,
        },
        elevation: 1
    },
    fullModeItemImage: {
        height: 200, 
        width: Metrics.screenWidth - 20, 
        resizeMode: 'cover', 
        marginTop: 0, 
        borderRadius: 3,
        shadowColor: '#000',
        shadowOpacity: (Platform.OS === 'ios') ? 0.2 : 0.4,
        shadowRadius: (Platform.OS === 'ios') ? 2 : 3,
        shadowOffset: {
          height: (Platform.OS === 'ios') ? 2 : 3,
        },
        zIndex: 1
    },
    fullModeItemName: {
        marginTop: (Platform.OS === 'ios') ? 2 : 0,
        marginLeft: 20,
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.background
    },
    fullModeItemCost: {
        marginTop: (Platform.OS === 'ios') ? 2 : 0,
        marginRight: 20,
        textAlign: 'right',
        fontSize: 14,
        fontWeight: 'bold'
    },

    // MODAL style

    addItemModal: {
        flex: 1, 
        backgroundColor: Colors.snow, 
        borderRadius: 5,
        marginTop: (Platform.OS === 'ios') ? 10 : 0
    },
    modal_itemName: {
        marginTop: (Platform.OS === 'ios') ? 2 : 10,
        marginRight: 20,
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.background
    },
    modal_itemCost: {
        marginTop: (Platform.OS === 'ios') ? 2 : 0,
        marginRight: 20,
        marginTop: 5,
        textAlign: 'right',
        fontSize: 14,
        fontWeight: 'bold'
    },
    modal_itemDetails: {
        fontSize:14,
        marginTop:5,
        marginLeft: 10,
        color: Colors.gray
    },
    modal_itemImage: {
        height: 200, 
        width: Metrics.screenWidth - 30, 
        resizeMode: 'cover', 
        marginTop: 0, 
        borderRadius: 3,
        shadowColor: '#000',
        shadowOpacity: (Platform.OS === 'ios') ? 0.2 : 0.4,
        shadowRadius: (Platform.OS === 'ios') ? 2 : 3,
        shadowOffset: {
          height: (Platform.OS === 'ios') ? 2 : 3,
        }
    }
})