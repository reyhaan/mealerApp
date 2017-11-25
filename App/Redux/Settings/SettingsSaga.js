import {call, put} from 'redux-saga/effects'
import {Alert} from 'react-native';
import SettingsService from '../../Services/settings-service'
import { settingsActionCreators } from './SettingsActions'

const settingsEffects = {}; 

settingsEffects.updateUserInfo = function* (userDetails){
    try{
        const newUser = yield call(SettingsService.updateUserInfo, userDetails);
        yield put(settingsActionCreators.setUser(newUser));
    } catch (error) {
        Alert.alert('Error', error.message,)
    } finally {

    }
};

export default settingsEffects;