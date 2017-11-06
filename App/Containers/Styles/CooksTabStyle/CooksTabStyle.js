import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../../Themes/index'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  headerOuterContainer: {
    width: Metrics.screenWidth,
    backgroundColor: Colors.background,
    borderBottomColor: Colors.pink2,
    borderBottomWidth: 1,
    padding: 15,
    height: 75,
  },
  row: {
    flex: 1,
    backgroundColor: Colors.clear,
    marginVertical: 0,
    height: 100,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 10,
    paddingTop: 10
  },
  rowInnerContainer: {
    flex: 1,
    height: 85,
    backgroundColor: Colors.snow,
    borderRadius: 3,
    padding: 5
  },
  boldLabel: {
    fontWeight: 'bold'
  },
  label: {
    textAlign: 'center',
    color: Colors.snow
  },
  listContent: {
    marginTop: 5,
    paddingBottom: 10
  }
})
