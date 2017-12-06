import db from '../Config/database'
import {AsyncStorage} from 'react-native';
import _ from 'lodash'

let cartService = {};

cartService.dumpCart = () => {
    AsyncStorage.setItem('cart', '');
}

// Get the current signed in user information
cartService.getCart = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem("cart").then((value) => {
            resolve(JSON.parse(value));
        }).catch(error =>{
            reject (error);
        })
    });
};

// Add an item to cart
cartService.addToCart = async (item) => {
    let from = item.from
    let toMerchant = item.to
    let orderItem = item.item
    orderItem.itemCount = item.itemCount;  // set item count on orderItem itself
    
    // AsyncStorage.setItem('cart', '');

    let storedCart = {};

    let cart = await AsyncStorage.getItem('cart');

    storedCart = JSON.parse(cart)

    // if there is no cart, populate one
    if (storedCart === null) {
        let order = {
            from: from,
            to: {}
        }
        order.to[toMerchant] = {};
        order.to[toMerchant][orderItem.id] = orderItem;
        AsyncStorage.setItem('cart', JSON.stringify(order));
    } else {
        let foundMerchantId = _.find(_.keys(storedCart.to), function(merchantId) { return merchantId === toMerchant } );
        
        // If item belongs to already present merchant in the cart
        if (foundMerchantId) {
            let itemsForFoundMerchant = _.values(storedCart.to[foundMerchantId]);

            let foundItem = _.find(itemsForFoundMerchant, function(item) { return item.id === orderItem.id })
            // Add item count to same item being added from same merchant
            if (foundItem) {
                storedCart.to[toMerchant][foundItem.id]['itemCount'] = storedCart.to[toMerchant][foundItem.id]['itemCount'] + item.data.itemCount;
                AsyncStorage.setItem('cart', JSON.stringify(storedCart));
            } else {
                storedCart.to[toMerchant][orderItem.id] = orderItem;
                AsyncStorage.setItem('cart', JSON.stringify(storedCart));
            }
        // Add a new merchant
        } else {
            storedCart.to[toMerchant][orderItem.id] = orderItem;
            AsyncStorage.setItem('cart', JSON.stringify(storedCart));
        }
    }

    return Promise.resolve(storedCart);
}

cartService.removeFromCart = async (itemId, merchantId) => {
    let cart = await this.getCart();
    let updatedCart = _.omit(cart.to[merchantId], function(value, key) {
        return itemId === key;
    });
    AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    return Promise.resolve(updatedCart);
}

cartService.updateItemCount = async (itemId, merchantId, newCount) => {
    let cart = await this.getCart();
    let updatedCart = cart.to[merchantId][itemId]['itemCount'] = newCount;
    AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    return Promise.resolve(updatedCart);
}

export default cartService;
