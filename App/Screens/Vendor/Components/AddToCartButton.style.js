import {StyleSheet, Platform} from 'react-native'
import {Colors} from '../../../Themes/index'

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: Colors.background,
        borderRadius: 3,
        height: 45,
        marginLeft: 15,
        marginRight: 15
    },

    minusItem: {
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    
    itemCount: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    
    addItem: {
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center'
    },
    
    addToCartButton: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },

    buttonText: {
        color: Colors.snow, 
        fontWeight: 'bold', 
        fontSize: 16, 
        height: 30, 
        textAlignVertical: 'center', 
        textAlign: 'center', 
        alignSelf: 'stretch',
        paddingTop: (Platform.OS === 'ios') ? 15 : 10,
        borderRadius: 5
    },

    buttonTextWrapper: {
        height: 45, 
        alignSelf: 'stretch',
        borderLeftColor: Colors.snow,
        borderLeftWidth: 1,
        paddingTop: (Platform.OS === 'ios') ? 0 : 0,
    },

    buttonInnerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.charcoal
    }

})