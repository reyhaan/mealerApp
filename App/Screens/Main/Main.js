import React, {Component} from 'react'
import {Alert, View} from 'react-native'
import {Colors} from '../../Themes/index'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {settingsActionCreators} from '../../Redux/Settings/SettingsActions'
import authenticationService from '../../Services/authentication-service'

class AppEntry extends Component {

    async componentDidMount() {
        try {
            const currentUser = await authenticationService.currentUser();
            const {navigation} = this.props;

            if (currentUser) {
                this.props.settingsActions.getUser(currentUser.uid)
            }

            if (currentUser && currentUser.type === "customer") {
                navigation.navigate('CustomerTab')
            }
            else if (currentUser && currentUser.type === "vendor") {
                navigation.navigate('VendorTab')
            }
            else {
                navigation.navigate('Login')
            }

        } catch (err) {
            Alert.alert('Error', err);
        }
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: Colors.white}}/>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        settingsActions: bindActionCreators(settingsActionCreators, dispatch)
    }
};

const mapStateToProps = state => ({});
export default connect(mapStateToProps, mapDispatchToProps)(AppEntry)