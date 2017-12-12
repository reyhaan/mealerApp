import db from '../Config/database';
import authenticationService from './authentication-service';

let customerOrderService = {};

/**
 * Get merchant orders
 * @param userId: string
 */
customerOrderService.getOrders = async (userId) => {
    try {
        let ordersSnapshot = await db.orders(userId).orderByChild("timestamp").once('value');
        return Promise.resolve(ordersSnapshot.val())
    } catch (error) {
        return {error};
    }
};

export default customerOrderService;
