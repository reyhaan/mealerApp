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
        let to = item.data.to
        let orderItem = item.data.item
        orderItem.itemCount = item.data.itemCount;
        
        // AsyncStorage.setItem('cart', '');

        AsyncStorage.getItem('cart').then(function(storedCart) {

            storedCart = JSON.parse(storedCart)

            // console.log(storedCart)

            if (storedCart === null) {
                let order = {
                    from: from,
                    to: {}
                }
                order.to[to] = [orderItem]
                AsyncStorage.setItem('cart', JSON.stringify(order));
            } else {
                let merchantFound = false;
                _.map(storedCart.to, function(merchantOrderList, merchantId) {
                    if (merchantId === to) {
                        merchantFound = true;
                        _.map(merchantOrderList, function(item, index) {
                            if (item.id === orderItem.id) {
                                storedCart.to[merchantId][index]['itemCount'] = storedCart.to[merchantId][index]['itemCount'] + 1;
                                AsyncStorage.setItem('cart', JSON.stringify(storedCart));
                            }
                        })
                    }
                })
                
                if (!merchantFound) {
                    storedCart.to[to].push(orderItem);
                    AsyncStorage.setItem('cart', JSON.stringify(storedCart));
                }
                console.log(storedCart)
            }
        });
    } catch (error) {
        Alert.alert('Error', error.message,)
    }
}

export default cartEffects;