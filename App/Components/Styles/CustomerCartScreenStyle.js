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
    backgroundColor: Colors.clear,
    borderRadius: 3,
    padding: 10,
    paddingRight: 20
  },
  boldLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: Fonts.type.bold,
  },
  itemCost: {
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: Fonts.type.bold,
    color: Colors.gray
  },
  itemCount: {
    fontWeight: 'bold',
    fontSize: 16,
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
  },
  itemCountButton: { 
    width: 30,
    height: 32,
    alignItems: 'center', 
    justifyContent: 'center', 
    borderColor: Colors.background, 
    borderRadius: 15, 
    borderWidth: 1,
    backgroundColor: Colors.clear
  }
})