import db from '../Config/database'
import {AsyncStorage} from 'react-native';

let cartService = {};

cartService.addToCart = async (item) => {
    let from = item.data.from
    let toMerchant = item.data.to
    let orderItem = item.data.item
    orderItem.itemCount = item.data.itemCount;  // set item count on orderItem itself
    
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
    }

    return new Promise().resolve(storedCart);
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

export default cartService;
