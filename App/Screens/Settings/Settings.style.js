import {StyleSheet, Platform} from 'react-native'
import {Colors, Metrics} from '../../Themes/index'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    headerOuterContainer: {
        width: Metrics.screenWidth,
        backgroundColor: Colors.snow,
        padding: 15,
        height: 75,
        shadowColor: (Platform.OS === 'ios') ? Colors.charcoal : Colors.snow,
        shadowOpacity: (Platform.OS === 'ios') ? 0.2 : 0.4,
        shadowRadius: (Platform.OS === 'ios') ? 2 : 3,
        shadowOffset: {
        height: (Platform.OS === 'ios') ? 0 : 0,
        },
        elevation: 4,
        zIndex: 10
    },
    listContainer: {
        borderBottomWidth: 0,
        borderTopWidth: 0,
        marginBottom: 20,
        marginTop: 0,
        paddingLeft: 5,
        paddingRight: 5,
        zIndex: 0
    },
    listWrapper: {
    },
    listTitle: {
    },
    listItem: {
        borderBottomColor: Colors.gray4
    }
})
