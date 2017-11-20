import {put, call} from 'redux-saga/effects'
import {NavigationActions} from 'react-navigation';
import {Alert} from 'react-native';
import {authActionCreators} from '../Auth/AuthActions';
import {settingsCreators } from './SettingsActions'
import SettingsService from '../../Services/settings-service'

const settingsEffects = {};

settingsEffects.updateUserInfo = function* (userDetails){
    try{
        yield call(SettingsService.updateUserInfo(userDetails));
    } catch (error) {
        Alert.alert('Error', error.message,)
    } finally {

    }
}

export default settingsEffects;