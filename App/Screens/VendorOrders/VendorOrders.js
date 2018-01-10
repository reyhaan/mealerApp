import React, {Component} from 'react'
import {
    ScrollView,
    View,
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
import {LoadingSpinner} from '../../Components/index';

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
                         tabStyle={{backgroundColor: Colors.lightGray}} textStyle={{color: Colors.gray}} heading="New">
                        <FlatList
                            data={this.props.vendor.newVendorOrders}
                            refreshing={refreshing}
                            onRefresh={() => this.getVendorOrders()}
                            renderItem={({item}) => <VendorOrder order={item}/>}/>
                    </Tab>
                    <Tab activeTextStyle={{color: Colors.background}} activeTabStyle={{backgroundColor: Colors.snow}}
                         tabStyle={{backgroundColor: Colors.lightGray}} textStyle={{color: Colors.gray}}
                         heading="Accepted">
                        <FlatList
                            data={this.props.vendor.acceptedVendorOrders}
                            refreshing={refreshing}
                            onRefresh={() => this.getVendorOrders()}
                            renderItem={({item}) => <VendorOrder order={item}/>}/>
                    </Tab>
                    <Tab activeTextStyle={{color: Colors.background}} activeTabStyle={{backgroundColor: Colors.snow}}
                         tabStyle={{backgroundColor: Colors.lightGray}} textStyle={{color: Colors.gray}}
                         heading="Delivered">
                        <FlatList
                            data={this.props.vendor.deliveredVendorOrders}
                            refreshing={refreshing}
                            onRefresh={() => this.getVendorOrders()}
                            renderItem={({item}) => <VendorOrder order={item}/>}/>
                    </Tab>
                    <Tab activeTextStyle={{color: Colors.background}} activeTabStyle={{backgroundColor: Colors.snow}}
                         tabStyle={{backgroundColor: Colors.lightGray}} textStyle={{color: Colors.gray}}
                         heading="Cancelled">
                        <FlatList
                            data={this.props.vendor.cancelledVendorOrders}
                            refreshing={refreshing}
                            onRefresh={() => this.getVendorOrders()}
                            renderItem={({item}) => <VendorOrder order={item}/>}/>
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
