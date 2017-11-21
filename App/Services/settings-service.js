import db from '../Config/database'
import {AsyncStorage, Alert} from 'react-native';

let SettingsService = {};

// Update user's details
SettingsService.updateUserInfo = (payload) => {
    let data = payload.data
    let userId = data.uid;
    let userRef = db.user(userId+"/");
    return userRef.update(data);
};

// Fetch user's details
SettingsService.getUserInfo = () => {

};

export default SettingsService;