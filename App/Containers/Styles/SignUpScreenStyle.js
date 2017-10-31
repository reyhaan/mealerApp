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
        marginTop: Metrics.baseMargin,
        backgroundColor: Colors.facebook,
        borderRadius: 3
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
    signUpButton: {
        margin: 15,
        fontSize: 15,
        color: Colors.bloodOrange,
        textDecorationLine: 'underline'
    }
})