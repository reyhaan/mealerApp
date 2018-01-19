import React, {Component} from 'react'
import {Colors} from '../../Themes/index'
import {Font} from 'expo';
import {View, Alert} from 'react-native'
import Navigation from '../../Navigation/Navigation'
import {connect} from 'react-redux'
import * as ReactNavigation from 'react-navigation'
import {authActionCreators} from '../../Redux/Auth/AuthActions';
import {bindActionCreators} from 'redux'

class App extends Component {
    state = {
        fontLoaded: false,
    };

    async componentDidMount() {
        try {
            this.props.authActions.getCurrentUser(); // !important to initialize app

            await Font.loadAsync({
                'proximanova-regular': require('../../Assets/Fonts/ProximaNova-Regular.ttf'),
                'proximanova-bold': require('../../Assets/Fonts/ProximaNova-Bold.ttf'),
                'Roboto_medium': require('../../Assets/Fonts/Roboto-Medium.ttf')
            });
            this.setState({
                fontLoaded: true,
            });
        } catch (err) {
            Alert.alert('Error', err);
        }
    }

    render() {
        const {dispatch, nav} = this.props;
        const navigation = ReactNavigation.addNavigationHelpers({dispatch, state: nav});
        if (this.state.fontLoaded) {
            return (
                <View style={{flex: 1, backgroundColor: Colors.white}}>
                    <Navigation navigation={navigation}/>
                </View>
            )
        }
        else {
            return null;
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        authActions: bindActionCreators(authActionCreators, dispatch)
    }
};
const mapStateToProps = state => ({
    nav: state.navigation,
});
export default connect(mapStateToProps, mapDispatchToProps)(App)
