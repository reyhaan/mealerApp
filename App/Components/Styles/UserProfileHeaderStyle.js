import { StyleSheet, Platform } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    alignItems: 'center', 
    justifyContent: 'center', 
    height: 250,
    backgroundColor: Colors.background
  },
  subContainer: {
    flex: 1,
    // alignItems: 'center', 
    // justifyContent: 'center', 
    flexDirection: 'row',
    height: 50,
    backgroundColor: Colors.windowTint
  },
  userImage: {
      width: 100,
      height: 100,
      resizeMode: 'cover',
      borderRadius: 50,
      marginTop: 20
  },
  userName: {
    color: Colors.snow, 
    fontWeight: 'bold', 
    fontSize: 18,
  }
})
