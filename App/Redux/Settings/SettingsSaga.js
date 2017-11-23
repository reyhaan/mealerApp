import {call} from 'redux-saga/effects'
import {Alert} from 'react-native';
import SettingsService from '../../Services/settings-service'

const settingsEffects = {};

settingsEffects.updateUserInfo = function* (userDetails){
    try{
        yield call(SettingsService.updateUserInfo, userDetails);
    } catch (error) {
        Alert.alert('Error', error.message,)
    } finally {

    }
};

export default settingsEffects;