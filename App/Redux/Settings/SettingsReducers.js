import { settingsActions } from './SettingsActions';

const initialState = [];
export function settings(state=initialState, action){
    switch(action.type){
        case settingsActions.UPDATE_USER_INFO:
            return Object.assign({}, state, {
                user: action.data,
            });
        case settingsActions.SET_CURRENT_USER:
            // console.log("at saga>>>>>>>>>>>>>>>>>>>>>>>>", action.data)
            return Object.assign({}, state, {
                user: action.data 
            })
        default:
            return state 
    }
}