import db from '../Config/database';

const SettingsService = {};

// Update user's details

/**
 * Update Order for a vendor
 * @param userId: string
 * @param userInfo: object
 */
SettingsService.updateUserInfo = async (userId, userInfo) => {
  try {
    const userRef = db.user(userId);
    await userRef.update(userInfo);
    /*
    const userSnapshot = await userRef.once('value');
    const updatedUser = { uid: userSnapshot.key, ...userSnapshot.val() };
    */
    return userInfo;
  } catch (error) {
    return { error };
  }
};

// Fetch user's details
SettingsService.getUserInfo = () => {

};

export default SettingsService;
