import db from '../Config/database';
import authenticationService from './authentication-service';
import cartService from './cart-service';
import _ from 'lodash';
import moment from 'moment';
import each from 'async/each';

let orderService = {};

/**
 * Create a vendor order
 */
orderService.createCustomerOrder = async () => {
    try {
        const cart = await cartService.getCart();
        const user = await authenticationService.currentUser();

        let customerOrder = {};
        customerOrder.customerId = user.uid;
        customerOrder.timeStamp = db.firebase.database.ServerValue.TIMESTAMP;
        customerOrder.subtotal = null;
        customerOrder.orders = [];
        customerOrder.customer = await authenticationService.fetchUser(user.uid);
        customerOrder.id = await db.ordersFromCustomer().push().getKey();
        await db.ordersFromCustomer().child(customerOrder.id).set(customerOrder);

        //Place an order to each vendor existing in the cart, every vendor has a separate order
        let vendorIds = [];
        _.forIn(cart.to, (_, vendorId) => {
            vendorIds.push(vendorId)
        });
        await each(vendorIds, async (vendorId) => {
            let order = {};
            order.timeStamp = db.firebase.database.ServerValue.TIMESTAMP;
            order.subtotal = null;
            order.status = 'new';
            order.items = cart.to[vendorId];
            order.customer = customerOrder.customer;
            order.customerId = customerOrder.customerId;
            order.vendor = await authenticationService.fetchUser(vendorId);
            order.vendorId = order.vendor.uid;
            order.ordersFromCustomerId = customerOrder.id;
            order.id = await db.ordersToVendor().push().getKey();
            await db.ordersToVendor().child(order.id).set(order);
            const vendorOrderRef = db.ordersToVendor().child(order.id);
            const orderSnapshot = await vendorOrderRef.once('value');
            await db.ordersFromCustomer().child(customerOrder.id).child('ordersToVendor').child(orderSnapshot.key).set({
                id: orderSnapshot.key,
                key: orderSnapshot.key,
                ...orderSnapshot.val()
            });
        });
        await cartService.dumpCart();
        return Promise.resolve();
    } catch (error) {
        return {error};
    }
};

/**
 * Get customer orders
 * @param userId: string
 */
orderService.getCustomerOrders = async (userId) => {
    try {
        let customerOrders = [];
        const snapshot = await db.ordersFromCustomer().orderByChild("customerId").equalTo(userId).once("value");
        snapshot.forEach(childSnapshot => {
            let id = childSnapshot.key;
            let key = childSnapshot.key;
            let customerOrder = childSnapshot.val();
            let vendorOrders = []; // A customer order consist of multiple vendor orders

            _.forIn(customerOrder.ordersToVendor, (_, id) => {
                let vendorOrder = customerOrder.ordersToVendor[id];
                let items = [];
                let itemIds = Object.keys(vendorOrder.items);
                itemIds.forEach((id) => {
                    items.push(vendorOrder.items[id])
                });
                vendorOrder.items = items;
                vendorOrders.push(vendorOrder)
            });

            customerOrder.ordersToVendor = vendorOrders;
            customerOrders.push({id, key, ...customerOrder});
        });

        return customerOrders;
    } catch (error) {
        return {error};
    }
};

/**
 * Get vendor orders
 * @param userId: string
 */
orderService.getMerchantOrders = async (userId) => {
    try {
        const orders = [];
        const snapshot = await db.ordersToVendor().orderByChild("vendorId").equalTo(userId).once("value");
        snapshot.forEach(childSnapshot => {
            let id = childSnapshot.key;
            let key = childSnapshot.key;
            let data = childSnapshot.val();
            let items = [];
            _.forIn(data.items, (_, id) => {
                items.push(data.items[id])
            });
            data.items = items;
            orders.push({id, key, ...data});
        });
        return orders;
    } catch (error) {
        return {error};
    }
};

/**
 * Update Order for a vendor
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
 * Create Get vendor order by Id
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
 * Create Remove vendor menu
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
