import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Font, AppLoading } from 'expo';
import { Alert } from 'react-native';
import createStore from './App/Store';
import App from './App/index';

// Export store
export const store = createStore();

// Export App
export default class MealerApp extends Component {
  constructor() {
    super();
    // walk around for firebase timer RN warnings
    console.ignoredYellowBox = [
      'Setting a timer',
    ];

    this.state = {
      fontLoaded: false,
    };
  }

  async componentWillMount() {
    try {
      /* eslint-disable global-require */
      await Font.loadAsync({
        'proximanova-regular': require('./App/Assets/Fonts/ProximaNova-Regular.ttf'),
        'proximanova-bold': require('./App/Assets/Fonts/ProximaNova-Bold.ttf'),
        'Roboto_ medium': require('./App/Assets/Fonts/Roboto-Medium.ttf'),
      });
      /* eslint-enable global-require */

      this.setState({
        fontLoaded: true,
      });
    }
    catch (e) {
      Alert.alert('Error', e);
    }

  }

  render() {
    if (this.state.fontLoaded) {
      return <Provider store={store}><App/></Provider>;
    } else {
      return <AppLoading/>;
    }
  }
}
