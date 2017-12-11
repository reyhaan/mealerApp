import db from '../Config/database';
import authenticationService from './authentication-service';

let orderService = {};

/**
 * Get merchant orders
 * @param userId: string
 */
orderService.getOrders = async (userId) => {
    try {
        let orders = [];
        let userOrderSnapshot = await db.ordersRef(userId).once('value');
        console.log(userOrderSnapshot)
        // userOrderSnapshot.forEach(function (childSnapshot) {
        //     let order = { ...childSnapshot.val()};
        //     order.id = childSnapshot.key;
        //     orders.push(order);
        // });
        // return orders;
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
