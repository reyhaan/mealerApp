import database from '../Config/database';
import testData from './test-data-service';

let merchant = {};

merchant.createMenu = (userId, menu) => {
    let userMenuRef = database.user(userId + '/menu');
    let newMenuRef = userMenuRef.push();

    return newMenuRef.set(menu);
};

merchant.getMenu = () => {
    return new Promise((resolve) => {
        resolve(testData.merchantUser.menu);
    })
};

export default merchant;
