import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Themes/index';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.snow,
  },
  subContainer: {
    flex: 1,
    backgroundColor: Colors.snow,
    flexDirection: 'column',
    alignItems: 'center',
    // justifyContent: 'center'
  },
  headerOuterContainer: {
    width: Metrics.screenWidth,
    backgroundColor: Colors.background,
    borderBottomColor: Colors.pink2,
    borderBottomWidth: 0,
    padding: 15,
    height: 75,
  },
  logo: {
    marginTop: (Metrics.screenHeight / 2) - 200,
    height: 90,
    width: 90,
    resizeMode: 'contain',
  },
  mealerLogo: {
    height: 50,
    resizeMode: 'contain',
    tintColor: Colors.background,
  },
});
