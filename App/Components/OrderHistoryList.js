import React, {Component} from 'react'
import {
    Text,
    FlatList,
} from 'react-native'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Colors} from '../Themes/index';
import OrderHistory from './OrderHistory'

export default class CustomerOrderHistory extends Component {
    render() {
        return (
            <Col>
                <Row style={{padding: 10, backgroundColor: "#F5F5F5"}}>
                    <Text style={{color: Colors.gray3}}>ORDER # {this.props.order.id}</Text>
                    <Col style={{alignItems: 'flex-end', marginRight: 20}}>
                        <Text style={{
                            color: Colors.background,
                            fontWeight: 'bold',
                            fontSize: 12
                        }}>DETAILS</Text>
                    </Col>
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