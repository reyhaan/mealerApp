import {takeLatest} from 'redux-saga/effects';
import menuEffects from './MenuEffects';


/******************************* ACTIONS *************************************/
export const menuActions = {
    FETCH_MENU : 'FETCH_MENU',
    FETCH_MENU_SUCCESSFUL : 'FETCH_MENU_SUCCESSFUL'
}

/******************************* ACTION CREATORS *************************************/
function createAction(type, data) {
    return {type, data};
}
export const menuCreators = {
    fetchMenuCreator: ()=>createAction(menuActions.FETCH_MENU),
    fetchMenuSuccessful: (data)=> createAction(menuActions.FETCH_MENU_SUCCESSFUL, data)
};

/******************************* SAGA WATCHERS & EFFECTS *************************************/
export const menuSagas = [
    takeLatest(menuActions.FETCH_MENU, menuEffects.getFoodMenu)
];