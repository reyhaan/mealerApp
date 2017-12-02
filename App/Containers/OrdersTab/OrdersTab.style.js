import { StyleSheet, Platform } from 'react-native'
import { Colors, Metrics } from '../../Themes/index'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow
  },
  headerOuterContainer: {
    width: Metrics.screenWidth,
    backgroundColor: Colors.background,
    borderBottomWidth: 0,
    padding: 15,
    height: 75,
  },
  headerContainer: {
    position: 'absolute', 
    top: 0, 
    left: 0, 
    height: 95, 
    width: Metrics.screenWidth, 
    zIndex: 10, 
    backgroundColor: Colors.clear,
  },

  headerButtonContainer: {
    marginTop: Metrics.doubleBaseMargin + 5, 
    width: Metrics.screenWidth, 
    backgroundColor: Colors.clear, 
    height: 70, 
    padding: 12,
    paddingTop: 18,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingRight: 18,
  },
  dropdownButtonContainer: {
    flex: 1,
    height: 55,
    backgroundColor: Colors.snow,
    borderRadius: 3,
    borderWidth: (Platform.OS === 'ios') ? 1 : 0,
    borderColor: (Platform.OS === 'ios') ? Colors.steel : Colors.clear,
    shadowColor: Colors.steel,
    shadowOpacity: (Platform.OS === 'ios') ? 0.2 : 0.4,
    shadowRadius: (Platform.OS === 'ios') ? 2 : 3,
    shadowOffset: {
      height: (Platform.OS === 'ios') ? 2 : 3,
    },
    elevation: 3,
  },
  countTag: {
    height: 50, 
    width: 50, 
    backgroundColor: Colors.snow, 
    borderRadius: 25, 
    zIndex: 14, 
    position: 'absolute', 
    left: 11, 
    top: 14,
    borderWidth: 2,
    borderColor: Colors.background,
    shadowColor: '#000',
    shadowOpacity: (Platform.OS === 'ios') ? 0.2 : 0.4,
    shadowRadius: (Platform.OS === 'ios') ? 2 : 3,
    shadowOffset: {
      height: (Platform.OS === 'ios') ? 0 : 0,
    },
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },

  dropdownContainer: {
    width: Metrics.screenWidth - 140, 
    backgroundColor: Colors.snow, 
    borderRadius: 3, 
    zIndex: 14, 
    position: 'absolute', 
    left: 55, 
    top: 90,
    borderWidth: 1,
    borderColor: Colors.steel,
    shadowColor: '#000',
    shadowOpacity: (Platform.OS === 'ios') ? 0.2 : 0.4,
    shadowRadius: (Platform.OS === 'ios') ? 2 : 3,
    shadowOffset: {
      height: (Platform.OS === 'ios') ? 0 : 0,
    },
    elevation: 4
  }

})
