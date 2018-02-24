import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createStore from './App/Store';
import AppScreens from './App/Screens';

// Export store
export const store = createStore();

// Export App
export default class Index extends Component {
  constructor() {
    super();
    // walk around for firebase timer RN warnings
    console.ignoredYellowBox = [
      'Setting a timer',
    ];
  }

  render() {
    return <Provider store={store}><AppScreens /></Provider>;
  }
}
