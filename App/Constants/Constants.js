export default {
  orderStatus: {
    new: 'NEW',
    confirmed: 'CONFIRMED',
    cancelled: 'CANCELLED',
    rejected: 'CANCELLED', // to-do change this and use only cancelled
    delivered: 'DELIVERED',
    accepted: 'ACCEPTED',
  },
  userType: {
    vendor: 'vendor',
    customer: 'customer',
  },
};
