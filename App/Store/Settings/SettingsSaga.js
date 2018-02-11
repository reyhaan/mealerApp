import {call, put} from 'redux-saga/effects'
import {Alert} from 'react-native';
import SettingsService from '../../Services/settings-service'
import {settingsActionCreators} from './SettingsActions'
import authenticationService from '../../Services/authentication-service'
import imgService from '../../Services/image-service'

export default class SettingsSaga {
    * updateUserInfo (action) {
        try {
            let {data} = action;
            if (data.user.base64Img && data.uid) {
                data.user.avatar = yield call(imgService.uploadBase64Image, data.uid, data.user.base64Img);
            }
            delete data.user.base64Img;
            const newUser = yield call(SettingsService.updateUserInfo,data.uid, data.user);
            yield put(settingsActionCreators.setUser(newUser));
        } catch (error) {
            Alert.alert('Error', error.message)
        }
    }

    * getUser (data) {
        try {
            const currentUser = yield call(authenticationService.fetchUser, data.data.id);
            yield put(settingsActionCreators.setUser(currentUser))
        }
        catch (error) {
            Alert.alert('Error', error.message)
        }
    }
}
