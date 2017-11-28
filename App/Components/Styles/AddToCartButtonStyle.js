import {StyleSheet, Platform} from 'react-native'
import {Colors, Metrics, Fonts} from '../../Themes'

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
        borderLeftColor: Colors.backgroundDarker,
        borderLeftWidth: 1,
        paddingTop: (Platform.OS === 'ios') ? 5 : 0
    },

    buttonTextWrapper: {
        height: 30, 
        alignSelf: 'stretch',
        borderLeftColor: Colors.backgroundDarker,
        borderLeftWidth: 1,
        paddingTop: (Platform.OS === 'ios') ? 5 : 0
    },

    buttonInnerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.charcoal
    }

})