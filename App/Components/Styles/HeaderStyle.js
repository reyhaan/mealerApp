import { StyleSheet, Platform } from 'react-native';
import { Colors, Metrics } from '../../Themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    height: Metrics.doubleBaseMargin + Metrics.navBarHeight,
    backgroundColor: Colors.background,
  },
  listContainer: {
    borderBottomWidth: 0,
    borderTopWidth: 0,
    marginBottom: 0,
    marginTop: 15,
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: Colors.background,
    height: 100,
  },
  listWrapper: {
    borderTopColor: Colors.background,
  },
  listTitle: {
    color: Colors.snow,
    fontSize: 16,
  },
  listItem: {
    borderBottomColor: Colors.background,
    height: 100,
  },
  subtitle: {
    color: Colors.snow,
  },
  subtitleContainer: {

  },
  avatarContainer: {
    marginTop: (Platform.OS === 'ios') ? 0 : 2,
  },
});
