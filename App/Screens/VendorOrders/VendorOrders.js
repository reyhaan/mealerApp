import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bindActionCreators } from 'redux';
import { Tab, Tabs, ScrollableTab, Header, Left, Body, Right, Button, Title } from 'native-base';
import { connect } from 'react-redux';
import OrdersTabStyle from './VendorOrders.style';
import CustomerOrderDetails from './Components/CustomerOrderDetails';
import { Colors } from '../../Themes/index';
import { vendorActionCreators } from '../../Store/Vendor/VendorActions';
import constants from '../../Services/constants-service';
import { clearBadgeCount } from '../../Services/push-notification-service';

// Styles
const styles = OrdersTabStyle;

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.getVendorOrders();
    this.state = {
      refreshing: false,
    };
  }

  async componentDidMount() {
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

    renderNewOrders = (refreshing) => {
      if (this.props.vendor.newVendorOrders && this.props.vendor.newVendorOrders.length > 0) {
        return (<FlatList
          data={this.props.vendor.newVendorOrders}
          refreshing={refreshing}
          onRefresh={() => this.getVendorOrders()}
          renderItem={({ item }) => <CustomerOrderDetails order={item} />}
        />);
      }
      return (
        <View style={{
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
        >
          <Text
            style={{ fontSize: 16, color: Colors.charcoal }}
            numberOfLines={2}
          >
            All new orders has been accepted.
          </Text>
        </View>
      );
    };

    renderAcceptedOrders = (refreshing) => {
      if (this.props.vendor.acceptedVendorOrders &&
        this.props.vendor.acceptedVendorOrders.length > 0) {
        return (<FlatList
          data={this.props.vendor.acceptedVendorOrders}
          refreshing={refreshing}
          onRefresh={() => this.getVendorOrders()}
          renderItem={({ item }) => <CustomerOrderDetails order={item} />}
        />);
      }
      return (
        <View style={{
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
        >
          <Text
            style={{ fontSize: 16, color: Colors.charcoal }}
            numberOfLines={2}
          >All accepted orders have been delivered.
          </Text>
        </View>
      );
    };

    renderDeliveredOrders = (refreshing) => {
      if (this.props.vendor.deliveredVendorOrders &&
        this.props.vendor.deliveredVendorOrders.length > 0) {
        return (<FlatList
          data={this.props.vendor.deliveredVendorOrders}
          refreshing={refreshing}
          onRefresh={() => this.getVendorOrders()}
          renderItem={({ item }) => <CustomerOrderDetails order={item} />}
        />);
      }
      return (
        <View style={{
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
        >
          <Text
            style={{ fontSize: 16, color: Colors.charcoal }}
            numberOfLines={2}
          >All accepted orders have been delivered.
          </Text>
        </View>
      );
    };

    renderCancelledOrders = (refreshing) => {
      if (this.props.vendor.cancelledVendorOrders &&
        this.props.vendor.cancelledVendorOrders.length > 0) {
        return (<FlatList
          data={this.props.vendor.cancelledVendorOrders}
          refreshing={refreshing}
          onRefresh={() => this.getVendorOrders()}
          renderItem={({ item }) => <CustomerOrderDetails order={item} />}
        />);
      }
      return (
        <View style={{
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
        >
          <Text
            style={{ fontSize: 16, color: Colors.charcoal }}
            numberOfLines={2}
          >You have no cancelled orders.
          </Text>
        </View>
      );
    };

    render() {
      let { refreshing } = this.state;
      if (this.props.request) {
        refreshing = this.props.request.showLoadingSpinner;
      }

      return (
        <View style={styles.container}>
          <Header
            iosBarStyle="dark-content"
            style={{ backgroundColor: Colors.snow, paddingBottom: Platform.OS === 'android' ? 80 : 0 }}
          >
            { Platform.OS === 'ios' && <Left />}
            <Body>
              <Title style={{
                        color: Colors.background,
                        marginTop: Platform.OS === 'android' ? 110 : 0,
                    }}
              >Orders
              </Title>
            </Body>
            <Right>
              <Button transparent onPress={this.getVendorOrders} style={{ marginTop: Platform.OS === 'android' ? 110 : 0 }}>
                <Icon name="refresh" size={20} color={Colors.background} />
              </Button>
            </Right>
          </Header>

          <Tabs
            initialPage={0}
            tabBarUnderlineStyle={{ backgroundColor: Colors.background }}
            renderTabBar={() => <ScrollableTab />}
          >
            <Tab
              activeTextStyle={{ color: Colors.background }}
              activeTabStyle={{ backgroundColor: Colors.snow }}
              tabStyle={{ backgroundColor: Colors.lightGray }}
              textStyle={{ color: Colors.gray }}
              heading={`New ( ${this.orderCount(constants.orderStates.new)}`}
            >
              {this.renderNewOrders(refreshing)}
            </Tab>
            <Tab
              activeTextStyle={{ color: Colors.background }}
              activeTabStyle={{ backgroundColor: Colors.snow }}
              tabStyle={{ backgroundColor: Colors.lightGray }}
              textStyle={{ color: Colors.gray }}
              heading={`Accepted ( ${this.orderCount(constants.orderStates.accepted)}`}
            >
              {this.renderAcceptedOrders(refreshing)}
            </Tab>
            <Tab
              activeTextStyle={{ color: Colors.background }}
              activeTabStyle={{ backgroundColor: Colors.snow }}
              tabStyle={{ backgroundColor: Colors.lightGray }}
              textStyle={{ color: Colors.gray }}
              heading={`Delivered ( ${this.orderCount(constants.orderStates.delivered)}`}
            >
              {this.renderDeliveredOrders(refreshing)}
            </Tab>
            <Tab
              activeTextStyle={{ color: Colors.background }}
              activeTabStyle={{ backgroundColor: Colors.snow }}
              tabStyle={{ backgroundColor: Colors.lightGray }}
              textStyle={{ color: Colors.gray }}
              heading={`Cancelled ( ${this.orderCount(constants.orderStates.cancelled)}`}
            >
              {this.renderCancelledOrders(refreshing)}
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
  settings: state.settings,
  request: state.request,
});


export default connect(mapStateToProps, mapDispatchToProps)(Cart);
