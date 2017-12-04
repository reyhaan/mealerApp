import db from '../Config/database'
import {AsyncStorage} from 'react-native';

let cartService = {};

// Get the current signed in user information
cartService.getCart = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem("cart").then((value) => {
            resolve(JSON.parse(value));
        }).catch(error =>{
            reject (error);
        })
    });
};

export default cartService;
