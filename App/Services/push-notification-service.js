import { Permissions, Notifications } from 'expo';
import { Alert, Platform } from 'react-native';
import axios from 'axios';
import db from '../Config/database';
import authService from './authentication-service';
import { vendorActionCreators } from '../Store/Vendor/VendorActions';
import { orderActionCreators } from '../Store/Order/OrderActions';

export const registerForPushNotification = async () => {
  // return "test push";

  const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
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

  /* eslint-disable consistent-return */
  // Get the token that uniquely identifies this device
  const token = await Notifications.getExpoPushTokenAsync();
  return token;
  /* eslint-enable global-require */
};

export const sendPush = async (data) => {
  try {
    await axios({
      method: 'post',
      url: 'https://exp.host/--/api/v2/push/send',
      headers: {
        accept: 'application/json',
        'accept-encoding': 'gzip, deflate',
        'content-type': 'application/json',
      },
      data,
    });
  } catch (error) {
    console.log(error.response.data);
    Alert.alert('Error', error.response.data);
  }
};

export const unregister = async (user) => {
  try {
    await db.user(user.uid).child('pushNotificationToken').remove();
  } catch (error) {
    Alert.alert('Error', error);
  }
};

export const clearBadgeCount = async () => {
  if (Platform.OS === 'android') {
    await Notifications.dismissAllNotificationsAsync();
  } else if (Platform.OS === 'ios') {
    await Notifications.setBadgeNumberAsync(0);
  }
};

export const handleReceivedNotification = async (notification, dispatch) => {
  const { data } = notification;
  if (Platform.OS === 'ios' && notification.origin === 'received') {
    const iosBadgeCount = await Notifications.getBadgeNumberAsync();
    await Notifications.setBadgeNumberAsync(iosBadgeCount + 1);
  }

  // Clear badge count immediately if the user is a customer
  const currentUser = await authService.currentUser();
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
    Alert.alert(`Order to ${data.vendorName} updated`, message);
    dispatch(orderActionCreators.getOrders());
  }
};
