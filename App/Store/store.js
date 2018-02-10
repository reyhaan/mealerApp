import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../Sagas/index'
import {combineReducers} from 'redux';
import auth from '../Reducers/AuthReducers';
import navigation from '../Reducers/NavigationReducer';
import request from '../Reducers/RequestReducers';
import settings  from '../Reducers/SettingsReducers';
import vendor  from '../Reducers/VendorReducers';
import cart  from '../Reducers/CartReducers';
import order from '../Reducers/OrderReducers';

const reducers = combineReducers({
    auth,
    navigation,
    settings,
    vendor,
    cart,
    order,
    request
});

export default () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        reducers,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(sagaMiddleware));
    sagaMiddleware.run(rootSaga);
    return store;
}