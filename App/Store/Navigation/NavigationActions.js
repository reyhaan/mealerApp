import { takeLatest } from 'redux-saga/effects';
import NavigationSaga from './NavigationSaga';

/** ***************************** ACTIONS ************************************ */
export const NavigationActions = {
  NAVIGATE: 'Navigation/NAVIGATE',
};

/** ***************************** ACTION WATCHERS ************************************ */
const navigationSaga = new NavigationSaga();
export const navigationActionWatchers = [
  takeLatest(NavigationActions.NAVIGATE, navigationSaga.updateAppState),
];
