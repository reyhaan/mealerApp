import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  spinnerContainer: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  spinner: {
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 5,
  },
});
