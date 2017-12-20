import React, {Component} from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Platform,
    ScrollView,
} from 'react-native'
import {connect} from 'react-redux'
import style from './CustomerOrders.style'
import {Icon, Header} from 'react-native-elements'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Colors} from '../../Themes/index';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation'
import _ from 'lodash'
import {orderActionCreators} from '../../Redux/Order/OrderActions';
import {authenticationService} from '../../Services/authentication-service'
import {Constants} from '../../Utils/Constants'

class CustomerOrders extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataSource: []
        }
    }

    componentWillReceiveProps = (newProps) => {
        let {orders} = newProps;
        if (orders) {
            let ordersArray = _.values(orders);
            this._createDatasource(ordersArray)
        }
    };

    componentDidMount = () => {
        this.props.getOrders(this.props.user.uid)
    };

    _createDatasource = (orders) => {
        orders.reverse();
        this.setState({
            ordersArray: orders
        })
    };

    _calculateTotalCost = (rowData) => {
        let total = 0;
        for (let i = 0; i < rowData.length; i++) {
            total += (rowData[i].itemCost * rowData[i].itemCount)
        }
        return total;
    };

    _renderRow = (rowData) => {
        return (
            <View style={style.row}>
                <View style={style.rowInnerContainer}>
                    <Grid style={{}}>

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

    _renderIndividualMerchantRow = (rowData) => {
        return (
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
                            }}>&nbsp;{rowData[0].merchantInfo.name.toUpperCase()}</Text>
                        </Text>
                    </Col>

                    <Col style={{width: 80, alignItems: 'flex-end', paddingRight: 20}}>
                        <TouchableOpacity>
                            <View>
                                <Text
                                    style={{color: Colors.background, fontWeight: 'bold', fontSize: 12}}>DETAILS</Text>
                            </View>
                        </TouchableOpacity>
                    </Col>
                </Row>

                <Row size={1} style={style.listContainer}>
                    <FlatList
                        contentContainerStyle={style.listContent}
                        data={rowData}
                        renderItem={({item}) => this._renderRow(item)}
                    />
                </Row>

                <Row style={{backgroundColor: Colors.snow, paddingBottom: 25, paddingTop: 10}}>

                    <Col size={2} style={{paddingLeft: 20}}>
                        <Text style={{color: Colors.charcoal, fontWeight: 'bold'}}>Subtotal</Text>
                    </Col>

                    <Col size={1} style={{alignItems: 'flex-end', justifyContent: 'center', paddingRight: 20}}>
                        <Text style={{color: Colors.charcoal, fontWeight: 'bold'}}>
                            $ {this._calculateTotalCost(rowData)}</Text>
                    </Col>

                </Row>
            </Col>
        )
    };

    _renderIndividualOrderRow = (order) => {

        let merchantList = order.to;
        let itemListByEachMerchant = _.values(merchantList);

        // convert array of item objects to array of item arrays
        itemListByEachMerchant = _.map(itemListByEachMerchant, function (itemListObject) {
            return _.values(itemListObject);
        });

        return (
            <Col>
                <Row style={{padding: 10, backgroundColor: "#F5F5F5"}}>
                    <Text style={{color: Colors.gray3}}>ORDER ID: {order.id}</Text>
                </Row>

                <FlatList
                    style={{backgroundColor: Colors.snow, paddingTop: 0}}
                    data={itemListByEachMerchant}
                    renderItem={({item}) => this._renderIndividualMerchantRow(item)}
                />

                <Row style={{padding: 10, marginBottom: 20, paddingLeft: 20}}>
                    <Text>Status: {Constants.orderStatus[order.status]}</Text>
                </Row>
            </Col>
        )
    };

    backButton = () => {
        return (
            <Icon
                name={Platform.OS === 'ios' ? 'chevron-left' : 'arrow-back'}
                color={Colors.background}
                onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
            />
        )
    };

    render() {

        return (
            <Col style={style.container}>
                <Header
                    leftComponent={this.backButton()}
                    rightComponent={null}
                    centerComponent={{text: "ORDER HISTORY", style: {color: Colors.background, fontWeight: 'bold'}}}
                    backgroundColor={Colors.snow}
                    outerContainerStyles={style.headerOuterContainer}
                />
                <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>

                    <FlatList
                        style={{backgroundColor: Colors.snow, paddingTop: 10}}
                        data={this.state.ordersArray}
                        renderItem={({item}) => this._renderIndividualOrderRow(item)}
                    />

                </ScrollView>
            </Col>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.settings.user,
        orders: state.order.orders
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(orderActionCreators, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrders)