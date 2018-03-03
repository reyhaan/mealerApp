import { call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
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
      yield call(authenticationService.updateUser, uid, currentUser);
      const userId = yield call(authenticationService.currentUser);
      const updatedUserInfo = yield call(authenticationService.fetchUser, userId);
      yield put(userActionCreators.setUser(updatedUserInfo));
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
