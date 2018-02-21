import React, { Component } from 'react';
import { Alert } from 'react-native';
import { Notifications, AppLoading } from 'expo';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userActionCreators } from '../../Store/User/UserActions';
import { vendorActionCreators } from '../../Store/Vendor/VendorActions';
import { orderActionCreators } from '../../Store/Order/OrderActions';
import { handleReceivedNotification } from '../../Services/push-notification-service';

const mapDispatchToProps = dispatch => ({
  dispatch,
  vendorActions: bindActionCreators(vendorActionCreators, dispatch),
  userActions: bindActionCreators(userActionCreators, dispatch),
  orderActions: bindActionCreators(orderActionCreators, dispatch),
});

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(class Main extends Component {
  componentDidMount() {
    try {
      const { navigation, userActions } = this.props;
      const { currentUser } = this.props.user;

      if (currentUser) {
        if (currentUser.type === 'customer') {
          this.props.vendorActions.fetchVendors();
          this.props.orderActions.getOrders(currentUser.uid);
          navigation.navigate('CustomerTab');
        } else if (currentUser.type === 'vendor') {
          navigation.navigate('VendorTab');
        }

        userActions.registerForPushNotification(true);
        Notifications.addListener(this.handleNotification);
      } else {
        navigation.navigate('Login');
      }
    } catch (err) {
      Alert.alert('Error', err);
    }
  }

        handleNotification = (notification) => {
          handleReceivedNotification(notification, this.props.dispatch);
        };

        render() {
          return <AppLoading />;
        }
});
