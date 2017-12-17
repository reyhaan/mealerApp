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

// Styles
const styles = OrdersTabStyle;

class Cart extends Component {

    constructor(props) {
        super(props);
        this.state = {}
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

const mapDispatchToProps = (dispatch) => (bindActionCreators(cartActionCreators, dispatch));

const mapStateToProps = (state) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
