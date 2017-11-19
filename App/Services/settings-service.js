import db from '../Config/database'
import {AsyncStorage, Alert} from 'react-native';

let SettingsService = {};

// Update user's details
SettingsService.updateUserInfo = (userId) => {
    let menu = {
        something: "cool",
        key: "value"
    }
    let userRef = db.user(userId+"/");
    return userRef.set(menu);
};

// Fetch user's details
SettingsService.getUserInfo = () => {

};

export default SettingsService;