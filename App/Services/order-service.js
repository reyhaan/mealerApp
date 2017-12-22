import db from '../Config/database';
import authenticationService from './authentication-service';
import cartService from './cart-service';
import _ from 'lodash';
import each from 'async/each';

let orderService = {};

/**
 * Create a merchant order
 */
orderService.createNewOrder = async () => {
    try {
        let order = {
            timeStamp: db.firebase.database.ServerValue.TIMESTAMP,
            subtotal: null,
        };
        const cart = await cartService.getCart();
        let merchantIds = [];
        _.forIn(cart.to, (_, merchantId) => {
            merchantIds.push(merchantId)
        });
        const user = await authenticationService.currentUser();
        order.customer = await authenticationService.fetchUser(user.uid);
        order.customer.id = order.customer.uid;

        //Place an order to each merchant existing in the cart, every merchant has a separate order.
        each(merchantIds, async (merchantId) => {
            order.status = 'new';
            order.items = cart.to[merchantId];
            order.merchant = await authenticationService.fetchUser(merchantId);
            order.merchant.id = order.merchant.uid;
            order.id = await db.orders().push().getKey();
            await db.orders().child(order.id).set(order);
        });
        await cartService.dumpCart();
        return Promise.resolve();
    } catch (error) {
        return {error};
    }
};

/**
 * Get merchant orders
 * @param userId: string
 */
orderService.getOrders = async (userId) => {
    try {
        let orders = [];
        let userMenuSnapshot = await db.orders(userId).once('value');
        userMenuSnapshot.forEach(function (childSnapshot) {
            let order = {...childSnapshot.val()};
            order.id = childSnapshot.key;
            orders.push(order);
        });
        return orders;
    } catch (error) {
        return {error};
    }
};

/**
 * Update Order for a merchant
 * @param userId: string
 * @param order: object
 */
orderService.updateOrder = async (userId, order) => {
    try {
        const userOrderRef = db.orders(userId).child(order.id);
        await userOrderRef.update(order);
        const orderSnapshot = await userOrderRef.once('value');
        return {id: orderSnapshot.key, ...orderSnapshot.val()};
    } catch (error) {
        return {error};
    }
};

/**
 * Create Get merchant order by Id
 * @param userId: string
 * @param orderId: string
 */
orderService.getOrderById = async (userId, orderId) => {
    try {
        let userOrderSnapshot = await db.orders(userId).child(orderId).once('value');
        return {id: userOrderSnapshot.key, ...userOrderSnapshot.val()};
    } catch (error) {
        return {error};
    }
};

/**
 * Create Remove merchant menu
 * @param userId: string
 * @param orderId: string
 */
orderService.removeOrder = async (userId, orderId) => {
    try {
        let userOrderRef = db.orders(userId).child(orderId);
        return userOrderRef.remove();
    } catch (error) {
        return {error};
    }
};

/**
 * Query orders by status
 * @param userId: string
 * @param status: string
 */
orderService.getOrdersByStatus = async (userId, status) => {
    try {
        const orders = [];
        const snapshot = await db.orders(userId).orderByChild("status").equalTo(status).once("value");
        snapshot.forEach(function (childSnapshot) {
            let id = childSnapshot.key;
            let data = childSnapshot.val();
            orders.push({id, ...data});
        });
        return orders;
    } catch (error) {
        return {error};
    }
};

export default orderService;
