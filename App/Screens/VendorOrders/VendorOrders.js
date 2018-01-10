import React, {Component} from 'react'
import {
    View,
    Text,
    FlatList
} from 'react-native';
import {connect} from 'react-redux';
import OrdersTabStyle from './VendorOrders.style';
import VendorOrder from './VendorOrder';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Colors} from '../../Themes/index';
import {Header} from 'react-native-elements';
import {Container, Content, Tab, Tabs, ScrollableTab} from 'native-base';
import {bindActionCreators} from 'redux';
import {vendorActionCreators} from '../../Redux/Vendor/VendorActions';
import constants from '../../Services/constants-service';

// Styles
const styles = OrdersTabStyle;

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getVendorOrders();
        this.state = {
            refreshing: false
        }
    }

    getVendorOrders = () => {
        this.props.vendorActions.fetchVendorOrders();
    };

    orderCount = (state) => {
        switch (state) {
            case constants.orderStates.new:
                return this.props.vendor.newVendorOrders && this.props.vendor.newVendorOrders.length ? this.props.vendor.newVendorOrders.length : 0;
                break;
            case constants.orderStates.accepted:
                return this.props.vendor.acceptedVendorOrders && this.props.vendor.acceptedVendorOrders.length ? this.props.vendor.acceptedVendorOrders.length : 0;
                break;
            case constants.orderStates.delivered:
                return this.props.vendor.deliveredVendorOrders && this.props.vendor.deliveredVendorOrders.length ? this.props.vendor.deliveredVendorOrders.length : 0;
                break;
            case constants.orderStates.cancelled:
                return this.props.vendor.cancelledVendorOrders && this.props.vendor.cancelledVendorOrders.length ? this.props.vendor.cancelledVendorOrders.length : 0;
                break;
            default:
                return 0
        }
    };

    renderNewOrders = (refreshing) => {
        if (this.props.vendor.newVendorOrders && this.props.vendor.newVendorOrders.length > 0) {
            return (<FlatList
                data={this.props.vendor.newVendorOrders}
                refreshing={refreshing}
                onRefresh={() => this.getVendorOrders()}
                renderItem={({item}) => <VendorOrder order={item}/>}/>)
        } else {
            return (
                <View style={{
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{fontSize: 15, color: Colors.charcoal}} numberOfLines={2}>All new orders has been
                        accepted.</Text>
                </View>
            )
        }
    };

    renderAcceptedOrders = (refreshing) => {
        if (this.props.vendor.acceptedVendorOrders && this.props.vendor.acceptedVendorOrders.length > 0) {
            return (<FlatList
                data={this.props.vendor.acceptedVendorOrders}
                refreshing={refreshing}
                onRefresh={() => this.getVendorOrders()}
                renderItem={({item}) => <VendorOrder order={item}/>}/>)
        } else {
            return (
                <View style={{
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{fontSize: 17, color: Colors.charcoal}}
                          numberOfLines={2}>All accepted orders have been delivered.</Text>
                </View>
            )
        }
    };

    renderDeliveredOrders = (refreshing) => {
        if (this.props.vendor.deliveredVendorOrders && this.props.vendor.deliveredVendorOrders.length > 0) {
            return (<FlatList
                data={this.props.vendor.deliveredVendorOrders}
                refreshing={refreshing}
                onRefresh={() => this.getVendorOrders()}
                renderItem={({item}) => <VendorOrder order={item}/>}/>)
        } else {
            return (
                <View style={{
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{fontSize: 17, color: Colors.charcoal}}
                          numberOfLines={2}>All accepted orders have been delivered.</Text>
                </View>
            )
        }
    };

    renderCancelledOrders = (refreshing) => {
        if (this.props.vendor.cancelledVendorOrders && this.props.vendor.cancelledVendorOrders.length > 0) {
            return (<FlatList
                data={this.props.vendor.cancelledVendorOrders}
                refreshing={refreshing}
                onRefresh={() => this.getVendorOrders()}
                renderItem={({item}) => <VendorOrder order={item}/>}/>)
        } else {
            return (
                <View style={{
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{fontSize: 17, color: Colors.charcoal}}
                          numberOfLines={2}>You have no cancelled orders.</Text>
                </View>
            )
        }
    };

    render() {
        let refreshing = this.state.refreshing;
        if (this.props.request && this.props.request.showLoadingSpinner) {
            refreshing = this.props.request.showLoadingSpinner;
        }

        return (
            <View style={styles.container}>
                <Header
                    rightComponent={null}
                    centerComponent={{text: "ORDERS", style: {color: Colors.background, fontWeight: 'bold'}}}
                    backgroundColor={Colors.snow}
                    outerContainerStyles={styles.headerOuterContainer}
                />
                <Tabs style={{backgroundColor: Colors.pink}} initialPage={0}
                      tabBarUnderlineStyle={{backgroundColor: Colors.background}}
                      renderTabBar={() => <ScrollableTab/>}>
                    <Tab activeTextStyle={{color: Colors.background}} activeTabStyle={{backgroundColor: Colors.snow}}
                         tabStyle={{backgroundColor: Colors.lightGray}} textStyle={{color: Colors.gray}}
                         heading={"New" + " (" + this.orderCount(constants.orderStates.new) + ")"}>
                        {this.renderNewOrders(refreshing)}
                    </Tab>{}
                    <Tab activeTextStyle={{color: Colors.background}} activeTabStyle={{backgroundColor: Colors.snow}}
                         tabStyle={{backgroundColor: Colors.lightGray}} textStyle={{color: Colors.gray}}
                         heading={"Accepted" + " (" + this.orderCount(constants.orderStates.accepted) + ")"}>
                        {this.renderAcceptedOrders(refreshing)}
                    </Tab>
                    <Tab activeTextStyle={{color: Colors.background}} activeTabStyle={{backgroundColor: Colors.snow}}
                         tabStyle={{backgroundColor: Colors.lightGray}} textStyle={{color: Colors.gray}}
                         heading={"Delivered" + " (" + this.orderCount(constants.orderStates.delivered) + ")"}>
                        {this.renderDeliveredOrders(refreshing)}
                    </Tab>
                    <Tab activeTextStyle={{color: Colors.background}} activeTabStyle={{backgroundColor: Colors.snow}}
                         tabStyle={{backgroundColor: Colors.lightGray}} textStyle={{color: Colors.gray}}
                         heading={"Cancelled" + " (" + this.orderCount(constants.orderStates.cancelled) + ")"}>
                        {this.renderCancelledOrders(refreshing)}
                    </Tab>
                </Tabs>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        vendorActions: bindActionCreators(vendorActionCreators, dispatch),
    }
};

const mapStateToProps = state => ({
    vendor: state.vendor,
    settings: state.settings,
    request: state.request
});


export default connect(mapStateToProps, mapDispatchToProps)(Cart)
