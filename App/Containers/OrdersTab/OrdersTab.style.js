import { StyleSheet } from 'react-native'
import { Colors, Metrics } from '../../Themes/index'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
    paddingTop: Metrics.baseMargin
  },
  headerOuterContainer: {
    width: Metrics.screenWidth,
    backgroundColor: Colors.background,
    borderBottomWidth: 0,
    padding: 15,
    height: 75,
  }
})
