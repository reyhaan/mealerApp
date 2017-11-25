import db from '../Config/database'
import {AsyncStorage, Alert} from 'react-native';

let SettingsService = {};

// Update user's details

/**
 * Update Order for a merchant
 * @param userId: string
 * @param order: object
 */
SettingsService.updateUserInfo = async (payload) => {
    try {
        const data = payload.data
        const userId = data.uid;
        const userInfo = data.userDetails;
        const userRef = db.user(userId);
        await userRef.update(userInfo);
        const userSnapshot = await userRef.once('value');
        const result = {uid: userSnapshot.key, ...userSnapshot.val()}
        return result;
    } catch (error) {
        return {error};
    }
};

// Fetch user's details
SettingsService.getUserInfo = () => {

};

export default SettingsService;