import {StyleSheet} from 'react-native'
import {Colors, Metrics, ApplicationStyles} from '../../Themes/index'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        paddingBottom: Metrics.baseMargin,
        backgroundColor: Colors.snow
    },
    logo: {
        marginTop: Metrics.doubleSection,
        height: 90,
        width: 90,
        resizeMode: 'contain'
    },
    mealerLogo: {
        height: 50,
        resizeMode: 'contain',
        tintColor: Colors.background
    },
    centered: {
        alignItems: 'center'
    },
    section: {
        margin: 20,
        paddingRight: 20
    },
    mainLoginView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signUpView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5
    },
    registerButton: {
        margin: 15,
        color: Colors.charcoal,
        marginRight: 3
    },
    loginButton: {
        margin: 15,
        marginRight: 3
    },
    signUpButton: {
        fontSize: 12,
        color: Colors.background,
        paddingTop: 2,
        paddingLeft: 6,
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 2,
        borderColor: Colors.white,
        fontWeight: 'bold',
    },
    forgotPasswordView: {
        marginBottom: 30,
        marginTop: 10,
        flex: 1,
    },
    checkBoxTextStyle: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12
    },
    checkBoxContainerStyle: {
        height: 20,
        backgroundColor: Colors.background,
        borderWidth: 0
    },
    forgotPasswordTextStyle: {
      color: 'red',
      fontSize: 14,
      textDecorationLine: 'underline'
    }
})