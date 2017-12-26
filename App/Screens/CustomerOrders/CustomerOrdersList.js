import React from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
} from 'react-native'
import style from './CustomerOrders.style'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Colors} from '../../Themes/index';
import {Constants} from '../../Utils/Constants'

let _calculateTotalCost = (rowData) => {
    let total = 0;
    for (let i = 0; i < rowData.length; i++) {
        total += (rowData[i].itemCost * rowData[i].itemCount)
    }
    return total;
};

let renderOrder = (rowData) => {
    return (
        <View style={style.row}>
            <View style={style.rowInnerContainer}>
                <Grid>
                    <Row style={{height: 30}}>
                        <Col size={1}>
                            <Row style={{height: 20}}>
                                <Text style={[{color: Colors.gray}]}>{rowData.itemName}</Text>
                            </Row>
                        </Col>

                        <Col style={{width: 100}}>
                            <Row style={{height: 20, flexDirection: 'column', alignItems: 'flex-end'}}>
                                <Text style={style.itemCost}>$ {rowData.itemCost} x {rowData.itemCount}</Text>
                            </Row>
                        </Col>
                    </Row>

                </Grid>
            </View>
        </View>
    )
};

export default order => {
    return (
        <Col>
            <Row style={{padding: 10, backgroundColor: "#F5F5F5"}}>
                <Text style={{color: Colors.gray3}}>ORDER ID: {order.id}</Text>
            </Row>

            <Col style={{paddingTop: 0, backgroundColor: Colors.snow}}>

                <Row style={{
                    paddingLeft: 20,
                    paddingTop: 15,
                    paddingBottom: 15,
                    marginBottom: 5,
                    backgroundColor: Colors.snow,
                    borderBottomColor: Colors.gray2,
                    borderBottomWidth: 1,
                    borderTopColor: Colors.gray2,
                    borderTopWidth: 1
                }}>
                    <Col size={1}>
                        <Text style={{color: Colors.gray3}}>CHEF:
                            <Text style={{
                                fontSize: 14,
                                color: Colors.gray3
                            }}>&nbsp;{order.merchant.name.toUpperCase()}</Text>
                        </Text>
                    </Col>

                    <Col style={{width: 80, alignItems: 'flex-end', paddingRight: 20}}>
                        <TouchableOpacity>
                            <View>
                                <Text
                                    style={{
                                        color: Colors.background,
                                        fontWeight: 'bold',
                                        fontSize: 12
                                    }}>DETAILS</Text>
                            </View>
                        </TouchableOpacity>
                    </Col>
                </Row>

                <Row size={1} style={style.listContainer}>
                    <FlatList
                        contentContainerStyle={style.listContent}
                        data={order.items}
                        renderItem={({item}) => renderOrder(item)}
                    />
                </Row>

                <Row style={{backgroundColor: Colors.snow, paddingBottom: 25, paddingTop: 10}}>

                    <Col size={2} style={{paddingLeft: 20}}>
                        <Text style={{color: Colors.charcoal, fontWeight: 'bold'}}>Subtotal</Text>
                    </Col>

                    <Col size={1} style={{alignItems: 'flex-end', justifyContent: 'center', paddingRight: 20}}>
                        <Text style={{color: Colors.charcoal, fontWeight: 'bold'}}>
                            $ {_calculateTotalCost(order.items)}</Text>
                    </Col>

                </Row>
            </Col>

            <Row style={{padding: 10, marginBottom: 20, paddingLeft: 20}}>
                <Text>Status: {Constants.orderStatus[order.status]}</Text>
            </Row>
        </Col>
    )
};