import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../../Themes/index'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  listContainer: {
    borderBottomWidth: 0,
    borderTopWidth: 0, 
    marginBottom: 20,
    marginTop: 5,
    paddingLeft: 5, 
    paddingRight: 5, 
    backgroundColor: Colors.background
  },
  listWrapper: {
    borderTopColor: Colors.background
  },
  listTitle: {
    color: Colors.snow
  },
  listItem: {
    borderBottomColor: Colors.pink2
  },
  headerOuterContainer: {
    width: Metrics.screenWidth,
    backgroundColor: Colors.background,
    borderBottomColor: Colors.pink2,
    borderBottomWidth: 1,
    padding: 15,
    height: 75,
  }
})
