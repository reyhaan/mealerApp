import React, {Component} from 'react'
import {
    ScrollView,
    View,
    Text,
    FlatList
} from 'react-native'
import {connect} from 'react-redux'
import OrdersTabStyle from './VendorOrders.style'
import VendorOrder from './VendorOrder'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Colors} from '../../Themes/index';
import {Header} from 'react-native-elements'
import { Container, Content, Tab, Tabs,ScrollableTab } from 'native-base';
import {bindActionCreators} from 'redux'
import {vendorActionCreators} from '../../Redux/Vendor/VendorActions'

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
        const {vendorActions} = this.props;
        vendorActions.fetchVendorOrders();
    };

    render() {
        return (
            <View style={styles.container}>
                <Header
                    rightComponent={null}
                    centerComponent={{text: "ORDERS", style: {color: Colors.background, fontWeight: 'bold'}}}
                    backgroundColor={Colors.snow}
                    outerContainerStyles={styles.headerOuterContainer}
                />
                     <Tabs initialPage={0} tabBarUnderlineStyle={{backgroundColor:Colors.background}} renderTabBar={()=> <ScrollableTab />}>
                        <Tab heading="New" activeTextStyle={{color: Colors.background}}>
                            <ScrollView style={{flex: 1}}>
                                <FlatList
                                    data={this.props.vendor.orders}
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => this.getVendorOrders()}
                                    renderItem={({item}) => <VendorOrder order={item}/>}/>
                            </ScrollView>
                        </Tab>
                        <Tab heading="Accepted" activeTextStyle={{color: Colors.background}}>
                            <ScrollView style={{flex: 1}}>
                                <FlatList
                                    data={this.props.vendor.orders}
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => this.getVendorOrders()}
                                    renderItem={({item}) => <VendorOrder order={item}/>}/>
                            </ScrollView>
                        </Tab>
                        <Tab heading="Delivered" activeTextStyle={{color: Colors.background}}>
                            <ScrollView style={{flex: 1}}>
                                <FlatList
                                    data={this.props.vendor.orders}
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => this.getVendorOrders()}
                                    renderItem={({item}) => <VendorOrder order={item}/>}/>
                            </ScrollView>
                        </Tab>
                        <Tab heading="Cancelled" activeTextStyle={{color: Colors.background}}>
                            <ScrollView style={{flex: 1}}>
                                <FlatList
                                    data={this.props.vendor.orders}
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => this.getVendorOrders()}
                                    renderItem={({item}) => <VendorOrder order={item}/>}/>
                            </ScrollView>
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
    settings: state.settings
});


export default connect(mapStateToProps, mapDispatchToProps)(Cart)
