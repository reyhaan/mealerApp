import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  ScrollView,
  View,
} from 'react-native';
import { bindActionCreators } from 'redux';
import styles from './Cart.style';
import CheckoutButton from './Components/CheckoutButton';
import { cartActionCreators } from '../../Store/Cart/CartActions';
import LoadingSpinner from '../../Components/LoadingSpinner';
import ScreenHeader from '../../Components/ScreenHeader';
import ListOfVendors from './Components/ListOfVendors';
import EmptyCart from './Components/EmptyCart';

const mapDispatchToProps = dispatch => ({
  cartActions: bindActionCreators(cartActionCreators, dispatch),
});

const mapStateToProps = state => ({
  cart: state.cart,
  request: state.request,
  user: state.user,
});

class CartScreen extends PureComponent {
  render() {
    const showCart = this.props.cart && !this.props.cart.isEmpty;
    const showSpinner = this.props.request && this.props.request.showLoadingSpinner;

    return (
      <View style={styles.container}>
        <ScreenHeader title="Cart"/>
        <ScrollView>
          <LoadingSpinner show={showSpinner}/>
          {
            showCart ? <ListOfVendors {...this.props} /> : <EmptyCart {...this.props} />
          }
        </ScrollView>
        <CheckoutButton {...this.props} />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);
