import {StyleSheet, Platform} from 'react-native'
import {Colors, Metrics} from '../../Themes/index'

export default StyleSheet.create({
    subContainer: {
        flex: 1,
        backgroundColor: Colors.snow,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        height: 220,
        resizeMode: 'contain'
    },
    container: {
        flex: 1,
        backgroundColor: Colors.snow
    },
    headerContainer: {
        width: Metrics.screenWidth,
        backgroundColor: Colors.snow,
        borderBottomWidth: 1,
        padding: 15,
        height: 75,
    },
    countTag: {
        height: 50,
        width: 50,
        backgroundColor: Colors.snow,
        borderRadius: 25,
        zIndex: 14,
        position: 'absolute',
        left: 11,
        top: 14,
        borderWidth: 2,
        borderColor: Colors.background,
        shadowColor: '#000',
        shadowOpacity: (Platform.OS === 'ios') ? 0.2 : 0.4,
        shadowRadius: (Platform.OS === 'ios') ? 2 : 3,
        shadowOffset: {
            height: (Platform.OS === 'ios') ? 0 : 0,
        },
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },

    dropdownContainer: {
        width: Metrics.screenWidth - 10,
        backgroundColor: Colors.snow,
        borderRadius: 3,
        zIndex: 14,
        position: 'absolute',
        left: 5,
        top: 80,
        borderWidth: 1,
        borderColor: Colors.steel,
        shadowColor: '#000',
        shadowOpacity: (Platform.OS === 'ios') ? 0.2 : 0.4,
        shadowRadius: (Platform.OS === 'ios') ? 2 : 3,
        shadowOffset: {
            height: (Platform.OS === 'ios') ? 0 : 0,
        },
        elevation: 4
    },

    headerRightButton: {
        marginLeft: 10,
        fontSize: 12,
        color: Colors.background,
        alignSelf: 'center',
        textAlignVertical: 'center'
    },

    headerTitle: {
        paddingLeft: 10,
        fontWeight: 'bold',
        fontSize: 14,
        color: Colors.background,
        alignSelf: 'center',
        textAlignVertical: 'center'
    },
    checkoutButtonContainer: {
        height: 45,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        borderRadius: 3
    },
    checkoutButton: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: Metrics.screenWidth
    }
})
