function createAction(type, data) {
  return { type, data };
}

/** ***************************** ACTIONS ************************************ */
export const requestActions = {
  showLoadingSpinner: 'showLoadingSpinner',
};

/** ***************************** ACTION CREATORS ************************************ */
export const requestActionCreators = {
  showLoadingSpinner: data => createAction(requestActions.showLoadingSpinner, data),
};
