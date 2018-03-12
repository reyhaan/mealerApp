import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import auth from './Auth/AuthReducers';
import navigation from './Navigation/NavigationReducer';
import request from './Request/RequestReducers';
import user from './User/UserReducers';
import vendor, { vendors } from './Vendor/VendorReducers';
import cart from './Cart/CartReducers';
import orderHistory from './Order/OrderReducers';
import { vendorActionWatchers } from '../Store/Vendor/VendorActions';
import { authActionWatchers } from '../Store/Auth/AuthActions';
import { settingsActionWatchers } from './User/UserActions';
import { cartActionWatchers } from '../Store/Cart/CartActions';
import { orderActionWatchers } from '../Store/Order/OrderActions';
import { navigationActionWatchers } from '../Store/Navigation/NavigationActions';

// Sagas
const sagas = function* root() {
  yield all([
    ...authActionWatchers,
    ...vendorActionWatchers,
    ...settingsActionWatchers,
    ...cartActionWatchers,
    ...orderActionWatchers,
    ...navigationActionWatchers,
  ]);
};

// Reducers
const reducers = combineReducers({
  auth,
  navigation,
  user,
  vendor,
  vendors,
  cart,
  orderHistory,
  request,
});

export default () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(sagaMiddleware),
  );
  sagaMiddleware.run(sagas);
  return store;
};
