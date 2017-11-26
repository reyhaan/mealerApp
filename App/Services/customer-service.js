import db from '../Config/database'

let customer = {};

// Create an order to a merchant
customer.createOrder = (order) => {

};

/**
 * Query orders by status
 * @param userId: string
 * @param status: string
 */
merchant.getCooks = async () => {
    try {
        const cooks = [];
        const snapshot = await database.child("users").orderByChild("rating").equalTo("merchant").once("value");
        snapshot.forEach(function (childSnapshot) {
            let id = childSnapshot.key;
            let data = childSnapshot.val();
            cooks.push({id, ...data});
        });
        return cooks;
    } catch (error) {
        return {error};
    }
};

export default customer;


