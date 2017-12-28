import React from 'react'
import {View, Text, FlatList, TouchableOpacity} from 'react-native'
import {Avatar, Badge} from 'react-native-elements'
import {Col, Row, Grid} from 'react-native-easy-grid';
import moment from 'moment'
import {Colors} from '../../Themes'
import styles from './VendorOrder.style'

const _getOrderStatus = () => {
    let status = 'CONFIRMED';
    switch (status) {
        case 'CANCELLED':
            return (<Text style={{color: Colors.pink, fontWeight: 'bold', fontSize: 12}}> CANCELLED</Text>)
            break;

        case 'CONFIRMED':
            return (<Text style={{color: Colors.orange, fontWeight: 'bold', fontSize: 12}}> CONFIRMED</Text>)
            break;

        case 'DELIVERED':
            return (<Text style={{color: Colors.green, fontWeight: 'bold', fontSize: 12}}> DELIVERED</Text>)
            break;

        default:
            return (<Text style={{color: Colors.darkOrange, fontWeight: 'bold', fontSize: 12}}> CONFIRMED</Text>)
    }
};

const _calculateTotalCost = (items) => {
    let total = 0;
    for (let i = 0; i < items.length; i++) {
        let quantity = items[i].quantity ? items[i].quantity : 1;


        total += (items[i].itemCost * quantity)
    }
    return parseFloat(total).toFixed(2);
};

const _setButtonColor = (index) => {
    switch (index) {
        case 0:
            return Colors.error;
            break;

        case 1:
            return Colors.darkOrange;
            break;

        case 2:
            return Colors.green;
            break;

        default:
            return Colors.snow
    }
};


const renderItem = (item) => {
    return (
        <View style={styles.row}>
            <View style={styles.rowInnerContainer}>
                <Grid>
                    <Col style={{width: 60}}>
                        <Avatar
                            medium
                            source={{uri: item.itemImage + '?' + new Date().getTime()}}
                        />
                    </Col>
                    <Col>
                        <Row style={{height: 20}}>
                            <Text style={[styles.boldLabel, {color: Colors.coal}]}>{item.itemName}</Text>
                        </Row>
                        <Row style={{height: 26}}>
                            <Text style={{fontSize: 11, color: Colors.charcoal}}
                                  numberOfLines={2}>{item.itemDetail}</Text>
                        </Row>
                    </Col>
                    <Col style={{width: 80}}>
                        <Row style={{
                            height: 20,
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={styles.itemCost}>$ {item.itemCost}
                                <Text style={{color: Colors.gray, fontSize: 12}}> x {item.quantity ? item.quantity : 1}</Text>
                            </Text>
                        </Row>
                    </Col>
                </Grid>
            </View>
        </View>
    )
};

export default (order) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Grid>
                <Col style={styles.orderCardContainer}>
                    <Row style={styles.cardDateHeader}>
                        <Text style={styles.dateText}>{moment(moment.utc(order.timeStamp)).format('LLLL')} </Text>
                    </Row>

                    <Row style={{paddingLeft: 10, paddingTop: 10, paddingBottom: 10}}>
                        <Text style={{color: Colors.gray}}>From
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 14,
                                color: Colors.background
                            }}> {order.customer.name}</Text>
                        </Text>
                    </Row>

                    <Row size={1} style={styles.listContainer}>
                        <FlatList
                            contentContainerStyle={styles.listContent}
                            data={order.items}
                            renderItem={({item}) => renderItem(item)}
                            showsVerticalScrollIndicator={false}
                        />
                    </Row>

                    <Row>
                        <Col size={1} style={styles.customerOrderStatusContainer}>
                            <Text style={{color: Colors.gray}}>Status
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 14,
                                    color: Colors.background
                                }}> {order.status}</Text>
                            </Text>
                        </Col>

                        <Col size={1} style={styles.customerTotalCostContainer}>
                            <Badge value='Total' textStyle={{color: Colors.gray}}
                                   containerStyle={styles.customerTotalCostBadge}/>
                            <Text style={styles.customerTotalCostText}>
                                {`${' '} $ ${_calculateTotalCost(order.items)}`}
                            </Text>
                        </Col>
                    </Row>

                </Col>
            </Grid>
        </TouchableOpacity>
    )
};