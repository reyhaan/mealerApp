import {put, call} from 'redux-saga/effects'
import {Alert, AsyncStorage} from 'react-native';
import customerService from '../../Services/customer-service';
import cartService from '../../Services/cart-service';
import authentication from '../../Services/authentication-service';
import {cartActionCreators} from './CartActions'

const cartEffects = {};

cartEffects.addToCart = function* (item) {
    try {
        // const item = {
        //     from: item.data.from,
        //     to: item.data.to,
        //     items: item.items
        // };
        console.log(item)
        // AsyncStorage.setItem('cart', JSON.stringify(item));

        // yield put(cartActionCreators.addToCartSuccessful(_order));
    } catch (error) {
        Alert.alert('Error', error.message,)
    }
}

export default cartEffects;