import React, { Component } from 'react';
import {
  Text,
  FlatList,
  Alert,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { Button } from 'native-base';
import { Col, Row } from 'react-native-easy-grid';
import { Colors } from '../../../Themes/index';
import style from '../OrderHistory.style';
import Constants from '../../../Constants/Constants';
import OrderHistoryItem from './OrderHistoryItem';
import { orderActionCreators } from '../../../Store/Order/OrderActions';

class OrderHistory extends Component {
  cancelOrder = () => {
    const { order, orderActions } = this.props;
    Alert.alert(
      order.customer.name,
      'Are you want to cancel this order',
      [
        {
          text: 'Cancel',
          onPress: () => {
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            order.status = Constants.orderStatus.cancelled.toLowerCase();
            orderActions.updateOrderStatus(order);
          },
        },
      ],
      { cancelable: false },
    );
  };

  calculateTotalCost = (rowData) => {
    let total = 0;
    for (let i = 0; i < rowData.length; i++) {
      total += (rowData[i].itemCost * rowData[i].itemCount);
    }
    return parseFloat(total).toFixed(2);
  };

  render() {
    const { order } = this.props;
    const totalCost = this.calculateTotalCost(order.items);
    const showOrderItems = order && order.items.length > 1;
    return (
      <Col>
        <Col style={{ paddingTop: 0, backgroundColor: Colors.snow }}>
          <Row style={{
            backgroundColor: Colors.snow,
            borderBottomColor: Colors.gray2,
            borderBottomWidth: 1,
            borderTopColor: Colors.gray2,
            borderTopWidth: 1,
          }}
          />
          <Row style={{ marginTop: 5, display: 'flex', flexDirection: 'row' }}>
            <Col style={{ alignItems: 'flex-start' }}>
              <Text style={{
                color: Colors.charcoal, fontWeight: 'bold', marginLeft: 10,
              }}
              >
                DATE: {moment(moment.utc(order.timeStamp)).format('lll')}
              </Text>
            </Col>
            {
              Constants.orderStatus[order.status] === 'NEW' &&
              <Col style={{ alignItems: 'flex-end' }}>
                <Button
                  small
                  warning
                  style={{ marginRight: 10, alignSelf: 'flex-end' }}
                  onPress={() => {
                    this.cancelOrder();
                  }}
                >
                  <Text style={{ paddingLeft: 5, paddingRight: 5, color: Colors.snow }}>
                    Cancel Order
                  </Text>
                </Button>
              </Col>
            }
          </Row>
          <Row style={{ marginTop: 5 }}>
            <Col style={{ alignItems: 'flex-start', marginRight: 20 }}>
              <Text style={{
                marginLeft: 10,
                fontSize: 14,
                color: Colors.gray3,
              }}
              >CHEF:&nbsp;{order.vendor.name.toUpperCase()}
              </Text>
            </Col>
            <Col style={{ alignItems: 'flex-end', marginRight: 20 }}>
              <Text style={{
                marginLeft: 10,
                fontSize: 14,
                color: Colors.gray3,
              }}
              >Status: {Constants.orderStatus[order.status]}
              </Text>
            </Col>
          </Row>
          {showOrderItems &&
          <FlatList
            style={style.vendorOrderContainer}
            contentContainerStyle={style.listContent}
            data={order.items}
            renderItem={({ item }) => <OrderHistoryItem item={item}/>}
          />}
          <Row style={{ backgroundColor: Colors.snow, paddingBottom: 25, paddingTop: 10 }}>
            <Col size={2} style={{ paddingLeft: 10 }}>
              <Text style={{ color: Colors.charcoal, fontWeight: 'bold' }}>Subtotal</Text>
            </Col>

            <Col size={1} style={{ alignItems: 'flex-end', justifyContent: 'center', paddingRight: 20 }}>
              <Text style={{ color: Colors.charcoal, fontWeight: 'bold' }}>
                ${totalCost}
              </Text>
            </Col>
          </Row>
        </Col>
      </Col>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  orderActions: bindActionCreators(orderActionCreators, dispatch),
});

export default connect(null, mapDispatchToProps)(OrderHistory);
