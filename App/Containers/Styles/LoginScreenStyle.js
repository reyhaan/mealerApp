import { StyleSheet } from 'react-native'
import { Colors, Metrics, ApplicationStyles } from '../../Themes/'

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
        backgroundColor: Colors.facebook,
        borderRadius: 3,
        width:'100%'
    },
    signUpView:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    registerButton: {
        margin: 15,
        fontSize: 15,
        color: 'white'
    },
    loginButton: {
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
    },
    signUpButton: {
        margin: 15,
        fontSize: 15,
        color: Colors.bloodOrange,
        textDecorationLine: 'underline'
    },
    forgotPasswordView: {
        marginBottom : 5,
        display:'flex',
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginLeft: 45,
        marginRight:25
    },
    checkBoxTextStyle:{
        color:'white', 
        fontWeight:'bold', 
        fontSize:12
    },
    checkBoxContainerStyle:{
        height:20, 
        flex:1, 
        backgroundColor:Colors.background, 
        borderWidth:0
    },
    forgotPasswordTextStyle:{
        flex:1, 
        color:'white', 
        fontWeight: 'bold', 
        fontSize:12
    }
})