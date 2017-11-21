import database from '../Config/database';

let merchant = {};

/**
 * Create Menu for merchant
 * @param userId: string
 * @param menu: object
 */
merchant.createMenu = (userId, menu) => {
    let userMenuRef = database.user(userId + '/menu');
    return userMenuRef.push().set(menu);
};

/**
 * Update Menu for a merchant
 * @param userId: string
 * @param menu: object
 */
merchant.updateMenu = (userId, menu) => {
    const {id} = menu;
    let userMenuRef = database.user(userId + '/menu/' + id);
    return userMenuRef.update(menu);
};

/**
 * Create Remove merchant menu
 * @param userId: string
 * @param menuId: string
 */
merchant.removeMenu = (userId, menuId) => {
    let userMenuRef = database.user(userId + '/menu/' + menuId);
    return userMenuRef.remove();
};

/**
 * Create Get all merchant menu in no particular order
 * @param userId: string
 */
merchant.getMenu = (userId) => {
    return new Promise((resolve, reject) => {
        let userMenuRef = database.user(userId + '/menu' );
        userMenuRef.once('value').then((snapshot) => {
            let menus = [];
            snapshot.forEach(function (childSnapshot) {
                let id = childSnapshot.key;
                let data = childSnapshot.val();
                menus.push({id, ...data});
            });
            resolve(menus);
        }).catch(error => {
            reject(error);
        })
    });
};

/**
 * Create Get merchant menu by Id
 * @param userId: string
 */
merchant.getMenuById = (userId, menuId) => {
    return new Promise((resolve, reject) => {
        let userMenuRef = database.user(userId + '/menu/' + menuId );
        userMenuRef.once('value').then((snapshot) => {
            resolve(snapshot.val());
        }).catch(error =>{
            reject (error);
        });
    });
};

/**
 * Create a merchant order
 * @param userId: string
 * @param order: object
 */
merchant.createOrder = (userId, order) => {
    let merchantOrderRef = database.user(userId + '/orders');
    return merchantOrderRef.push().set(order);
};

/**
 * Get merchant orders
 * @param userId: string
 */
merchant.getOrders = (userId) => {
    return new Promise((resolve, reject) => {
        let userMenuRef = database.user(userId + '/orders' );
        userMenuRef.once('value').then((snapshot) => {
            let menus = [];
            snapshot.forEach(function (childSnapshot) {
                let id = childSnapshot.key;
                let data = childSnapshot.val();
                menus.push({id, ...data});
            });
            resolve(menus);
        }).catch(error => {
            reject(error);
        })
    });
};

/**
 * Update Order for a merchant
 * @param userId: string
 * @param order: object
 */
merchant.updateOrder = (userId, order) => {
    const {id} = order;
    let userOrderRef = database.user(userId + '/orders/' + id);
    return userOrderRef.update(order);
};

/**
 * Create Get merchant order by Id
 * @param userId: string
 * @param orderId: string
 */
merchant.getOrderById = (userId, orderId) => {
    return new Promise((resolve, reject) => {
        let userOrderRef = database.user(userId + '/orders/' + orderId );
        userOrderRef.once('value').then((snapshot) => {
            resolve(snapshot.val());
        }).catch(error =>{
            reject (error);
        });
    });
};

/**
 * Create Remove merchant menu
 * @param userId: string
 * @param orderId: string
 */
merchant.removeOrder = (userId, orderId) => {
    let userOrderRef = database.user(userId + '/orders/' + orderId);
    return userOrderRef.remove();
};

/**
 * Query orders by status
 * @param userId: string
 * @param status: string
 */


// TODO: come back to this
merchant.getOrdersByStatus = (userId, status) => {
    return new Promise((resolve, reject) => {
        let usersRef = database.firebase.database().ref("users/");
        let ordersRef = usersRef.child("orders");

        ordersRef.equalTo(status).on("child_added", function(data) {
            console.log(data);
            resolve(data);
        });
    });
};

export default merchant;
