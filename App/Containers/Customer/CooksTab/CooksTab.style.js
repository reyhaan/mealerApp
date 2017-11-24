import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../Themes/index'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  headerOuterContainer: {
    width: Metrics.screenWidth,
    backgroundColor: Colors.background,
    borderBottomColor: Colors.background,
    borderBottomWidth: 1,
    padding: 15,
    height: 75,
  },
  row: {
    flex: 1,
    backgroundColor: Colors.clear,
    marginVertical: 0,
    height: 110,
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
    padding: 10
  },
  boldLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    fontFamily: Fonts.type.bold
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
