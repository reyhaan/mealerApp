import { StyleSheet } from 'react-native';
import { Colors } from '../../../Themes/index';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    height: 180,
    backgroundColor: Colors.snow,
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.pink,
  },
  userImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 50,
  },
  userName: {
    color: Colors.snow,
    fontWeight: 'bold',
    fontSize: 18,
  },
});
