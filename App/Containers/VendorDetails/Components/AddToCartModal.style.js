import {StyleSheet, Platform} from 'react-native'
import {Colors, Metrics, Fonts} from '../../../Themes/index'

export default StyleSheet.create({
    // MODAL style

    modalContainer: {
        height: 200
    },

    addItemModal: {
        flex: 1, 
        backgroundColor: Colors.snow, 
        borderRadius: 5,
        marginTop: (Platform.OS === 'ios') ? 10 : 0,
        height: 200
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