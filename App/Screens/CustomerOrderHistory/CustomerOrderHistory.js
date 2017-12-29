import React, {Component} from 'react'
import {
    FlatList,
    Platform,
    ScrollView,
} from 'react-native'
import {connect} from 'react-redux'
import style from './CustomerOrderHistory.style'
import {Icon, Header} from 'react-native-elements'
import {Col} from 'react-native-easy-grid';
import {Colors} from '../../Themes/index';
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation'
import {orderActionCreators} from '../../Redux/Order/OrderActions';
import RenderCustomerOrder from './RenderCustomerOrder'

class CustomerOrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: []
        }
    }

    componentWillReceiveProps = (newProps) => {
        let {orders} = newProps;
        if (orders) {
            this.initializeOrders(orders)
        }
    };

    componentDidMount = () => {
        this.props.getOrders(this.props.user.uid)
    };

    initializeOrders = (orders) => {
        orders.reverse();
        this.setState({
            orders: orders
        })
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
                    outerContainerStyles={style.headerOuterContainer}/>
                <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
                    <FlatList
                        data={this.state.orders}
                        renderItem={({item}) => RenderCustomerOrder(item)}/>
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
export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrderHistory)