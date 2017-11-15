import { menuActions } from './MenuActions';

const initialState = [];
export function menu(state=initialState, action){
    switch(action.type){
        case menuActions.FETCH_MENU_SUCCESSFUL:
            return  action.data
        default:
            return state
    }
}