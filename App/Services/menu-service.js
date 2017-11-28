import db from '../Config/database';


let menuService = {};

/**
 * Create Menu for menuService
 * @param userId: string
 * @param menu: object
 */
menuService.createMenu = async (userId, menu) => {
    try {
        const menuRef = db.menus(userId);
        const menuKey = await menuRef.push().getKey();
        await menuRef.child(menuKey).set(menu);
        const menuSnapshot = await menuRef.child(menuKey).once('value');
        return {id: menuSnapshot.key, ...menuSnapshot.val()};
    } catch (error) {
        return {error};
    }
};

/**
 * Update Menu for a menuService
 * @param userId: string
 * @param menu: object
 */
menuService.updateMenu = async (userId, menu) => {
    try {
        let userMenuRef = db.menus(userId).child(menu.id);
        await userMenuRef.update(menu);
        const menuSnapshot = await userMenuRef.once('value');
        return {id: menuSnapshot.key, ...menuSnapshot.val()};
    } catch (error) {
        return {error};
    }
};

/**
 * Remove  menu
 * @param userId: string
 * @param menuId: string
 */
menuService.removeMenu = async (userId, menuId) => {
    try {
        let userMenuRef = db.menus(userId).child(menuId);
        return userMenuRef.remove();
    } catch (error) {
        return {error};
    }
};

/**
 * Create Get all menu in no particular order
 * @param userId: string
 */
menuService.getMenu = async (userId) => {
    try {
        let menus = [];
        let menusSnapshot = await db.menus(userId).once('value');
        menusSnapshot.forEach(function (childSnapshot) {
            let id = childSnapshot.key;
            let data = childSnapshot.val();
            menus.push({id, ...data});
        });
        return menus;
    } catch (error) {
        return {error};
    }
};

/**
 * Create Get menu by Id
 * @param userId: string
 * @param menuId: string
 */
menuService.getMenuById = async (userId, menuId) => {
    try {
        let menu = await db.menus(userId).child(menuId).once('value');
        return {id: menu.key, ...menu.val()}
    } catch (error) {
        return {error};
    }
};

export default menuService;
