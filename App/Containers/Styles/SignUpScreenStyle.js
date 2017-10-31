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
    facebookButton: {
        marginTop: Metrics.baseMargin,
        backgroundColor: Colors.facebook,
        borderRadius: 3
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
        backgroundColor: Colors.pink,
        borderRadius: 3
    },
    goBackToLoginButton: {
        marginTop: 20,
        marginLeft: 30,
        marginRight: 30,
        borderRadius: 3,
        height:30,
        backgroundColor:Colors.backgroundDarker
    }
})