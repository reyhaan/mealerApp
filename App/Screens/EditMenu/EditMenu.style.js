import {StyleSheet, Platform} from 'react-native'
import {Colors, Metrics, ApplicationStyles} from '../../Themes/index'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    headerOuterContainer: {
        width: Metrics.screenWidth,
        backgroundColor: Colors.background,
        borderBottomColor: Colors.pink2,
        borderBottomWidth: 1,
        padding: 15,
        height: 75,
    },
    inputContainer: {
        // paddingLeft: 10,
        marginTop: Metrics.baseMargin,
        backgroundColor: Colors.snow,
        borderRadius: 3,
        maxHeight: Platform.OS === 'ios' ? 38 : 45,
        alignItems: 'center'
    },
    formContainer: {
        marginLeft: 5,
        marginRight: 5
    },
    formLabel: {
        marginLeft: -1,
        marginBottom: 4
    },
    formInput: {
        height:40,
        borderWidth: 1,
        borderRadius: 5,
        padding:5
    },
    formInputExtendedHeight: {
        borderWidth: 1,
        fontSize: 16,
        backgroundColor: 'white',
        borderRadius: 5,
        padding:5
    },
})
