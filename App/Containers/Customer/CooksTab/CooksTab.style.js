import { StyleSheet, Platform } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../Themes/index'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  headerOuterContainer: {
    width: Metrics.screenWidth,
    backgroundColor: Colors.snow,
    padding: 15,
    height: 75,
    shadowColor: Colors.charcoal,
    shadowOpacity: (Platform.OS === 'ios') ? 0.4 : 0.4,
    shadowRadius: (Platform.OS === 'ios') ? 2 : 2,
    shadowOffset: {
      height: (Platform.OS === 'ios') ? 0 : 0,
    },
    elevation: 5,
    zIndex: 10
  },
  row: {
    flex: 1,
    backgroundColor: Colors.clear,
    marginVertical: 0,
    height: 100,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 0,
    paddingTop: 0
  },
  rowInnerContainer: {
    flex: 1,
    height: 90,
    backgroundColor: Colors.snow,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    padding: 10,
    paddingTop: 15
  },
  boldLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.charcoal
  },
  label: {
    textAlign: 'center',
    color: Colors.snow
  },
  listContent: {
    marginTop: 0,
    paddingBottom: 10
  }
})
