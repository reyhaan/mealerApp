import database from '../Config/database'

let customer = {};

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

/**
 * Create a customer order
 * @param from: string
 * @param to: string
 * @param item: object
 */
customer.addToCart = async (data) => {
    try {
        const order = {
            from: data.from,
            to: data.to,
            item: data.item,
            time: database.firebase.database.ServerValue.TIMESTAMP
        };
        const orderRef = database.firebase.database().ref("orders");
        await orderRef.push(order);
        return order;
    } catch (error) {
        return {error};
    }
};

export default customer;


