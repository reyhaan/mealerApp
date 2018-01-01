import db from '../Config/database'
import {AsyncStorage} from 'react-native';
import _ from 'lodash'

let cartService = {};

/**
 * Get latest cart from session
 */
cartService.getCart = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem("cart").then((value) => {
            let cart = JSON.parse(value);
            if (cart && cart.to) {
                cart.isEmpty = _.isEmpty(cart.to);
                if (!cart.isEmpty) {
                    let itemsForAllMerchants = _.values(cart.to);
                    cart.cost = 0;
                    _.each(itemsForAllMerchants, function (itemFromOneMerchant) {
                        let itemArray = _.values(itemFromOneMerchant);
                        _.each(itemArray, function (item) {
                            cart.cost = cart.cost + (item.itemCost).toFixed(2) * (item.itemCount);
                        })
                    });
                }
            } else {
                cart = {isEmpty: true};
            }

            cart.cost = parseFloat(cart.cost).toFixed(2);
            resolve(cart);
        }).catch(error => {
            reject(error);
        })
    });
};

/**
 * Empty out the cart
 */
cartService.dumpCart = () => {
    AsyncStorage.setItem('cart', '');
};

/**
 * Add an item to cart
 * @param item: object
 */
cartService.addToCart = async (item) => {
    let from = item.from;
    let toMerchant = item.to;
    let orderItem = item.item;
    orderItem.itemCount = item.itemCount;  // set item count on orderItem itself
    orderItem.merchantInfo = item.merchantInfo;

    let cart = await AsyncStorage.getItem('cart');
    let storedCart = JSON.parse(cart);

    // if there is no cart, populate one
    if (storedCart === null && _.keys(storedCart).length === 0) {
        let order = {
            from: from,
            to: {}
        };
        order.to[toMerchant] = {};
        order.to[toMerchant][orderItem.id] = orderItem;
        AsyncStorage.setItem('cart', JSON.stringify(order));
    } else {
        let foundMerchantId = _.find(_.keys(storedCart.to), function (merchantId) {
            return merchantId === toMerchant
        });

        // If item belongs to already present vendor in the cart
        if (foundMerchantId) {
            let itemsForFoundMerchant = _.values(storedCart.to[foundMerchantId]);
            let foundItem = _.find(itemsForFoundMerchant, function (item) {
                return item.id === orderItem.id
            });
            // Add item count to same item being added from same vendor
            if (foundItem) {
                storedCart.to[toMerchant][foundItem.id]['itemCount'] = storedCart.to[toMerchant][foundItem.id]['itemCount'] + item.itemCount;
                AsyncStorage.setItem('cart', JSON.stringify(storedCart));
                // Else, just add the new item under this vendor
            } else {
                storedCart.to[toMerchant][orderItem.id] = orderItem;
                AsyncStorage.setItem('cart', JSON.stringify(storedCart));
            }
            // Add a new vendor
        } else {
            storedCart.to[toMerchant] = {};
            storedCart.to[toMerchant][orderItem.id] = orderItem;
            AsyncStorage.setItem('cart', JSON.stringify(storedCart));
        }
    }
    return Promise.resolve(storedCart);
};

/**
 * Remove an item from cart
 * @param itemId: string
 * @param merchantId: string
 */
cartService.removeItemFromCart = async (itemId, merchantId) => {
    let cart = await cartService.getCart();
    let updatedMerchantList = _.omit(cart.to[merchantId], itemId);
    if (_.keys(updatedMerchantList).length === 0) {
        cart.to = _.omit(cart.to, merchantId);
    } else {
        cart.to[merchantId] = updatedMerchantList;
    }
    AsyncStorage.setItem('cart', JSON.stringify(cart));
    return Promise.resolve(cart);
};

/**
 * Update item count in cart
 * @param itemId: string
 * @param merchantId: string
 * @param newCount: integer
 */
cartService.updateItemCount = async (itemId, merchantId, newCount) => {
    let cart = await cartService.getCart();
    cart.to[merchantId][itemId]['itemCount'] = newCount;
    AsyncStorage.setItem('cart', JSON.stringify(cart));
    return Promise.resolve(cart);
};

cartService.getTotalCost = async () => {
    let cost = 0;
    let cart = await cartService.getCart();
    let itemsForAllMerchants = _.values(cart.to);

    _.each(itemsForAllMerchants, function (itemFromOneMerchant) {
        let itemArray = _.values(itemFromOneMerchant);
        _.each(itemArray, function (item) {
            cost = cost + (parseFloat(item.itemCost).toFixed(2) * (item.itemCount));
        })
    });
    return Promise.resolve(cost);
};

cartService.isCartEmpty = async () => {
    let cart = await AsyncStorage.getItem('cart');
    return Promise.resolve(cart);
};

cartService.totalItems = async () => {
    let totalItemCount = 0;
    let cart = await cartService.getCart();
    if (cart && cart.to) {
        let itemsForAllMerchants = _.values(cart.to);
        _.each(itemsForAllMerchants, function (itemFromOneMerchant) {
            let itemArray = _.values(itemFromOneMerchant);
            _.each(itemArray, function () {
                totalItemCount = totalItemCount + 1;
            })
        });
    }
    return totalItemCount;
};

cartService.checkout = async (userInfo) => {
    try {
        let data = {
            timestamp: db.firebase.database.ServerValue.TIMESTAMP,
            status: 'new',
            userInfo: userInfo
        };

        let cart = await cartService.getCart();
        // create unified order object
        let order = Object.assign(cart, data);

        const orderRef = db.orders();
        const orderKey = await orderRef.push().getKey();
        order.id = orderKey; //!important

        // Grab customer and vendor ref to update their order's list
        let merchantRefArray = _.keys(order.to);
        merchantRefArray.push(order.userInfo.uid);

        let userOrders = {};

        _.each(merchantRefArray, function (userRef) {
            // If its the user placing the order, add the complete order object
            if (userRef === order.userInfo.uid) {
                userOrders["orders/" + userRef + "/" + orderKey] = order

                // If its a vendor, then only add info from order relevant to each vendor
            } else {
                let merchantOrder = Object.assign({}, order);
                // Omit `to` ref for merchants, we dont need other vendor's info
                merchantOrder = _.omit(merchantOrder, 'to');
                merchantOrder['itemsList'] = order.to[userRef];
                userOrders["orders/" + userRef + "/" + orderKey] = merchantOrder
            }
        });

        let rootRef = db.root();
        await rootRef.update(userOders);

        await db.ordersList().child(orderKey).set(order);
        await cartService.dumpCart();
        return Promise.resolve({});

    } catch (error) {
        return {error};
    }
};

export default cartService;
