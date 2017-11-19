import database from '../Config/database';

let merchant = {};

merchant.createMenu = (userId, menu) => {
    let userMenuRef = database.user(userId + '/menu');
    return userMenuRef.push().set(menu);
};

merchant.removeMenu = (userId, menuId) => {
    let userMenuRef = database.user(userId + '/menu/' + menuId);
    return userMenuRef.remove();
};

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

export default merchant;
