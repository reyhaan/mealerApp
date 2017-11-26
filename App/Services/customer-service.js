import database from '../Config/database'

let customer = {};

// Create an order to a merchant
customer.createOrder = (order) => {

};

/**
 * Query Cooks
 */
customer.fetchCooks = async () => {
    try {
        const cooks = [];
        const snapshot = await database.firebase.database().ref("users").once("value");
        snapshot.forEach(function (childSnapshot) {
            let id = childSnapshot.key;
            let data = childSnapshot.val();
            if (data.type === "merchant") {
                cooks.push({id, ...data});
            }
        });
        return cooks;
    } catch (error) {
        return {error};
    }
};

export default customer;


