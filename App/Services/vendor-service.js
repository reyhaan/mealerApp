import db from '../Config/database'
import orderService from './order-service';
import authService from './authentication-service';
import _ from 'lodash'

let vendor = {};

/**
 * Update vendor quota
 */

vendor.fetchVendors = async () => {
    try {
        const cooks = [];
        const snapshot = await db.user().orderByChild("type").equalTo("vendor").once("value");
        snapshot.forEach(function (childSnapshot) {
            let id = childSnapshot.key;
            let key = childSnapshot.key;
            let data = childSnapshot.val();
            cooks.push({id, key, ...data});
        });
        return cooks;
    } catch (error) {
        return {error};
    }
};

vendor.updateQuota = async (vendorId) => {
    try {
        return vendorId
    } catch (error) {
        return {error};
    }
};

vendor.updateRating = async (merchantId, rating) => {
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

export default vendor;


