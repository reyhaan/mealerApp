import db from '../Config/database'
import orderService from './order-service';
import authService from './authentication-service';

let merchant = {};

/**
 * Update merchant quota
 */
merchant.updateQuota = async (merhantId) => {
    try {
        const merchant =  await authService.fetchUser(merhantId);
        const merchantOrders = await orderService.getOrders(merchant.uid);
        const newOrders = await orderService.getOrdersByStatus(merchant.uid, 'new');
        const acceptedOrders = await orderService.getOrdersByStatus(merchant.uid, 'accepted');
        return merchant
    } catch (error) {
        return {error};
    }
};

export default merchant;


