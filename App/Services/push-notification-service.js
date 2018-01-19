import { Permissions, Notifications, Constants } from 'expo';
import authentication from './authentication-service';
import settingsService from './settings-service';
import DeviceInfo from 'react-native-device-info'

// console.log(Constants.isDevice) // => false if simulator

export const registerForPushNotification =  async () => {

    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
        return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    if (token){
        const user = await authentication.currentUser();
        user.pushNotificationToken = token;
        await settingsService.updateUserInfo(user.uid, user);
    }
};