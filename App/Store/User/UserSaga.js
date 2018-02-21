import { call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import SettingsService from '../../Services/settings-service';
import { userActionCreators } from './UserActions';
import authenticationService from '../../Services/authentication-service';
import { registerForPushNotification } from '../../Services/push-notification-service';
import imgService from '../../Services/image-service';

export default class UserSaga {
  * updateUserInfo(action) {
    try {
      const { data } = action;
      const { currentUser, uid } = data;

      console.log(currentUser);

      if (currentUser && currentUser.base64Img && uid) {
        data.currentUser.avatar = yield call(imgService.uploadBase64Image, uid, currentUser.base64Img);
      }

      if (currentUser && currentUser.base64Img) {
        delete currentUser.base64Img;
      }
      const updatedUserInfo = yield call(SettingsService.updateUserInfo, uid, currentUser);
      yield put(userActionCreators.setUser(updatedUserInfo));
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }

  * getUser(data) {
    try {
      const currentUser = yield call(authenticationService.fetchUser, data.data.id);
      yield put(userActionCreators.setUser(currentUser));
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }

  * registerForPushNotification(action) {
    const register = action.data;
    if (register) {
      try {
        yield call(registerForPushNotification);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    }
  }
}
