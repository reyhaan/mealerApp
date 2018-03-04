import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bindActionCreators } from 'redux';
import { Tab, Tabs, ScrollableTab, Button } from 'native-base';
import { connect } from 'react-redux';
import OrdersTabStyle from './VendorOrders.style';
import CustomerOrderDetails from './Components/CustomerOrderDetails';
import { Colors } from '../../Themes/index';
import { vendorActionCreators } from '../../Store/Vendor/VendorActions';
import constants from '../../Services/constants-service';
import { clearBadgeCount } from '../../Services/push-notification-service';
import LoadingSpinner from '../../Components/LoadingSpinner';
import ScreenHeader from '../../Components/ScreenHeader';

// Styles
const styles = OrdersTabStyle;

class Cart extends Component {
  constructor(props) {
    super(props);
    this.getVendorOrders();
  }

  async componentWillMount() {
    try {
      await clearBadgeCount();
    } catch (e) {
      console.log(e);
    }
  }

  getVendorOrders = () => {
    this.props.vendorActions.fetchVendorOrders();
  };

  orderCount = (state) => {
    switch (state) {
      case constants.orderStates.new:
        return this.props.vendor.newVendorOrders &&
        this.props.vendor.newVendorOrders.length ?
          this.props.vendor.newVendorOrders.length : 0;
      case constants.orderStates.accepted:
        return this.props.vendor.acceptedVendorOrders &&
        this.props.vendor.acceptedVendorOrders.length ?
          this.props.vendor.acceptedVendorOrders.length : 0;
      case constants.orderStates.delivered:
        return this.props.vendor.deliveredVendorOrders &&
        this.props.vendor.deliveredVendorOrders.length ?
          this.props.vendor.deliveredVendorOrders.length : 0;
      case constants.orderStates.cancelled:
        return this.props.vendor.cancelledVendorOrders &&
        this.props.vendor.cancelledVendorOrders.length ?
          this.props.vendor.cancelledVendorOrders.length : 0;
      default:
        return 0;
    }
  };

  headerRightComponent = () => {
    return (
      <Button
        transparent
        onPress={this.getVendorOrders}
      >
        <Icon name="refresh" size={20} color={Colors.background}/>
      </Button>
    );
  };

  renderNewOrders = () => {
    if (this.props.vendor.newVendorOrders && this.props.vendor.newVendorOrders.length > 0) {
      return (
        <View>
          <LoadingSpinner show={this.props.vendor.fetchVendorsOrdersPending}/>
          <FlatList
            data={this.props.vendor.newVendorOrders}
            refreshing={false}
            onRefresh={() => this.getVendorOrders()}
            renderItem={({ item }) => <CustomerOrderDetails order={item}/>}
          />
        </View>);
    }
    return (
      <View style={{
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <LoadingSpinner show={this.props.vendor.fetchVendorsOrdersPending}/>
        <Text
          style={{ fontSize: 16, color: Colors.charcoal }}
          numberOfLines={2}
        >
          All new orders has been accepted.
        </Text>
      </View>
    );
  };

  renderAcceptedOrders = () => {
    if (this.props.vendor.acceptedVendorOrders &&
      this.props.vendor.acceptedVendorOrders.length > 0) {
      return (
        <View>
          <LoadingSpinner show={this.props.vendor.fetchVendorsOrdersPending}/>
          <FlatList
            data={this.props.vendor.acceptedVendorOrders}
            refreshing={false}
            onRefresh={() => this.getVendorOrders()}
            renderItem={({ item }) => <CustomerOrderDetails order={item}/>}
          />
        </View>);
    }
    return (
      <View style={{
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <LoadingSpinner show={this.props.vendor.fetchVendorsOrdersPending}/>
        <Text
          style={{ fontSize: 16, color: Colors.charcoal }}
          numberOfLines={2}
        >All accepted orders have been delivered.
        </Text>
      </View>
    );
  };

  renderDeliveredOrders = () => {
    if (this.props.vendor.deliveredVendorOrders &&
      this.props.vendor.deliveredVendorOrders.length > 0) {
      return (
        <View>
          <LoadingSpinner show={this.props.vendor.fetchVendorsOrdersPending}/>
          <FlatList
            data={this.props.vendor.deliveredVendorOrders}
            refreshing={false}
            onRefresh={() => this.getVendorOrders()}
            renderItem={({ item }) => <CustomerOrderDetails order={item}/>}
          />
        </View>);
    }
    return (
      <View style={{
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <LoadingSpinner show={this.props.vendor.fetchVendorsOrdersPending}/>
        <Text
          style={{ fontSize: 16, color: Colors.charcoal }}
          numberOfLines={2}
        >All accepted orders have been delivered.
        </Text>
      </View>
    );
  };

  renderCancelledOrders = () => {
    if (this.props.vendor.cancelledVendorOrders &&
      this.props.vendor.cancelledVendorOrders.length > 0) {
      return (
        <View>
          <LoadingSpinner show={this.props.vendor.fetchVendorsOrdersPending}/>
          <FlatList
            data={this.props.vendor.cancelledVendorOrders}
            refreshing={false}
            onRefresh={() => this.getVendorOrders()}
            renderItem={({ item }) => <CustomerOrderDetails order={item}/>}
          />
        </View>);
    }
    return (
      <View style={{
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <LoadingSpinner show={this.props.vendor.fetchVendorsOrdersPending}/>
        <Text
          style={{ fontSize: 16, color: Colors.charcoal }}
          numberOfLines={2}
        >You have no cancelled orders.
        </Text>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Orders" rightComponent={this.headerRightComponent} />
        <Tabs
          initialPage={0}
          tabBarUnderlineStyle={{ backgroundColor: Colors.background }}
          renderTabBar={() => <ScrollableTab/>}
        >
          <Tab
            activeTextStyle={{ color: Colors.background }}
            activeTabStyle={{ backgroundColor: Colors.snow }}
            tabStyle={{ backgroundColor: Colors.lightGray }}
            textStyle={{ color: Colors.gray }}
            heading={`New (${this.orderCount(constants.orderStates.new)})`}
          >
            {this.renderNewOrders()}
          </Tab>
          <Tab
            activeTextStyle={{ color: Colors.background }}
            activeTabStyle={{ backgroundColor: Colors.snow }}
            tabStyle={{ backgroundColor: Colors.lightGray }}
            textStyle={{ color: Colors.gray }}
            heading={`Accepted (${this.orderCount(constants.orderStates.accepted)})`}
          >
            {this.renderAcceptedOrders()}
          </Tab>
          <Tab
            activeTextStyle={{ color: Colors.background }}
            activeTabStyle={{ backgroundColor: Colors.snow }}
            tabStyle={{ backgroundColor: Colors.lightGray }}
            textStyle={{ color: Colors.gray }}
            heading={`Delivered (${this.orderCount(constants.orderStates.delivered)})`}
          >
            {this.renderDeliveredOrders()}
          </Tab>
          <Tab
            activeTextStyle={{ color: Colors.background }}
            activeTabStyle={{ backgroundColor: Colors.snow }}
            tabStyle={{ backgroundColor: Colors.lightGray }}
            textStyle={{ color: Colors.gray }}
            heading={`Cancelled (${this.orderCount(constants.orderStates.cancelled)})`}
          >
            {this.renderCancelledOrders()}
          </Tab>
        </Tabs>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  vendorActions: bindActionCreators(vendorActionCreators, dispatch),
});

const mapStateToProps = state => ({
  vendor: state.vendor,
  request: state.request,
});


export default connect(mapStateToProps, mapDispatchToProps)(Cart);
