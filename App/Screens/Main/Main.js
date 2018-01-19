import React, {Component} from 'react'
import {Alert, View} from 'react-native'
import {Notifications} from 'expo';
import {Colors} from '../../Themes/index'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {settingsActionCreators} from '../../Redux/Settings/SettingsActions'
import {registerForPushNotification} from '../../Services/push-notification-service'

class AppEntry extends Component {

    componentDidMount() {
        try {
            const {navigation} = this.props;
            const {user} = this.props.settings;

            if (user) {
                if (user.type === "customer") {
                    navigation.navigate('CustomerTab')
                }
                else if (user.type === "vendor") {
                    navigation.navigate('VendorTab')
                }

                registerForPushNotification();
                Notifications.addListener(this.handleNotification);
            }
            else {
                navigation.navigate('Login')
            }
        } catch (err) {
            Alert.alert('Error', err);
        }
    }

    handleNotification = (notification) => {
        Alert.alert('Error', JSON.stringify(notification));
    };

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
const mapStateToProps = state => ({
    settings: state.settings,
});
export default connect(mapStateToProps, mapDispatchToProps)(AppEntry)