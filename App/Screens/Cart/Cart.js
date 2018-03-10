import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  View,
} from 'react-native';
import { bindActionCreators } from 'redux';
import styles from './Cart.style';
import CheckoutButton from './Components/CheckoutButton';
import CartContainer from './Components/CartContainer';
import { cartActionCreators } from '../../Store/Cart/CartActions';
import LoadingSpinner from '../../Components/LoadingSpinner';
import ScreenHeader from '../../Components/ScreenHeader';

const mapDispatchToProps = dispatch => ({
  cartActions: bindActionCreators(cartActionCreators, dispatch),
});

const mapStateToProps = state => ({
  cart: state.cart,
  request: state.request,
  user: state.user,
});

class MerchantOrders extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <ScreenHeader title="Cart"/>
        <ScrollView>
          <LoadingSpinner show={this.props.request && this.props.request.showLoadingSpinner} />
          <CartContainer {...this.props} />
        </ScrollView>
        <CheckoutButton {...this.props} />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MerchantOrders);
