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
    width: Metrics.screenWidth, 
    backgroundColor: Colors.background, 
    height: 80, 
    paddingTop: Metrics.doubleBaseMargin + 5
  },
  dropdownButtonContainer: {
    flex: 1,
    height: 55,
    padding: 10,
    backgroundColor: Colors.background
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
    width: Metrics.screenWidth - 10, 
    backgroundColor: Colors.snow, 
    borderRadius: 3, 
    zIndex: 14, 
    position: 'absolute', 
    left: 5, 
    top: 80,
    borderWidth: 1,
    borderColor: Colors.steel,
    shadowColor: '#000',
    shadowOpacity: (Platform.OS === 'ios') ? 0.2 : 0.4,
    shadowRadius: (Platform.OS === 'ios') ? 2 : 3,
    shadowOffset: {
      height: (Platform.OS === 'ios') ? 0 : 0,
    },
    elevation: 4
  },

  headerRightButton: { 
    marginLeft: 10, 
    fontSize: 12, 
    color: Colors.snow, 
    alignSelf: 'center', 
    textAlignVertical: 'center' 
  },

  headerTitle: { 
    paddingLeft: 10, 
    fontWeight: 'bold', 
    fontSize: 14, 
    color: Colors.snow, 
    alignSelf: 'center', 
    textAlignVertical: 'center' 
  }

})
