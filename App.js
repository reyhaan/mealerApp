import React, {Component} from 'react'
import {Provider} from 'react-redux'
import createStore from './App/Redux/createStore'
import {Colors} from './App/Themes/index'
import {Font} from 'expo';
import {View, Alert} from 'react-native'
import Navigation from './App/Navigation/Navigation'
import {connect} from 'react-redux'
import * as ReactNavigation from 'react-navigation'
import {authActionCreators} from './App/Redux/Auth/AuthActions';
import {bindActionCreators} from 'redux'

class Container extends Component {
    state = {
        fontLoaded: false,
    };

    async componentDidMount() {
        try {
            this.props.authActions.getCurrentUser(); // !important to initialize app

            await Font.loadAsync({
                'proximanova-regular': require('./App/Assets/Fonts/ProximaNova-Regular.ttf'),
                'proximanova-bold': require('./App/Assets/Fonts/ProximaNova-Bold.ttf'),
                'Roboto_medium': require('./App/Assets/Fonts/Roboto-Medium.ttf')
            });
            await this.setState({
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

const App = connect(mapStateToProps, mapDispatchToProps)(Container);


class Index extends Component {
    constructor() {
        super();
        // walk around for firebase timer RN warnings
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
    }

    render() {
        return <Provider store={createStore()}><App/></Provider>;
    }
}

export default Index
