import {StyleSheet, Platform} from 'react-native'
import {Colors, Metrics, ApplicationStyles} from '../../Themes/index'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    headerOuterContainer: {
        width: Metrics.screenWidth,
        backgroundColor: Colors.background,
        padding: 15,
        height: 75,
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
    }
})