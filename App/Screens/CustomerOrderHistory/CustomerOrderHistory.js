import React, {Component} from 'react'
import {
    FlatList,
    Platform,
    ScrollView,
    View,
    Text,
    Image
} from 'react-native'
import {connect} from 'react-redux'
import style from './CustomerOrderHistory.style'
import {Icon, Header} from 'react-native-elements'
import {Col} from 'react-native-easy-grid';
import {Colors, Metrics, Images} from '../../Themes/index'
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation'
import {orderActionCreators} from '../../Redux/Order/OrderActions';
import RenderCustomerOrder from './RenderCustomerOrder'
import {LoadingSpinner} from '../../Components/index'

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

    renderHistory = () => {
        const {orders} = this.props.order;
        if (orders && orders.length > 0) {
            return (
                <FlatList data={orders} renderItem={({item}) => RenderCustomerOrder(item)}/>
            )
        } else {
            return (
                <View style={style.emptyHistoryContainer}>
                    <Image source={Images.emptyCart} style={style.emptyHistoryLogo}/>
                    <Text style={{
                        color: Colors.backgroundGray,
                        marginTop: Metrics.doubleBaseMargin,
                        fontWeight: 'bold',
                        fontSize: 18
                    }}>Your have no previous orders!</Text>
                </View>
            )
        }
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
                <ScrollView style={{flex: 1, backgroundColor: '#fff'} }>
                    <LoadingSpinner show={this.props.order && this.props.order.showActivityIndicator}/>
                    {this.renderHistory()}
                </ScrollView>
            </Col>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.settings.user,
        order: state.order
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(orderActionCreators, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrderHistory)