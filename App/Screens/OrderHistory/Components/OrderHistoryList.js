import React, {Component} from 'react'
import {Text, FlatList, TouchableOpacity, StyleSheet, View, Button, Modal} from 'react-native'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Colors} from '../../../Themes/index';
import OrderHistory from './OrderHistory';
import CustomerOrderDetails from '../../VendorOrders/Components/CustomerOrderDetails';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    innerContainer: {
        alignItems: 'center',
    },
});

export default class OrderHistoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderDetailsVisible: false,
        }
    }

    render() {
        return (
            <Col>
                <Row style={{padding: 10, backgroundColor: "#F5F5F5"}}>
                    <Text style={{color: Colors.gray3}}>ORDER # {this.props.order.id}</Text>
                </Row>
                <Col style={{backgroundColor: Colors.snow}}>
                    <FlatList
                        style={{backgroundColor: Colors.snow}}
                        data={this.props.order.ordersToVendor}
                        renderItem={({item}) => <OrderHistory order={item}/>}/>
                </Col>
            </Col>
        )
    }
};