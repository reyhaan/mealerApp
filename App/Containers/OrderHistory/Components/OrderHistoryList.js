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
        super(props)
        this.state = {
            orderDetailsVisible: false,
        }
    }

    showOrderDetails(order) {
        console.log(order);
        this.setState({
            orderDetailsVisible: true,
            selectedOrder:order
        });
    }

    closeOrderDetails() {
        this.setState({orderDetailsVisible: false});
    }

    render() {
        return (
            <Col>
                <Row style={{padding: 10, backgroundColor: "#F5F5F5"}}>
                    <Text style={{color: Colors.gray3}}>ORDER # {this.props.order.id}</Text>
                    <Col style={{alignItems: 'flex-end', marginRight: 20}}>
                        <TouchableOpacity onPress={() => this.showOrderDetails(this.props.order)}>
                            <Text style={{color: Colors.background, fontWeight: 'bold', fontSize: 12}}>DETAILS</Text>
                        </TouchableOpacity>
                    </Col>
                </Row>

                <Modal
                    visible={this.state.orderDetailsVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.closeOrderDetails()}>
                    <View style={styles.modalContainer}>
                        <View style={styles.innerContainer}>
                            {/*<CustomerOrderDetails order={this.props.order}/>*/}
                            <Button
                                onPress={() => this.closeOrderDetails()}
                                title="Close modal"
                            >
                            </Button>
                        </View>
                    </View>
                </Modal>

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