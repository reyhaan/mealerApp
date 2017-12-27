import { StyleSheet, Platform } from 'react-native'
import { Colors, Metrics, Fonts } from '../../Themes'

export default StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: {
    flex: 1,
    backgroundColor: Colors.snow,
    flexDirection: 'column',
    // alignItems: 'center'
  },
  row: {
    flex: 1,
    backgroundColor: Colors.clear,
    marginVertical: 0,
    height: 80,
    paddingRight: 0,
    paddingLeft: 0,
    paddingBottom: 0,
    paddingTop: 0
  },
  rowInnerContainer: {
    flex: 1,
    height: 60,
    backgroundColor: Colors.snow,
    borderRadius: 3,
    padding: 10
  },
  boldLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    fontFamily: Fonts.type.bold,
  },
  itemCost: {
    fontWeight: 'bold',
    fontSize: 12,
    fontFamily: Fonts.type.bold,
    color: Colors.gray
  },
  label: {
    textAlign: 'center',
    color: Colors.snow
  },
  listContent: {
    marginTop: 0,
    paddingBottom: 10
  },
  orderCardContainer: {
    paddingBottom: 30,
    paddingTop: 0,
    borderWidth: 2,
    marginTop: 4,
    marginBottom: 4,
    marginRight: 7,
    marginLeft:7,
    borderRadius: 6, 
    borderColor: Colors.cloud,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5, 
    elevation: 3,
    shadowRadius: 2, 
    shadowColor: (Platform.OS === 'ios') ? '#000' : Colors.cloud
  },
  cardDateHeader: {
    paddingLeft: 10, 
    paddingBottom: 15, 
    paddingTop: 15, 
    backgroundColor: Colors.cloud
  },
  dateText: {
    fontWeight: 'bold', 
    fontSize: 14, 
    color: Colors.gray
  },
  customerNameContainer: {
    paddingLeft: 10, 
    paddingTop: 15, 
    paddingBottom: 10, 
    display: 'flex',
    flexDirection: 'row', 
    justifyContent: 'flex-start'
  },
  customerNameBadge: {
    width: 60, 
    backgroundColor:Colors.cloud, 
    height: 20, 
    marginRight: 2
  },
  customerNameText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: Colors.background
  },
  customerOrderStatusContainer: {
    paddingLeft: 10, 
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'flex-start'
  },
  customerOrderStatusBadge: {
    width: 70, 
    backgroundColor:Colors.cloud, 
    height: 20, 
    marginRight: 2
  },
  customerOrderStatusText: {
    color: Colors.snow,
    fontWeight: 'bold'
  },
  customerTotalCostContainer: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    paddingRight: 10
  },
  customerTotalCostBadge: {
    width: 60, 
    backgroundColor:Colors.cloud, 
    height: 20
  },
  customerTotalCostText: {
    color: Colors.coal, 
    fontWeight: 'bold'
  }
})