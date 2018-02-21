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

  * getUser() {
    try {
      let currentUser = yield call(authenticationService.currentUser);
      currentUser = yield call(authenticationService.fetchUser, currentUser.uid);
      yield put(userActionCreators.setUser(currentUser));
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }

  * registerForPushNotification(action) {
    const register = action.data;

    let user = yield call(authenticationService.currentUser);
    user = yield call(authenticationService.fetchUser, user.uid);

    if (register) {
      try {
        yield call(registerForPushNotification);
        const currentUser = yield call(authenticationService.fetchUser, user.uid);
        yield put(userActionCreators.setUser(currentUser));
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    } else {
      try {
        user.pushNotificationToken = undefined;
        yield put(userActionCreators.updateUserInfo({ currentUser: user, uid: user.uid }));
      } catch (e) {
        Alert.alert('Error', e.message);
      }
    }
  }
}
