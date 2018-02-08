import React, {Component} from 'react'
import {View, FlatList, Alert} from 'react-native';
import {Avatar, Badge} from 'react-native-elements';
import {Col, Row, Grid} from 'react-native-easy-grid';
import moment from 'moment';
import {Colors} from '../Themes/index';
import styles from './Styles/VendorOrder.style';
import constants from '../Services/constants-service';
import {orderActionCreators} from '../Redux/Order/OrderActions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
    Button,
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Body,
    List,
    ListItem,
    Left,
    Right,
    Text,
    Thumbnail
} from 'native-base';

class VendorOrder extends Component {
    _calculateTotalCost = (items) => {
        let total = 0;
        for (let i = 0; i < items.length; i++) {
            let quantity = items[i].quantity ? items[i].quantity : 1;
            total += (items[i].itemCost * quantity)
        }
        return parseFloat(total).toFixed(2);
    };

    orderStatusColor = (order) => {
        switch (order.status) {
            case constants.orderStates.new:
                return Colors.background;
                break;
            case constants.orderStates.accepted:
                return Colors.blue;
                break;
            case constants.orderStates.delivered:
                return Colors.green;
                break;
            case constants.orderStates.cancelled:
                return Colors.red;
                break;
            default:
                return null
        }
    };

    orderActionButton = (order) => {
        switch (order.status) {
            case constants.orderStates.new:
                return (
                    <Button small block primary onPress={() => this.acceptOrder(order)}>
                        <Text>Accept</Text>
                    </Button>
                );
                break;
            case constants.orderStates.accepted:
                return (
                    <Button small block success onPress={() => this.deliverOrder(order)}>
                        <Text>Deliver</Text>
                    </Button>
                );
                break;
            default:
                return null
        }
    };

    acceptOrder = (order) => {
        Alert.alert(
            order.customer.name,
            'Are you you want to accept order',
            [
                {
                    text: 'Cancel', onPress: () => {
                }, style: 'cancel'
                },
                {
                    text: 'OK', onPress: () => {
                    order.status = constants.orderStates.accepted;
                    orderActionCreators.updateOrderStatus(order);
                    this.props.orderActions.updateOrderStatus(order)
                }
                },
            ],
            {cancelable: false}
        )
    };

    deliverOrder = (order) => {
        Alert.alert(
            order.customer.name,
            'Are you you want to deliver order',
            [
                {
                    text: 'Cancel', onPress: () => {
                }, style: 'cancel'
                },
                {
                    text: 'OK', onPress: () => {
                    order.status = constants.orderStates.delivered;
                    orderActionCreators.updateOrderStatus(order);
                    this.props.orderActions.updateOrderStatus(order)
                }
                },
            ],
            {cancelable: false}
        )
    };

    cancelOrder = (order) => {
        Alert.alert(
            order.customer.name,
            'Are you you want to accept order',
            [
                {
                    text: 'Cancel', onPress: () => {
                }, style: 'cancel'
                },
                {
                    text: 'OK', onPress: () => {
                    order.status = constants.orderStates.accepted;
                    orderActionCreators.updateOrderStatus(order);
                    this.props.orderActions.updateOrderStatus(order)
                }
                },
            ],
            {cancelable: false}
        )
    };

    renderItem = (data) => {
        const {item} = data;
        return (
            <View style={styles.orderItemContainer}>
                <Grid>
                    <Col style={{width: 60}}>
                        <Avatar medium source={{uri: item.itemImage + '?' + new Date().getTime()}}/>
                    </Col>
                    <Col>
                        <Row style={{height: 20, width: 200}}>
                            <Text style={[styles.boldLabel, {color: Colors.coal}]}>{item.itemName}</Text>
                        </Row>
                        <Row>
                            <Text style={{fontSize: 11, color: Colors.charcoal}}
                                  numberOfLines={2}>{item.itemDetail}</Text>
                        </Row>
                        <Row>
                            <Text style={styles.itemCost}>$ {item.itemCost}
                                <Text style={{color: Colors.gray, fontSize: 12}}>
                                    x {item.quantity ? item.quantity : 1}</Text>
                            </Text>
                        </Row>
                    </Col>
                </Grid>
            </View>
        )
    };

    render() {
        const order = this.props.order;
        return (<View style={styles.container}>
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
                            <Text style={{color: Colors.gray, marginTop: 5}}>Name</Text>
                        </Col>
                        <Col size={1} style={styles.orderInfo}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 14,
                                marginBottom: 5,
                                color: Colors.gray
                            }}>{order.customer.name.toUpperCase()}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col size={1}>
                            <Text style={{color: Colors.gray, marginTop: 5}}>Time</Text>
                        </Col>
                        <Col size={1} style={styles.orderInfo}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 14,
                                marginBottom: 5,
                                color: Colors.gray
                            }}>{moment(moment.utc(order.timeStamp)).format('lll')}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col size={1}>
                            <Text style={{color: Colors.gray, marginTop: 5}}>Status</Text>
                        </Col>
                        <Col size={1} style={styles.orderInfo}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 14,
                                marginBottom: 5,
                                color: this.orderStatusColor(order)
                            }}> {order.status.toUpperCase()}</Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col size={1}>
                            <Badge value='Total' textStyle={{color: Colors.gray}} containerStyle={styles.customerTotalCostBadge}/>
                        </Col>
                        <Col size={1} style={styles.orderInfo}>
                            <Text style={[styles.customerTotalCostText,{marginTop:5}]}>
                                {`${' '} $ ${this._calculateTotalCost(order.items)}`}
                            </Text>
                        </Col>
                    </Row>
                    <Row style={styles.statusUpdateContainer}>
                        <Col style={styles.statusUpdateButton}>
                            {this.orderActionButton(order)}
                        </Col>
                    </Row>
                    </Body>
                </CardItem>
            </Card>
        </View>)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        orderActions: bindActionCreators(orderActionCreators, dispatch),
    }
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(VendorOrder)