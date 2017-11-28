import db from '../Config/database';


let orderService = {};

/**
 * Create a merchant order
 * @param userId: string
 * @param order: object
 */
orderService.createOrder = async (userId, order) => {
    try {
        const orderRef = db.user(userId).child('orders');
        const orderKey = await orderRef.push().getKey();
        await orderRef.child(orderKey).set(order);
        const orderSnapshot = await orderRef.child(orderKey).once('value');
        return {id: orderSnapshot.key, ...orderSnapshot.val()};
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
        let menus = [];
        let userMenuSnapshot = await db.user(userId).child('orders').once('value');
        userMenuSnapshot.forEach(function (childSnapshot) {
            let id = childSnapshot.key;
            let data = childSnapshot.val();
            menus.push({id, ...data});
        });
        return menus;
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
        const userOrderRef = db.user(userId).child("orders").child(order.id);
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
        let userOrderSnapshot = await db.user(userId).child('orders').child(orderId).once('value');
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
        let userOrderRef = db.user(userId).child('orders').child(orderId);
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
        const snapshot = await db.user(userId).child("orders").orderByChild("status").equalTo(status).once("value");
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
