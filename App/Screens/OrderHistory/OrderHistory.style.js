import { StyleSheet, Platform } from 'react-native';
import { Colors, Metrics, Fonts } from '../../Themes/index';

export default StyleSheet.create({
  emptyHistoryContainer: {
    backgroundColor: Colors.snow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyHistoryLogo: {
    height: 220,
    resizeMode: 'contain',
  },
  menuScreenContainer: {
    flex: 1,
  },
  headerOuterContainer: {
    width: Metrics.screenWidth,
    backgroundColor: Colors.snow,
    padding: 15,
    height: 75,
    shadowColor: (Platform.OS === 'ios') ? Colors.charcoal : Colors.snow,
    shadowOpacity: (Platform.OS === 'ios') ? 0.2 : 0.4,
    shadowRadius: (Platform.OS === 'ios') ? 2 : 3,
    shadowOffset: {
      height: (Platform.OS === 'ios') ? 0 : 0,
    },
    elevation: 4,
    zIndex: 10,
  },
  itemContainer: {
    height: 115,
    marginTop: 1,
    marginBottom: 0,
    marginLeft: 4,
    marginRight: 4,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderColor: Colors.lightGray,
  },
  itemName: {
    marginTop: 12,
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.background,
  },
  itemDetails: {
    fontSize: 14,
    marginTop: 5,
    marginLeft: 10,
    color: Colors.gray,
  },
  // FULL MODE STYLES

  fullModeItemContainer: {
    height: 265,
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: Colors.snow,
    borderRadius: 3,
    shadowColor: '#000',
    shadowOpacity: (Platform.OS === 'ios') ? 0.2 : 0.4,
    shadowRadius: (Platform.OS === 'ios') ? 2 : 3,
    shadowOffset: {
      height: (Platform.OS === 'ios') ? 2 : 3,
    },
    elevation: 1,
  },
  fullModeItemImage: {
    height: 200,
    width: Metrics.screenWidth - 20,
    resizeMode: 'cover',
    marginTop: 0,
    borderRadius: 3,
    shadowColor: '#000',
    shadowOpacity: (Platform.OS === 'ios') ? 0.2 : 0.4,
    shadowRadius: (Platform.OS === 'ios') ? 2 : 3,
    shadowOffset: {
      height: (Platform.OS === 'ios') ? 2 : 3,
    },
    zIndex: 1,
  },
  fullModeItemName: {
    marginTop: (Platform.OS === 'ios') ? 2 : 0,
    marginLeft: 20,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.background,
  },
  fullModeItemCost: {
    marginTop: (Platform.OS === 'ios') ? 2 : 0,
    marginRight: 20,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold',
  },

  // MODAL style

  addItemModal: {
    flex: 1,
    backgroundColor: Colors.snow,
    borderRadius: 5,
    marginTop: (Platform.OS === 'ios') ? 10 : 0,
  },
  modal_itemName: {
    marginTop: (Platform.OS === 'ios') ? 2 : 10,
    marginRight: 20,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.background,
  },
  modal_itemCost: {
    marginTop: (Platform.OS === 'ios') ? 2 : 0,
    marginRight: 20,
    textAlign: 'right',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modal_itemDetails: {
    fontSize: 14,
    marginTop: 5,
    marginLeft: 10,
    color: Colors.gray,
  },
  modal_itemImage: {
    height: 200,
    width: Metrics.screenWidth - 30,
    resizeMode: 'cover',
    marginTop: 0,
    borderRadius: 3,
    shadowColor: '#000',
    shadowOpacity: (Platform.OS === 'ios') ? 0.2 : 0.4,
    shadowRadius: (Platform.OS === 'ios') ? 2 : 3,
    shadowOffset: {
      height: (Platform.OS === 'ios') ? 2 : 3,
    },
  },


  // customer cart screen component reused styles
  vendorOrderContainer: {
    flex: 1,
    backgroundColor: Colors.snow,
    margin: 5,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    backgroundColor: Colors.clear,
    marginVertical: 0,
    height: 30,
    paddingRight: 0,
    paddingLeft: 0,
    paddingBottom: 0,
    paddingTop: 0,
    marginBottom: 0,
  },
  vendorOrderItemsContainer: {
    flex: 1,
    borderRadius: 3,
    paddingRight: 15,
    paddingLeft: 5,
  },
  boldLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: Fonts.type.bold,
  },
  itemCost: {
    fontSize: 14,
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
