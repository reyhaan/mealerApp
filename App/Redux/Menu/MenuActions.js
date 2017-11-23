import {takeLatest} from 'redux-saga/effects';
import MenuSaga from './MenuSaga';


/******************************* ACTIONS *************************************/
export const menuActions = {
    FETCH_MENU : 'FETCH_MENU',
    FETCH_MENU_SUCCESSFUL : 'FETCH_MENU_SUCCESSFUL',
    CREATE_MENU : "CREATE_MENU",
    CREATE_MENU_SUCCESSFUL : "CREATE_MENU_SUCCESSFUL",
    CREATE_MENU_FAILURE: "CREATE_MENU_FAILURE"
};

/******************************* ACTION CREATORS *************************************/
function createAction(type, data) {
    return {type, data};
}
export const menuCreators = {
    fetchMenuCreator: ()=> createAction(menuActions.FETCH_MENU),
    fetchMenuSuccessful: (data)=> createAction(menuActions.FETCH_MENU_SUCCESSFUL, data),
    createMenu: (data)=> createAction(menuActions.CREATE_MENU, data),
    createMenuSuccessful: (data)=> createAction(menuActions.CREATE_MENU_SUCCESSFUL, data),
    createMenuFailure: (error) => createAction(menuActions.CREATE_MENU_FAILURE, error)
};

/******************************* SAGA WATCHERS *************************************/
export const menuActionWatchers = [
    takeLatest(menuActions.FETCH_MENU, MenuSaga.getFoodMenu),
    takeLatest(menuActions.CREATE_MENU, MenuSaga.createFoodMenu)
];