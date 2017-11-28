import db from '../Config/database'

let customer = {};

/**
 * Query Cooks
 */
customer.fetchCooks = async () => {
    try {
        const cooks = [];
        const snapshot = await db.user().orderByChild("type").equalTo("merchant").once("value");
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


