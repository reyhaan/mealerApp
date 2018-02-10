import React, {Component} from 'react'
import {
    Text,
    FlatList,
} from 'react-native'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Colors} from '../../../Themes/index';
import style from '../OrderHistory.style'
import {Constants} from '../../../Constants/Constants'
import moment from 'moment';
import OrderHistoryItem from './OrderHistoryItem'

let _calculateTotalCost = (rowData) => {
    let total = 0;
    for (let i = 0; i < rowData.length; i++) {
        total += (rowData[i].itemCost * rowData[i].itemCount)
    }
    return parseFloat(total).toFixed(2);
};

export default class OrderHistory extends Component {
    render() {
        const {order} = this.props;

        return (
            <Col>
                <Col style={{paddingTop: 0, backgroundColor: Colors.snow}}>
                    <Row style={{
                        backgroundColor: Colors.snow,
                        borderBottomColor: Colors.gray2,
                        borderBottomWidth: 1,
                        borderTopColor: Colors.gray2,
                        borderTopWidth: 1
                    }}/>
                    <Row style={{marginTop: 5}}>
                        <Text style={{
                            alignItems: 'flex-start', marginRight: 20,
                            color: Colors.charcoal, fontWeight: 'bold', marginLeft: 10
                        }}>
                            DATE: {moment(moment.utc(order.timeStamp)).format('lll')}
                        </Text>
                    </Row>
                    <Row style={{marginTop: 5}}>
                        <Col style={{alignItems: 'flex-start', marginRight: 20}}>
                            <Text style={{
                                marginLeft: 10,
                                fontSize: 14,
                                color: Colors.gray3
                            }}>CHEF:&nbsp;{order.vendor.name.toUpperCase()}</Text>
                        </Col>
                        <Col style={{alignItems: 'flex-end', marginRight: 20}}>
                            <Text style={{
                                marginLeft: 10,
                                fontSize: 14,
                                color: Colors.gray3
                            }}>Status: {Constants.orderStatus[order.status]}</Text>
                        </Col>
                    </Row>

                    <FlatList
                        style={style.vendorOrderContainer}
                        contentContainerStyle={style.listContent}
                        data={order.items}
                        renderItem={({item}) => <OrderHistoryItem item={item}/>}
                    />

                    <Row style={{backgroundColor: Colors.snow, paddingBottom: 25, paddingTop: 10}}>
                        <Col size={2} style={{paddingLeft: 10}}>
                            <Text style={{color: Colors.charcoal, fontWeight: 'bold'}}>Subtotal</Text>
                        </Col>

                        <Col size={1} style={{alignItems: 'flex-end', justifyContent: 'center', paddingRight: 20}}>
                            <Text style={{color: Colors.charcoal, fontWeight: 'bold'}}>
                                $ {_calculateTotalCost(order.items)}</Text>
                        </Col>
                    </Row>
                </Col>
            </Col>
        )
    }
}