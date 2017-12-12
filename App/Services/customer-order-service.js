import db from '../Config/database';
import authenticationService from './authentication-service';

let customerOrderService = {};

/**
 * Get merchant orders
 * @param userId: string
 */
customerOrderService.getOrders = async (userId) => {
    try {
        let orders = [];
        let userMenuSnapshot = await db.orders(userId).once('value');
        userMenuSnapshot.forEach(function (childSnapshot) {
            let order = { ...childSnapshot.val()};
            order.id = childSnapshot.key;
            orders.push(order);
        });
        return orders;
    } catch (error) {
        return {error};
    }
};

export default customerOrderService;
