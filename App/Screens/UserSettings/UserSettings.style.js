import {StyleSheet, Platform} from 'react-native'
import {Colors, Metrics, ApplicationStyles} from '../../Themes/index'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
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
    inputContainer: {
        paddingLeft: 10,
        marginTop: Metrics.baseMargin,
        backgroundColor: Colors.snow,
        borderRadius: 3,
        maxHeight: Platform.OS === 'ios' ? 38 : 45,
        alignItems: 'center'
    },
    inputField: {
        height: 40,
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 2,
        padding: 5,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        borderColor: 'white'
    },
    formLabel: {
        color: Colors.snow,
        marginLeft: Platform.OS === 'ios' ? 20 : 15
    },
    formContainer: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    formItemContainer: {
        marginTop: 15
    }
})