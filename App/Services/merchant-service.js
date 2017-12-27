import db from '../Config/database'
import orderService from './order-service';
import authService from './authentication-service';
import _ from 'lodash'

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

merchant.updateRating = async (merchantId, rating) => {
    try {
        let merchantRating =  await db.user(merchantId).child('rating').once('value');
        merchantRating = merchantRating.val();
        if (!_.isNull(merchantRating)) {
            let newRating = {
                numberOfRatings: (merchantRating.numberOfRatings + 1),
                cumulativeRating: (merchantRating.cumulativeRating + rating)
            };
            await db.user(merchantId).child('rating').set(newRating);
        } else {
            let newRating = {
                numberOfRatings: 1,
                cumulativeRating: rating
            };
            await db.user(merchantId).child("rating").update(newRating);
        }
        
    } catch (error) {
        return {error};
    }
};

export default merchant;


