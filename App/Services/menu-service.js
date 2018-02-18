import db from '../Config/database';


const menuService = {};

/**
 * Create Menu for menuService
 * @param userId: string
 * @param menu: object
 */
menuService.createMenu = async (userId, m) => {
  const menu = m;
  try {
    const menuRef = db.menus(userId);
    const menuKey = await menuRef.push().getKey();
    menu.id = menuKey; //! important
    await menuRef.child(menuKey).set(menu);
    const menuSnapshot = await menuRef.child(menuKey).once('value');
    return { id: menuSnapshot.key, ...menuSnapshot.val() };
  } catch (error) {
    return { error };
  }
};

/**
 * Update Menu for a menuService
 * @param userId: string
 * @param menu: object
 */
menuService.updateMenu = async (userId, menu) => {
  try {
    const userMenuRef = db.menus(userId).child(menu.id);
    await userMenuRef.update(menu);
    const menuSnapshot = await userMenuRef.once('value');
    return { id: menuSnapshot.key, ...menuSnapshot.val() };
  } catch (error) {
    return { error };
  }
};

/**
 * Remove  menu
 * @param userId: string
 * @param menuId: string
 */
menuService.removeMenu = async (userId, menuId) => {
  try {
    const userMenuRef = db.menus(userId).child(menuId);
    return userMenuRef.remove();
  } catch (error) {
    return { error };
  }
};

/**
 * Create Get all menu in no particular order
 * @param userId: string
 */
menuService.getMenu = async (userId) => {
  try {
    const menus = [];
    const menusSnapshot = await db.menus(userId).once('value');
    menusSnapshot.forEach((childSnapshot) => {
      const id = childSnapshot.key;
      const { key } = childSnapshot;
      const data = childSnapshot.val();
      menus.push({ id, key, ...data });
    });
    return menus;
  } catch (error) {
    return { error };
  }
};

/**
 * Create Get menu by Id
 * @param userId: string
 * @param menuId: string
 */
menuService.getMenuById = async (userId, menuId) => {
  try {
    const menu = await db.menus(userId).child(menuId).once('value');
    return { id: menu.key, ...menu.val() };
  } catch (error) {
    return { error };
  }
};

export default menuService;
