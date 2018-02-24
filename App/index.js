import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ReactNavigation from 'react-navigation';
import { View } from 'react-native';
import { Colors } from './Themes/index';
import Navigation from './Navigation/Navigation';
import { authActionCreators } from './Store/Auth/AuthActions';

const mapDispatchToProps = dispatch => ({
  dispatch,
  authActions: bindActionCreators(authActionCreators, dispatch),
});

const mapStateToProps = state => ({
  nav: state.navigation,
});

class App extends Component {
  componentWillMount() {
    this.props.authActions.initializeAppWithCurrentUser(); // !important to initialize app
  }

  render() {
    const { dispatch, nav } = this.props;
    const navigation = ReactNavigation.addNavigationHelpers({ dispatch, state: nav });

    return (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <Navigation navigation={navigation} />
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);