import {StyleSheet} from 'react-native'
import {Colors, Metrics, ApplicationStyles} from '../../Themes/index'

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
    facebookButton: {
        marginTop: Metrics.baseMargin,
        backgroundColor: Colors.facebook,
        borderRadius: 3
    },
    formContainer: {
        marginTop: 10 ,
        marginRight: 35 ,
        marginLeft: 20 ,
    },
    signUpView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    signUpButton: {
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 3,
        width:296,
        backgroundColor: Colors.green
    },
    inputField:{
        color:Colors.white
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
        marginLeft:15,

    },
    userTypePickerTitle:{
        fontWeight:'700',
        fontSize: 13
    },
    userTypePickerText:{
        color:Colors.text,
        fontSize:15,
        fontWeight:'500',
    },
    goBackToLoginButton: {
        marginTop: 20,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 3,
        height:30,
        backgroundColor:'transparent'
    }
})