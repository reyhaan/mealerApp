import React from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Row } from 'react-native-easy-grid';
import styles from '../Cart.style';
import { Colors } from '../../../Themes/index';

function placeOrder(user, checkout, navigate) {
  if (user.address) {
    Alert.alert(
      'Checkout', 'Are you sure you want to place your order ?',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => checkout() },
      ],
      { cancelable: false },
    );
  } else {
    Alert.alert(
      'Missing address', 'Please update your delivery address before checking out',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => navigate('UserAccount', { page: 'User Account' }) },
      ],
      { cancelable: false },
    );
  }
}

export default (props) => {
  if (props.cart && !props.cart.isEmpty) {
    return (
      <TouchableOpacity
        disabled={props.request && props.request.showLoadingSpinner}
        onPress={() => {
          const { currentUser } = props.user;
          const { navigate } = props.navigation;
          const { checkout } = props.cartActions;
          placeOrder(currentUser, checkout, navigate);
        }}
        style={styles.checkoutButtonContainer}
      >
        <Row style={styles.checkoutButton}>
          <Text style={{ fontWeight: 'bold', fontSize: 14, color: Colors.snow }}>CHECKOUT:
            <Text style={{ fontWeight: 'bold', fontSize: 17, color: Colors.snow }}>
              $ {props.cart.cost}
            </Text>
          </Text>
        </Row>
      </TouchableOpacity>);
  }
  return null;
};
