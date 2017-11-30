import { StyleSheet, Platform } from 'react-native'
import { Colors, Fonts, Metrics } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    alignItems: 'center', 
    justifyContent: 'center', 
    height: 300,
    backgroundColor: Colors.snow
  },
  subContainer: {
    flex: 1,
    // alignItems: 'center', 
    // justifyContent: 'center', 
    flexDirection: 'row',
    height: 50
  },
  userImage: {
      width: 100,
      height: 100,
      resizeMode: 'cover',
      borderRadius: 50,
      marginTop: 50
  },
  userName: {
    color: Colors.charcoal, 
    fontWeight: 'bold', 
    fontSize: 20,
  }
})
