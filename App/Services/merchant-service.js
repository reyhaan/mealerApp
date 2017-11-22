import database from '../Config/database';


let merchant = {};

/**
 * Create Menu for merchant
 * @param userId: string
 * @param menu: object
 */
merchant.createMenu = async (userId, menu) => {
    try {
        const menuRef = database.user(userId).child('menu');
        const menuKey = await menuRef.push().getKey();
        await menuRef.child(menuKey).set(menu);
        const menuSnapshot = await menuRef.child(menuKey).once('value');
        return {id: menuSnapshot.key, ...menuSnapshot.val()};
    } catch (err) {
        return {error: true, message: err};
    }
};

/**
 * Update Menu for a merchant
 * @param userId: string
 * @param menu: object
 */
merchant.updateMenu = async (userId, menu) => {
    try {
        let userMenuRef = database.user(userId).child("menu").child(menu.id);
        await userMenuRef.update(menu);
        const menuSnapshot = await userMenuRef.once('value');
        return {id: menuSnapshot.key, ...menuSnapshot.val()};
    } catch (err) {
        return {error: true, message: err};
    }
};

/**
 * Create Remove merchant menu
 * @param userId: string
 * @param menuId: string
 */
merchant.removeMenu = async (userId, menuId) => {
    try {
        let userMenuRef = database.user(userId).child('menu').child(menuId);
        return userMenuRef.remove();
    } catch (err) {
        return {error: true, message: err};
    }
};

/**
 * Create Get all merchant menu in no particular order
 * @param userId: string
 */
merchant.getMenu = async (userId) => {
    try {
        let menus = [];
        let menusSnapshot = await database.user(userId).child('menu').once('value');
        menusSnapshot.forEach(function (childSnapshot) {
            let id = childSnapshot.key;
            let data = childSnapshot.val();
            menus.push({id, ...data});
        });
        return menus;
    } catch (err) {
        return {error: true, message: err};
    }
};

/**
 * Create Get merchant menu by Id
 * @param userId: string
 * @param menuId: string
 */
merchant.getMenuById = async (userId, menuId) => {
    try {
        let menu = await database.user(userId).child('menu').child(menuId).once('value');
        return {id: menu.key, ...menu.val()}
    } catch (err) {
        reject({error: true, message: err});
    }
};

/**
 * Create a merchant order
 * @param userId: string
 * @param order: object
 */
merchant.createOrder = async (userId, order) => {
    try {
        const orderRef = database.user(userId).child('orders');
        const orderKey = await orderRef.push().getKey();
        await orderRef.child(orderKey).set(order);
        const orderSnapshot = await orderRef.child(orderKey).once('value');
        return {id: orderSnapshot.key, ...orderSnapshot.val()};
    } catch (err) {
        return {error: true, message: err};
    }
};

/**
 * Get merchant orders
 * @param userId: string
 */
merchant.getOrders = async (userId) => {
    try {
        let menus = [];
        let userMenuSnapshot = await database.user(userId).child('orders').once('value');
        userMenuSnapshot.forEach(function (childSnapshot) {
            let id = childSnapshot.key;
            let data = childSnapshot.val();
            menus.push({id, ...data});
        });
        return menus;
    } catch (err) {
        return {error: true, message: err};
    }
};

/**
 * Update Order for a merchant
 * @param userId: string
 * @param order: object
 */
merchant.updateOrder = async (userId, order) => {
    try {
        const userOrderRef = database.user(userId).child("orders").child(order.id);
        await userOrderRef.update(order);
        const orderSnapshot = await userOrderRef.once('value');
        return {id: orderSnapshot.key, ...orderSnapshot.val()};
    } catch (err) {
        return {error: true, message: err};
    }
};

/**
 * Create Get merchant order by Id
 * @param userId: string
 * @param orderId: string
 */
merchant.getOrderById = async (userId, orderId) => {
    try {
        let userOrderSnapshot = await database.user(userId).child('orders').child(orderId).once('value');
        return {id: userOrderSnapshot.key, ...userOrderSnapshot.val()};
    } catch (err) {
        return {error: true, message: err};
    }
};

/**
 * Create Remove merchant menu
 * @param userId: string
 * @param orderId: string
 */
merchant.removeOrder = async (userId, orderId) => {
    try {
        let userOrderRef = database.user(userId).child('orders').child(orderId);
        return userOrderRef.remove();
    } catch (err) {
        return {error: true, message: err};
    }
};

/**
 * Query orders by status
 * @param userId: string
 * @param status: string
 */
merchant.getOrdersByStatus = async (userId, status) => {
    try {
        const orders = [];
        const snapshot = await database.user(userId).child("orders").orderByChild("status").equalTo(status).once("value");
        snapshot.forEach(function (childSnapshot) {
            let id = childSnapshot.key;
            let data = childSnapshot.val();
            orders.push({id, ...data});
        });
        return orders;
    } catch (err) {
        return {error: true, message: err};
    }
};

export default merchant;
