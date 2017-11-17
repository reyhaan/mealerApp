import firebase from '../Config/database';
import testData from './test-data-service';

let merchant = {};

//Todo: integrate firebase query
merchant.getMenu = () => {
    return new Promise((resolve) => {
        resolve(testData.merchantUser.menu);
    })
};

export default merchant;
