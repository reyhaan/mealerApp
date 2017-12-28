import React, {Component} from 'react'
import {
    ScrollView,
    View,
    FlatList
} from 'react-native'
import {connect} from 'react-redux'
import OrdersTabStyle from './VendorOrders.style'
import VendorOrder from './VendorOrder'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Colors} from '../../Themes/index';
import {Header} from 'react-native-elements'
import {bindActionCreators} from 'redux'
import {merchantActionCreators} from '../../Redux/Merchant/MerchantActions'

// Styles
const styles = OrdersTabStyle;

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        const {merchantActions} = this.props;
        merchantActions.fetchMerchantOrders();

        console.log("ertyujik");
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    rightComponent={null}
                    centerComponent={{text: "ORDERS", style: {color: Colors.background, fontWeight: 'bold'}}}
                    backgroundColor={Colors.snow}
                    outerContainerStyles={styles.headerOuterContainer}
                />
                <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
                    <FlatList
                        style={{backgroundColor: Colors.snow, paddingTop: 5}}
                        data={this.props.merchant.orders}
                        renderItem={({item}) => VendorOrder(item)}/>
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
