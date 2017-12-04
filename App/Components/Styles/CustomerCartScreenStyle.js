import { StyleSheet } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: {
    flex: 1,
    backgroundColor: Colors.snow,
    flexDirection: 'column',
    // alignItems: 'center'
  },
  row: {
    flex: 1,
    backgroundColor: Colors.clear,
    marginVertical: 0,
    height: 80,
    paddingRight: 0,
    paddingLeft: 0,
    paddingBottom: 0,
    paddingTop: 0
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
    fontFamily: Fonts.type.bold,
  },
  itemCost: {
    fontWeight: 'bold',
    fontSize: 12,
    fontFamily: Fonts.type.bold,
    color: Colors.gray
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