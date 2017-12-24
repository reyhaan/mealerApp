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
    facebookButton: {
        marginTop: Metrics.baseMargin,
        backgroundColor: Colors.facebook,
        borderRadius: 3
    },
    forgotPasswordView: {
        marginBottom: 30,
        marginTop: 10,
        flex: 1,
    },
    formContainer: {
        margin: 20,
        paddingRight: 20
    },
    signUpView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    signUpButton: {
        margin: 15,
        marginRight: 0,
        borderRadius: 3
    },
    inputField:{
        color:Colors.charcoal
    },
    userTypePickerBtn:{
        width:306,
        marginTop:10,
        backgroundColor:'transparent',
        borderWidth:1,
        borderColor: Colors.white
    },
    userTypePickerDropDown:{
        marginTop:5,
        marginLeft:15
    },
    userTypePickerTitle:{
        fontWeight:'700',
        fontSize: 13
    },
    goBackToLoginButton: {
        borderRadius: 3,
        height:30,
        backgroundColor:'transparent',
        color: Colors.background,
        fontSize: 12,
        fontWeight: "bold"
    },
    formItemContainer: {
        marginTop: 15
    }
})