import React, {Component} from 'react'
import {
    ScrollView,
    View
} from 'react-native'
import {connect} from 'react-redux'
import OrdersTabStyle from './CooksOrders.style'
import {IndividualOrderList} from '../../Components'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {bindActionCreators} from 'redux'
import {cartActionCreators} from '../../Redux/Cart/CartActions'
import {merchantActionCreators} from '../../Redux/Merchant/MerchantActions'

// Styles
const styles = OrdersTabStyle;

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        const {merchantActions} = this.props;
        merchantActions.fetchMerchantOrders();
    }

    componentDidMount = async () => {

    };

    _renderMerchantOrders = () => {
        return (
            <Col>
                <IndividualOrderList></IndividualOrderList>
                <IndividualOrderList></IndividualOrderList>
                <IndividualOrderList></IndividualOrderList>
                <IndividualOrderList></IndividualOrderList>
            </Col>
        );
    };

    render() {
        // console.log(this.props.merchant.orders);
        // console.log(this.props.merchant.orders);

        if (this.props.merchant.orders){
            // console.log(this.props.merchant.orders.length);
        }

        return (
            <View style={styles.container}>
                <ScrollView>
                    <Col>
                        {this._renderMerchantOrders()}
                    </Col>
                </ScrollView>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        merchantActions: bindActionCreators(merchantActionCreators, dispatch),
    }
};

const mapStateToProps = state => ({
    merchant: state.merchant,
    settings: state.settings
});


export default connect(mapStateToProps, mapDispatchToProps)(Cart)
