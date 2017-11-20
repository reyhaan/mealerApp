import { settingsActions } from './SettingsActions';

const initialState = [];
export function menu(state=initialState, action){
    switch(action.type){
        case settingsActions.UPDATE_USER_INFO:
            return Object.assign({}, state, {
                user: action.data,
            });
        default:
            return state
    }
}