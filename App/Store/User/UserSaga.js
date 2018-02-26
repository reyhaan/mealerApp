import { call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import SettingsService from '../../Services/settings-service';
import { userActionCreators } from './UserActions';
import authenticationService from '../../Services/authentication-service';
import { registerForPushNotification, unregister } from '../../Services/push-notification-service';
import imgService from '../../Services/image-service';
import { store } from '../../../App';

class UserSaga {
  * updateUser(action) {
    try {
      const { data } = action;
      const { currentUser, uid } = data;

      if (currentUser && currentUser.base64Img && uid) {
        data.currentUser.avatar = yield call(imgService.uploadBase64Image, uid, currentUser.base64Img);
      }
      if (currentUser && currentUser.base64Img) {
        delete currentUser.base64Img;
      }

      const updatedUserInfo = yield call(SettingsService.updateUser, uid, currentUser);
      yield call(authenticationService.saveUserToLocalStorage, updatedUserInfo);
      yield put(userActionCreators.setUser(updatedUserInfo));
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }

  * setUser(action) {
    try {
      const user = action.data;

      console.log('Saga');
      console.log(user);

      yield call(authenticationService.saveUserToLocalStorage, user);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }

  * registerForPushNotification(action) {
    const register = action.data;
    const currentUser = Object.assign({}, store.getState().user.currentUser);

    if (register) {
      try {
        currentUser.pushNotificationToken = yield call(registerForPushNotification);
        if (currentUser.pushNotificationToken) {
          yield put(userActionCreators.updateUser({ currentUser, uid: currentUser.uid }));
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    } else {
      try {
        yield call(unregister, currentUser);
        delete currentUser.pushNotificationToken;
        yield put(userActionCreators.updateUser({ currentUser, uid: currentUser.uid }));
      } catch (e) {
        Alert.alert('Error', e.message);
      }
    }
  }
}

export default new UserSaga();
