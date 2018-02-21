import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  CardItem,
  Body,
  Text,
} from 'native-base';
import { View, FlatList, Alert } from 'react-native';
import { Avatar, Badge } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import moment from 'moment';
import { Colors } from '../../../Themes/index';
import styles from './CustomerOrderDetails.style';
import constants from '../../../Services/constants-service';
import { orderActionCreators } from '../../../Store/Order/OrderActions';

class CustomerOrderDetails extends Component {
  _calculateTotalCost = (items) => {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      const quantity = items[i].quantity ? items[i].quantity : 1;
      total += (items[i].itemCost * quantity);
    }
    return parseFloat(total).toFixed(2);
  };

  orderStatusColor = (order) => {
    switch (order.status) {
      case constants.orderStates.new:
        return Colors.background;
      case constants.orderStates.accepted:
        return Colors.blue;
      case constants.orderStates.delivered:
        return Colors.green;
      case constants.orderStates.rejected:
        return Colors.red;
      default:
        return null;
    }
  };

  orderActionButton = (order) => {
    switch (order.status) {
      case constants.orderStates.new:
        return (
          <Row style={styles.statusUpdateContainer}>
            <Col style={styles.statusUpdateButton}>
              <Button small block primary onPress={() => this.acceptOrder(order)}>
                <Text>Accept</Text>
              </Button>
            </Col>
            <Col style={styles.statusUpdateButton}>
              <Button small block bordered danger onPress={() => this.rejectOrder(order)}>
                <Text>Reject</Text>
              </Button>
            </Col>
          </Row>
        );
      case constants.orderStates.accepted:
        return (
          <Row style={styles.statusUpdateContainer}>
            <Col style={styles.statusUpdateButton}>
              <Button small block success onPress={() => this.deliverOrder(order)}>
                <Text>Deliver</Text>
              </Button>
            </Col>
          </Row>
        );
      default:
        return null;
    }
  };

  acceptOrder = (o) => {
    const order = o;
    Alert.alert(
      order.customer.name,
      'Are you you want to accept order',
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
            order.status = constants.orderStates.accepted;
            this.props.orderActions.updateOrderStatus(order);
          },
        },
      ],
      { cancelable: false },
    );
  };

  rejectOrder = (o) => {
    const order = o;
    Alert.alert(
      order.customer.name,
      'Are you you want to reject order',
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
            order.status = constants.orderStates.rejected;
            this.props.orderActions.updateOrderStatus(order);
          },
        },
      ],
      { cancelable: false },
    );
  };

  deliverOrder = (o) => {
    const order = o;
    Alert.alert(
      order.customer.name,
      'Are you you want to deliver order',
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
            order.status = constants.orderStates.delivered;
            this.props.orderActions.updateOrderStatus(order);
          },
        },
      ],
      { cancelable: false },
    );
  };

  renderItem = (data) => {
    const { item } = data;
    return (
      <View style={styles.orderItemContainer}>
        <Grid>
          <Col style={{ width: 60 }}>
            <Avatar medium source={{ uri: `${item.itemImage}?${new Date().getTime()}` }}/>
          </Col>
          <Col>
            <Row style={{ height: 20, width: 200 }}>
              <Text style={[styles.boldLabel, { color: Colors.coal }]}>{item.itemName}</Text>
            </Row>
            <Row>
              <Text
                style={{ fontSize: 11, color: Colors.charcoal }}
                numberOfLines={2}
              >{item.itemDetail}
              </Text>
            </Row>
            <Row>
              <Text style={styles.itemCost}>$ {item.itemCost}
                <Text style={{ color: Colors.gray, fontSize: 12 }}>
                  x {item.quantity ? item.quantity : 1}
                </Text>
              </Text>
            </Row>
          </Col>
        </Grid>
      </View>
    );
  };

  render() {
    const { props } = this;
    const { order } = props;

    if (order) {
      return (
        <View style={styles.container}>
          <Card>
            <CardItem>
              <Body>
                <Row>
                  <Col size={1}>
                    <FlatList data={order.items} renderItem={this.renderItem}/>
                  </Col>
                </Row>
                <Row>
                  <Col size={1}>
                    <Text style={{ color: Colors.gray, marginTop: 5 }}>Name</Text>
                  </Col>
                  <Col size={1} style={styles.orderInfo}>
                    <Text style={{
                      fontWeight: 'bold',
                      fontSize: 14,
                      marginBottom: 5,
                      color: Colors.gray,
                    }}
                    >{order.customer.name.toUpperCase()}
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col size={1}>
                    <Text style={{ color: Colors.gray, marginTop: 5 }}>Time</Text>
                  </Col>
                  <Col size={1} style={styles.orderInfo}>
                    <Text style={{
                      fontWeight: 'bold',
                      fontSize: 14,
                      marginBottom: 5,
                      color: Colors.gray,
                    }}
                    >{moment(moment.utc(order.timeStamp)).format('lll')}
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col size={1}>
                    <Text style={{ color: Colors.gray, marginTop: 5 }}>Status</Text>
                  </Col>
                  <Col size={1} style={styles.orderInfo}>
                    <Text style={{
                      fontWeight: 'bold',
                      fontSize: 14,
                      marginBottom: 5,
                      color: this.orderStatusColor(order),
                    }}
                    > {order.status.toUpperCase()}
                    </Text>
                  </Col>
                </Row>
                <Row>
                  <Col size={1}>
                    <Badge
                      value="Total"
                      textStyle={{ color: Colors.gray }}
                      containerStyle={styles.customerTotalCostBadge}
                    />
                  </Col>
                  <Col size={1} style={styles.orderInfo}>
                    <Text style={[styles.customerTotalCostText, { marginTop: 5 }]}>
                      {`${' '} $ ${this._calculateTotalCost(order.items)}`}
                    </Text>
                  </Col>
                </Row>
                {this.orderActionButton(order)}
              </Body>
            </CardItem>
          </Card>
        </View>);
    } else {
      return null;
    }
  }
}

const mapDispatchToProps = dispatch => ({
  orderActions: bindActionCreators(orderActionCreators, dispatch),
});

const mapStateToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrderDetails);
