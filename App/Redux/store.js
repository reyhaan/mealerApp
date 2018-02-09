import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'
import {combineReducers} from 'redux';
import auth from './Auth/AuthReducers';
import navigation from './Navigation/NavigationReducer';
import request from './Request/RequestReducers';
import settings  from './Settings/SettingsReducers';
import vendor  from './Vendor/VendorReducers';
import cart  from './Cart/CartReducers';
import order from './Order/OrderReducers';

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