import { StyleSheet } from 'react-native';
import { Colors } from '../Themes/index';

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.background,
  },
  indicator: {
    height: 0,
    width: 0,
  },
  icon: {
    height: 18,
    resizeMode: 'contain',
    marginBottom: 0,
  },
});
