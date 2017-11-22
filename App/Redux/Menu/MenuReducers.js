import { menuActions } from './MenuActions';

const initialState = [];
export function menu(state=initialState, action){
    switch(action.type){
        case menuActions.FETCH_MENU_SUCCESSFUL:
            return action.data
        case menuActions.CREATE_MENU_SUCCESSFUL:
            return [...state, action.data ]
        default:
            return state
    }
}