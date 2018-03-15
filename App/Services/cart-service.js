import { AsyncStorage } from 'react-native';
import _ from 'lodash';
import db from '../Config/database';
import { store } from '../../App';

const cartService = {};

cartService.getCart = async () => {
  try {
    const currentUser = Object.assign({}, store.getState().user.currentUser);
    if (currentUser && currentUser.type === 'customer') {
      const storedCart = await AsyncStorage.getItem('cart');
      let cart = JSON.parse(storedCart);
      if (cart && cart.to) {
        cart.isEmpty = _.isEmpty(cart.to);
        if (!cart.isEmpty) {
          const itemsForAllMerchants = _.values(cart.to);
          cart.totalItemCount = 0;
          _.each(itemsForAllMerchants, (itemFromOneMerchant) => {
            const itemArray = _.values(itemFromOneMerchant);
            _.each(itemArray, (item) => {
              cart.cost += item.itemCost * (item.itemCount);
              cart.totalItemCount += item.itemCount;
            });
          });
        }
      } else {
        cart = { isEmpty: true };
        cart.totalItemCount = 0;
      }

      cart.vendors = cartService.cartByVendors(cart);
      cart.cost = 0;
      cart.vendors.map(v => v.totalCost).forEach((v) => {
        cart.cost += Number(parseFloat(v).toFixed(2));
      });

      return Promise.resolve(cart);
    }
    return Promise.resolve({});
  } catch (error) {
    return Promise.reject(error);
  }
};

cartService.cartByVendors = (cart) => {
  const merchantIds = [];
  const userCart = [];

  if (cart !== undefined && cart !== null && !_.isEmpty(cart)) {
    _.forIn(cart.to, (_, merchantId) => {
      merchantIds.push(merchantId);
    });
    merchantIds.forEach((id) => {
      const key = id;
      const itemsObject = cart.to[id];
      const itemIds = [];
      const items = [];

      _.forIn(itemsObject, (_, id) => {
        itemIds.push(id);
      });
      itemIds.forEach((id) => {
        items.push(itemsObject[id]);
      });

      const vendorId = items[0].merchantInfo.uid;
      const vendors = Object.assign([], store.getState().vendors);
      const currentVendor = vendors.find(v => v.id === vendorId);
      const deliveryFee = _.has(currentVendor, 'deliveryFee') ? currentVendor.deliveryFee : 0;
      let totalCost = cartService.itemsTotalCost(items, deliveryFee);

      if (!items[0].delivery) {
        totalCost -= deliveryFee;
      }

      if (totalCost.toFixed) {
        totalCost = totalCost.toFixed(2);
      }

      userCart.push({
        key,
        items,
        totalCost,
        deliveryFee,
      });
    });
  }

  return userCart;
};

cartService.itemsTotalCost = (items, deliveryFee) => {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += (items[i].itemCost * items[i].itemCount);
  }

  if (deliveryFee) {
    total += Number(parseFloat(deliveryFee).toFixed(2));
  }

  return parseFloat(total).toFixed(2);
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
  const { from } = item;
  const toMerchant = item.to;
  const orderItem = item.item;
  orderItem.itemCount = item.itemCount; // set item count on orderItem itself
  orderItem.merchantInfo = item.merchantInfo;

  const cart = await AsyncStorage.getItem('cart');
  const storedCart = JSON.parse(cart);
  // if there is no cart, populate one
  if (storedCart === null && _.keys(storedCart).length === 0) {
    const order = {
      from,
      to: {},
    };
    order.to[toMerchant] = {};
    order.to[toMerchant][orderItem.id] = orderItem;
    AsyncStorage.setItem('cart', JSON.stringify(order));
  } else {
    const foundMerchantId = _.find(_.keys(storedCart.to), merchantId => merchantId === toMerchant);

    // If item belongs to already present vendor in the cart
    if (foundMerchantId) {
      const itemsForFoundMerchant = _.values(storedCart.to[foundMerchantId]);
      const foundItem = _.find(itemsForFoundMerchant, i => i.id === orderItem.id);
      // Add item count to same item being added from same vendor
      if (foundItem) {
        const merchant = storedCart.to[toMerchant][foundItem.id];
        const count = merchant.itemCount;
        merchant.itemCount = count + item.itemCount;
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
  const cart = await cartService.getCart();
  const updatedMerchantList = _.omit(cart.to[merchantId], itemId);
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
  const cart = await cartService.getCart();
  cart.to[merchantId][itemId].itemCount = newCount;
  AsyncStorage.setItem('cart', JSON.stringify(cart));
  return Promise.resolve(cart);
};

cartService.updateDeliveryType = async (vendorId, delivery) => {
  const cart = await cartService.getCart();
  const items = cart.to[vendorId];
  const itemKeys = _.keys(items);

  itemKeys.forEach((itemId) => {
    cart.to[vendorId][itemId].delivery = delivery;
  });
  await AsyncStorage.setItem('cart', JSON.stringify(cart));
  return {};
};

cartService.getTotalCost = async () => {
  let cost = 0;
  const cart = await cartService.getCart();
  const itemsForAllMerchants = _.values(cart.to);

  _.each(itemsForAllMerchants, (itemFromOneMerchant) => {
    const itemArray = _.values(itemFromOneMerchant);
    _.each(itemArray, (item) => {
      cost += (parseFloat(item.itemCost).toFixed(2) * (item.itemCount));
    });
  });
  return Promise.resolve(cost);
};

cartService.isCartEmpty = async () => {
  const cart = await AsyncStorage.getItem('cart');
  return Promise.resolve(cart);
};

cartService.totalItems = async () => {
  let totalItemCount = 0;
  const cart = await cartService.getCart();
  if (cart && cart.to) {
    const itemsForAllMerchants = _.values(cart.to);
    _.each(itemsForAllMerchants, (itemFromOneMerchant) => {
      const itemArray = _.values(itemFromOneMerchant);
      _.each(itemArray, (i) => {
        totalItemCount += i.itemCount;
      });
    });
  }
  return Promise.resolve(totalItemCount);
};

cartService.checkout = async (userInfo) => {
  try {
    const data = {
      timestamp: db.firebase.database.ServerValue.TIMESTAMP,
      status: 'new',
      userInfo,
    };

    const cart = await cartService.getCart();
    // create unified order object
    const order = Object.assign(cart, data);

    const orderRef = db.orders();
    const orderKey = await orderRef.push().getKey();
    order.id = orderKey; //! important

    // Grab customer and vendor ref to update their order's list
    const merchantRefArray = _.keys(order.to);
    merchantRefArray.push(order.userInfo.uid);

    const userOrders = {};

    _.each(merchantRefArray, (userRef) => {
      // If its the user placing the order, add the complete order object
      if (userRef === order.userInfo.uid) {
        userOrders[`orders/${userRef}/${orderKey}`] = order;

        // If its a vendor, then only add info from order relevant to each vendor
      } else {
        let merchantOrder = Object.assign({}, order);
        // Omit `to` ref for merchants, we dont need other vendor's info
        merchantOrder = _.omit(merchantOrder, 'to');
        merchantOrder.itemsList = order.to[userRef];
        userOrders[`orders/${userRef}/${orderKey}`] = merchantOrder;
      }
    });

    const rootRef = db.root();
    await rootRef.update(userOrders);

    await db.ordersList().child(orderKey).set(order);
    await cartService.dumpCart();
    return Promise.resolve({});
  } catch (error) {
    return { error };
  }
};

export default cartService;
