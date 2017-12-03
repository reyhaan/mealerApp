import {put, call} from 'redux-saga/effects'
import {Alert, AsyncStorage} from 'react-native';
import customerService from '../../Services/customer-service';
import cartService from '../../Services/cart-service';
import authentication from '../../Services/authentication-service';
import {cartActionCreators} from './CartActions'
import _ from 'lodash'

const cartEffects = {};

cartEffects.addToCart = function* (item) {
    try {

        let from = item.data.from
        let toMerchant = item.data.to
        let orderItem = item.data.item
        orderItem.itemCount = item.data.itemCount;  // set item count on orderItem itself
        
        // AsyncStorage.setItem('cart', '');

        let storedCart = {};

        yield AsyncStorage.getItem('cart').then(function(cart) {

            storedCart = JSON.parse(cart)

            // if there is no cart, populate one
            if (storedCart === null) {
                let order = {
                    from: from,
                    to: {}
                }
                order.to[toMerchant] = [orderItem]
                AsyncStorage.setItem('cart', JSON.stringify(order));
            } else {
                let foundMerchantId = _.find(_.keys(storedCart.to), function(merchantId) { return merchantId === toMerchant } );
                
                // If item belongs to already present merchant in the cart
                if (foundMerchantId) {
                    let foundItemIndex = _.findIndex(storedCart.to[foundMerchantId], function(item) { return item.id === orderItem.id })
                    // Add item count to same item being added from same merchant
                    if (foundItemIndex >= 0) {
                        storedCart.to[toMerchant][foundItemIndex]['itemCount'] = storedCart.to[toMerchant][foundItemIndex]['itemCount'] + item.data.itemCount;
                        AsyncStorage.setItem('cart', JSON.stringify(storedCart));
                    } else {
                        storedCart.to[toMerchant].push(orderItem);
                        AsyncStorage.setItem('cart', JSON.stringify(storedCart));
                    }
                // Add a new merchant
                } else {
                    storedCart.to[toMerchant] = [orderItem];
                    AsyncStorage.setItem('cart', JSON.stringify(storedCart));
                }
                // console.log(storedCart)
            }
        });
        yield put(cartActionCreators.addToCartSuccessful(storedCart));
    } catch (error) {
        Alert.alert('Error', error.message,)
    } finally {
        yield put(cartActionCreators.hideAddToCartModal(true));
    }
}

export default cartEffects;