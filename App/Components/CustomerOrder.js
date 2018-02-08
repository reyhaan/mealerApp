import React from 'react'
import {
    Text,
    FlatList,
} from 'react-native'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Colors} from '../Themes/index';
import style from '../Containers/Styles/CustomerOrderHistory.style'
import {Constants} from '../Utils/Constants'
import moment from 'moment';

let _calculateTotalCost = (rowData) => {
    let total = 0;
    for (let i = 0; i < rowData.length; i++) {
        total += (rowData[i].itemCost * rowData[i].itemCount)
    }
    return parseFloat(total).toFixed(2);
};

let RenderItems = (data) => {
    const {item} = data;
    const rowData = item;
    return (
        <Grid style={style.vendorOrderItemsContainer}>
            <Row style={{height: 25}}>
                <Col size={1}>
                    <Row style={{height: 20}}>
                        <Text style={[{color: Colors.gray}]}>{rowData.itemName}</Text>
                    </Row>
                </Col>

                <Col size={1}>
                    <Row style={{height: 20, flexDirection: 'column', alignItems: 'flex-end'}}>
                        <Text style={style.itemCost}>$ {rowData.itemCost} x {rowData.itemCount}</Text>
                    </Row>
                </Col>
            </Row>
        </Grid>
    )
};

let RenderVendorOrder = data => {
    const {item} = data;
    const order = item;
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
                  <Text style={{alignItems: 'flex-start', marginRight: 20, 
                    color: Colors.charcoal, fontWeight: 'bold', marginLeft: 10}}>
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
                    renderItem={RenderItems}
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
};

export default order => {
    return (
        <Col>
            <Row style={{padding: 10, backgroundColor: "#F5F5F5"}}>
                <Text style={{color: Colors.gray3}}>ORDER # {order.id}</Text>
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
                    data={order.ordersToVendor}
                    renderItem={RenderVendorOrder}/>
            </Col>
        </Col>
    )
};