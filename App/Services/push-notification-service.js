import {Permissions, Notifications} from 'expo';
import authentication from './authentication-service';
import settingsService from './settings-service';
import authService from './authentication-service';
import {vendorActionCreators} from '../Actions/VendorActions';
import {orderActionCreators} from '../Actions/OrderActions';
import {Alert, Platform} from 'react-native';
import axios from 'axios';
import DeviceInfo from 'react-native-device-info'

// console.log(Constants.isDevice) // => false if simulator

export const registerForPushNotification = async () => {
    const {status: existingStatus} = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
        return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    if (token) {
        const user = await authentication.currentUser();
        user.pushNotificationToken = token;
        await settingsService.updateUserInfo(user.uid, user);
    }
};

export const sendPush = async (data) => {
    try {
        await axios({
            method: 'post',
            url: 'https://exp.host/--/api/v2/push/send',
            headers: {
                'accept': 'application/json',
                'accept-encoding': 'gzip, deflate',
                'content-type': 'application/json',
            },
            data: data
        });
    }
    catch (error) {
        console.log(error.response.data);
        Alert.alert('Error', error.response.data);
    }
};


export const handleReceivedNotification = async (notification, dispatch) => {
    const {data} = notification;
    if (Platform.OS === 'ios' && notification.origin === 'received') {
        let iosBadgeCount = await Notifications.getBadgeNumberAsync();
        await Notifications.setBadgeNumberAsync(iosBadgeCount + 1);
    }

    // Clear badge count immediately if the user is a customer
    let currentUser = await authService.currentUser();
    if (currentUser.type === 'customer' && notification.origin === 'selected') {
        await clearBadgeCount();
    }

    // Vendor received  customer order
    if (data.orderToVendor) {
        let message = null;
        if (data.customerName) {
            message = data.customerName;
        }
        Alert.alert('New Order received', message);
        dispatch(vendorActionCreators.fetchVendorOrders());
        await clearBadgeCount();
    }

    // Customer received  vendor order update
    if (data.customerOrderStatusUpdate) {
        let message = null;
        if (data.vendorName) {
            message = data.orderStatus;
        }
        Alert.alert('Order to ' + data.vendorName + ' updated', message);
        dispatch(orderActionCreators.getOrders())
    }
};

export const clearBadgeCount = async () => {
    if (Platform.OS === 'android') {
        await Notifications.dismissAllNotificationsAsync();
    }
    else if (Platform.OS === 'ios') {
        await Notifications.setBadgeNumberAsync(0);
    }
};