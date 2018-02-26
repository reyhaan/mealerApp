import { takeLatest } from 'redux-saga/effects';
import NavigationSaga from './NavigationSaga';

/** ***************************** ACTIONS ************************************ */
export const NavigationActions = {
  NAVIGATE: 'Navigation/NAVIGATE',
};

/** ***************************** ACTION WATCHERS ************************************ */
export const navigationActionWatchers = [
  takeLatest(NavigationActions.NAVIGATE, NavigationSaga.updateAppState),
];
