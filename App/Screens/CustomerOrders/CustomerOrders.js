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
import CustomerOrdersList from './CustomerOrdersList'

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
            this.initializeOrders(ordersArray)
        }
    };

    componentDidMount = () => {
        this.props.getOrders(this.props.user.uid)
    };

    initializeOrders = (orders) => {
        orders.reverse();
        this.setState({
            ordersArray: orders
        })
    };

    // Render multiple orders
    _renderOrders = (order) => {
        let items = [];
        _.forIn(order.items, (_, id) => {
            items.push(order.items[id])
        });
        order.items = items;

        return CustomerOrdersList(order)
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
                        renderItem={({item}) => this._renderOrders(item)}/>
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