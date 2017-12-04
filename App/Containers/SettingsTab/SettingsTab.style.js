import {StyleSheet, Platform} from 'react-native'
import {Colors, Metrics} from '../../Themes/index'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    headerOuterContainer: {
        shadowColor: '#000',
        shadowOpacity: (Platform.OS === 'ios') ? 0.2 : 0.4,
        shadowRadius: (Platform.OS === 'ios') ? 2 : 3,
        shadowOffset: {
          height: (Platform.OS === 'ios') ? 0 : 0,
        },
        elevation: 4,
        zIndex: 15
    },
    listContainer: {
        borderBottomWidth: 0,
        borderTopWidth: 0,
        marginBottom: 20,
        marginTop: 0,
        paddingLeft: 5,
        paddingRight: 5,
        zIndex: 1
    },
    listWrapper: {
    },
    listTitle: {
    },
    listItem: {
        borderBottomColor: Colors.gray4
    },
    headerOuterContainer: {
        width: Metrics.screenWidth,
        padding: 15,
        height: 75,
    }
})
