import React, {Component} from 'react'
import {View, Text, FlatList} from 'react-native'
import {Avatar, ButtonGroup} from 'react-native-elements'
import {Col, Row, Grid} from 'react-native-easy-grid';

import {Colors, Images} from '../Themes'
import styles from './Styles/IndividualOrderListStyle'

export default class IndividualOrderList extends Component {
    constructor(props) {
        super(props);

        this.orders = [
            {
                itemName: "Chicken Biryani",
                itemImage: Images.biryani,
                itemDetail: "A famous dish from India, made with slowly cooking rice with spicy chicken.",
                itemCost: 6.99,
                quantity: 2,
                key: 1
            },
            {
                itemName: "Chicken Biryani",
                itemImage: Images.biryani,
                itemDetail: "A famous dish from India, made with slowly cooking rice with spicy chicken.",
                itemCost: 6.99,
                quantity: 1,
                key: 2
            },
            {
                itemName: "Chicken Biryani",
                itemImage: Images.biryani,
                itemDetail: "A famous dish from India, made with slowly cooking rice with spicy chicken.",
                itemCost: 6.99,
                quantity: 5,
                key: 3
            }
        ];

        this.orderObject = {
            orders: this.orders,
            customerName: "Mohammad Rehaan"
        };

        this.state = {
            dataSource: this.orderObject.orders,
            index: 4,
            isMerchant: false,
            isCustomer: true
        }
    }

    _calculateTotalCost = () => {
        let total = 0;
        for (let i = 0; i < this.orderObject.orders.length; i++) {
            total += (this.orderObject.orders[i].itemCost * this.orderObject.orders[i].quantity)
        }
        return total;
    };

    _renderRow = (rowData) => {
        return (
            <View style={styles.row}>
                <View style={styles.rowInnerContainer}>
                    <Grid>
                        <Col style={{width: 60}}>
                            <Avatar
                                medium
                                source={rowData.itemImage}
                            />
                        </Col>
                        <Col>
                            <Row style={{height: 20}}>
                                <Text style={[styles.boldLabel, {color: Colors.coal}]}>{rowData.itemName}</Text>
                            </Row>
                            <Row style={{height: 26}}>
                                <Text style={{fontSize: 11, color: Colors.charcoal}}
                                      numberOfLines={2}>{rowData.itemDetail}</Text>
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
                                <Text style={styles.itemCost}>$ {rowData.itemCost}
                                    <Text style={{color: Colors.gray, fontSize: 12}}> x {rowData.quantity}</Text>
                                </Text>
                            </Row>
                        </Col>
                    </Grid>
                </View>
            </View>
        )
    };

    _updateIndex = (index) => {
        this.setState({index})
    };

    _setButtonColor = () => {
        switch (this.state.index) {
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

    _getOrderStatus = () => {
        let status = 'CONFIRMED';
        switch (status) {
            case 'CANCELLED':
                return (<Text style={{color: Colors.pink, fontWeight: 'bold', fontSize: 12}}>: CANCELLED</Text>)
                break;

            case 'CONFIRMED':
                return (<Text style={{color: Colors.orange, fontWeight: 'bold', fontSize: 12}}>: CONFIRMED</Text>)
                break;

            case 'DELIVERED':
                return (<Text style={{color: Colors.green, fontWeight: 'bold', fontSize: 12}}>: DELIVERED</Text>)
                break;

            default:
                return (<Text style={{color: Colors.darkOrange, fontWeight: 'bold', fontSize: 12}}>: CONFIRMED</Text>)
        }
    };

    render() {
        let {isMerchant, isCustomer} = this.state;
        return (
            <View style={styles.container}>
                <Grid>
                    <Col style={{paddingBottom: 30, paddingTop: 0}}>

                        <Row
                            style={{paddingLeft: 10, paddingBottom: 15, paddingTop: 15, backgroundColor: Colors.cloud}}>
                            <Text style={{fontWeight: 'bold', fontSize: 14, color: Colors.gray}}>Tuesday, Oct
                                12th</Text>
                        </Row>

                        {isCustomer &&
                        <Row style={{paddingLeft: 10, paddingTop: 15, paddingBottom: 10}}>
                            <Text style={{color: Colors.gray}}>From
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 14,
                                    color: Colors.background
                                }}> {this.orderObject.customerName}</Text>
                            </Text>
                        </Row>
                        }

                        {isMerchant &&
                        <Row style={{paddingLeft: 10, paddingTop: 10, paddingBottom: 10}}>
                            <Text style={{color: Colors.gray}}>From
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 14,
                                    color: Colors.coal
                                }}> {this.orderObject.customerName}</Text>
                            </Text>
                        </Row>
                        }

                        <Row size={1} style={styles.listContainer}>
                            <FlatList
                                contentContainerStyle={styles.listContent}
                                data={this.state.dataSource}
                                renderItem={({item}) => this._renderRow(item)}
                            />
                        </Row>

                        <Row>

                            {isMerchant &&
                            <Col size={2}>
                                <ButtonGroup
                                    selectedBackgroundColor={this._setButtonColor()}
                                    onPress={this._updateIndex}
                                    selectedIndex={this.state.index}
                                    buttons={['CANCEL', 'CONFIRM', 'DELIVERED']}
                                    containerStyle={{
                                        height: 30,
                                        borderWidth: 0,
                                        borderRadius: 2,
                                        backgroundColor: Colors.backgroundDarker
                                    }}
                                    containerBorderRadius={2}
                                    textStyle={{fontSize: 10, color: Colors.snow}}
                                    selectedTextStyle={{color: Colors.snow}}
                                    innerBorderStyle={{color: Colors.background}}/>
                            </Col>
                            }

                            {isCustomer &&
                            <Col size={2} style={{paddingLeft: 10}}>
                                <Text style={{color: Colors.gray}}>Status
                                    <Text style={{
                                        color: Colors.snow,
                                        fontWeight: 'bold'
                                    }}>: {this._getOrderStatus()}</Text>
                                </Text>
                            </Col>
                            }

                            <Col size={1} style={{alignItems: 'flex-end', justifyContent: 'center', paddingRight: 20}}>
                                <Text style={{color: Colors.gray}}>Total:
                                    <Text style={{color: Colors.coal, fontWeight: 'bold'}}>
                                        $ {this._calculateTotalCost()}</Text>
                                </Text>
                            </Col>
                        </Row>

                    </Col>
                </Grid>
            </View>
        )
    }
}