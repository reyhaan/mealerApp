import {StyleSheet} from 'react-native'
import {Colors, Metrics, ApplicationStyles} from '../../Themes/'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    container: {
        paddingBottom: Metrics.baseMargin,
        backgroundColor: Colors.background
    },
    logo: {
        marginTop: Metrics.doubleSection,
        height: 90,
        width: 90,
        resizeMode: 'contain'
    },
    mealerLogo: {
        height: 50,
        resizeMode: 'contain'
    },
    centered: {
        alignItems: 'center'
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
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
        marginRight: 3
    },
    loginButtonView: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    spinnerContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1
    },
    spinner: {
        backgroundColor: 'pink',
        padding: 10,
        borderRadius: 5
    },
    signUpButton: {
        fontSize: 12,
        color: 'white',
        paddingTop: 5,
        paddingLeft: 5,
        backgroundColor: 'rgba(51, 29, 107,0.4)',
        borderStyle: 'solid',
        borderWidth: 3,
        borderRadius: 5,
        borderColor: 'rgba(51, 29, 107,0.2)',
        fontWeight: 'bold'
    },
    forgotPasswordView: {
        marginBottom: 10,
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
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
        color: 'white',
        fontWeight: 'bold',
        fontSize: 12
    }
})