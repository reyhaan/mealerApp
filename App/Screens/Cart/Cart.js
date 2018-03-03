import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { Row } from 'react-native-easy-grid';
import { bindActionCreators } from 'redux';
import { Button } from 'native-base';
import styles from './Cart.style';
import CustomerCartScreen from './Components/CustomerCartScreen';
import { Colors, Images } from '../../Themes/index';
import { cartActionCreators } from '../../Store/Cart/CartActions';
import LoadingSpinner from '../../Components/LoadingSpinner';
import ScreenHeader from '../../Components/ScreenHeader';

class MerchantOrders extends Component {
  componentDidMount = () => {
    this.props.cartActions.getCart();
  };

  placeOrder = () => {
    const { currentUser } = this.props.user;

    if (currentUser.address) {
      Alert.alert(
        'Checkout', 'Are you sure you want to place your order ?',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'OK', onPress: () => this.props.cartActions.checkout() },
        ],
        { cancelable: false },
      );
    } else {
      Alert.alert(
        'Missing address', 'Please update your delivery address before checking out',
        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'OK', onPress: () => this.props.navigation.navigate('UserAccount', { page: 'User Account' }) },
        ],
        { cancelable: false },
      );
    }
  };

  customerCart = () => {
    if (this.props.cart && !this.props.cart.isEmpty) {
      return (
        <TouchableOpacity
          disabled={this.props.request && this.props.request.showLoadingSpinner}
          onPress={() => {
            this.placeOrder();
          }}
          style={styles.checkoutButtonContainer}
        >
          <Row style={styles.checkoutButton}>
            <Text style={{ fontWeight: 'bold', fontSize: 14, color: Colors.snow }}>CHECKOUT:
              <Text style={{ fontWeight: 'bold', fontSize: 17, color: Colors.snow }}>
                $ {this.props.cart.cost}
              </Text>
            </Text>
          </Row>
        </TouchableOpacity>);
    }
    return null;
  };

  renderCustomerCart = () => {
    if (this.props.cart && !this.props.cart.isEmpty) {
      return <CustomerCartScreen />;
    }
    return (
      <View style={styles.emptyCart}>
        <Image source={Images.emptyCart} style={styles.logo} />
        <Button
          block
          success
          style={{ backgroundColor: Colors.background }}
          onPress={() => {
            this.props.navigation.navigate('Root');
          }}
        >
          <Text style={{
            color: Colors.snow,
            fontSize: 18,
          }}
          >Cart is empty shop now!
          </Text>
        </Button>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>

        <ScreenHeader title="Cart"/>

        <ScrollView>
          <LoadingSpinner show={this.props.request && this.props.request.showLoadingSpinner} />
          {this.renderCustomerCart()}
        </ScrollView>
        {this.customerCart()}
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  cartActions: bindActionCreators(cartActionCreators, dispatch),
});

const mapStateToProps = state => ({
  cart: state.cart.cart,
  request: state.request,
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(MerchantOrders);
