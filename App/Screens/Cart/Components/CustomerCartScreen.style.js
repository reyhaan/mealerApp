import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../../Themes/index';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  listContainer: {
    flex: 1,
    backgroundColor: Colors.snow,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    backgroundColor: Colors.clear,
    marginVertical: 0,
    height: 100,
    paddingRight: 0,
    paddingLeft: 0,
    paddingBottom: 0,
    paddingTop: 0,
    marginBottom: 0,
  },
  rowInnerContainer: {
    flex: 1,
    backgroundColor: Colors.clear,
    borderRadius: 3,
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  boldLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: Fonts.type.bold,
  },
  itemCost: {
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: Fonts.type.bold,
    color: Colors.gray,
  },
  itemCount: {
    fontSize: 14,
    color: Colors.gray,
  },
  itemModify: {
    fontSize: 12,
    color: Colors.background,
    alignSelf: 'center',
  },
  label: {
    textAlign: 'center',
    color: Colors.snow,
  },
  listContent: {
    marginTop: 0,
    paddingBottom: 0,
  },
  itemCountButton: {
    marginTop: 4,
    width: 20,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.snow,
    borderRadius: 14,
    borderWidth: 1,
  },
});
