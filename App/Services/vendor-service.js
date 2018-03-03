import _ from 'lodash';
import db from '../Config/database';

const vendor = {};

/**
 * Update vendor quota
 */

vendor.fetchVendors = async () => {
  try {
    const cooks = [];
    const snapshot = await db.users().orderByChild('type').equalTo('vendor').once('value');
    snapshot.forEach((childSnapshot) => {
      const id = childSnapshot.key;
      const { key } = childSnapshot;
      const data = childSnapshot.val();
      cooks.push({ id, key, ...data });
    });
    return cooks;
  } catch (error) {
    return { error };
  }
};

vendor.updateQuota = async (vendorId) => {
  try {
    return vendorId;
  } catch (error) {
    return { error };
  }
};

vendor.updateRating = async (merchantId, rating) => {
  try {
    let merchantRating = await db.user(merchantId).child('rating').once('value');
    merchantRating = merchantRating.val();
    if (!_.isNull(merchantRating)) {
      const newRating = {
        numberOfRatings: (merchantRating.numberOfRatings + 1),
        cumulativeRating: (merchantRating.cumulativeRating + rating),
      };
      await db.user(merchantId).child('rating').set(newRating);
    } else {
      const newRating = {
        numberOfRatings: 1,
        cumulativeRating: rating,
      };
      await db.user(merchantId).child('rating').update(newRating);
    }
    return {};
  } catch (error) {
    return { error };
  }
};

export default vendor;

