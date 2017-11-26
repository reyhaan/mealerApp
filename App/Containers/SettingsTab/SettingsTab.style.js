import {StyleSheet} from 'react-native'
import {Colors, Metrics} from '../../Themes/index'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    listContainer: {
        borderBottomWidth: 0,
        borderTopWidth: 0,
        marginBottom: 20,
        marginTop: 0,
        paddingLeft: 5,
        paddingRight: 5,
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
