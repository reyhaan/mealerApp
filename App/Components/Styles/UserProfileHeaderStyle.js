import { StyleSheet, Platform } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  mainContainer: {
    alignItems: 'center', 
    justifyContent: 'center', 
    height: 300, 
    backgroundColor: Colors.border
  },
  subContainer: {
    flex: 1,
    // alignItems: 'center', 
    // justifyContent: 'center', 
    height: 50,
  },
  userImage: {
      width: Metrics.screenWidth,
      height: 300,
      resizeMode: 'cover'
  },
  userName: {
    color: Colors.snow, 
    fontWeight: 'bold', 
    fontSize: 20, 
    marginTop: (Platform.OS === 'ios') ? 15 : 12, 
    paddingLeft: 10
  }
})
