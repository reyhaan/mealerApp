import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../../Themes'

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
    height: 80,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 0,
    paddingTop: 10
  },
  rowInnerContainer: {
    flex: 1,
    height: 60,
    backgroundColor: Colors.snow,
    borderRadius: 3,
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