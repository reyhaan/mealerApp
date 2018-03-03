import React, { Component } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List, ListItem } from 'react-native-elements';
import SettingsTabStyle from './Account.style';
import { Colors } from '../../Themes/index';
import { authActionCreators } from '../../Store/Auth/AuthActions';
import { userActionCreators } from '../../Store/User/UserActions';
import ScreenHeader from '../../Components/ScreenHeader';

const styles = SettingsTabStyle;

class Settings extends Component {
  logout = () => {
    Alert.alert(
      'Are you sure you want to logout ?', '',
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => this.props.authActions.signOut() },
      ],
      { cancelable: false },
    );
  };

  navigateToOrderHistory = () => {
    this.props.navigation.navigate('OrderHistory');
  };
  registerForPushNotification = (register) => {
    const { userActions } = this.props;
    userActions.registerForPushNotification(register);
  };

  render() {
    const { currentUser } = this.props.user;
    let customerUser;
    if (currentUser) {
      customerUser = currentUser.type === 'customer';
    }

    return (
      <View style={styles.container}>
        <ScreenHeader title="Account" />
        <ScrollView style={styles.scrollContainer}>
          <List wrapperStyle={styles.listWrapper} containerStyle={styles.listContainer}>
            <ListItem
              onPress={() => {
                this.props.navigation.navigate('UserAccount', { page: 'User Account' });
              }}
              chevronColor={Colors.background}
              titleStyle={styles.listTitle}
              containerStyle={styles.listItem}
              leftIcon={{
                name: 'user-circle',
                type: 'font-awesome',
                style: { color: Colors.background, fontSize: 18 },
              }}
              title="User Account"
            />
            {customerUser &&
            <ListItem
              onPress={this.navigateToOrderHistory}
              chevronColor={Colors.background}
              titleStyle={styles.listTitle}
              containerStyle={styles.listItem}
              leftIcon={{
                name: 'history',
                type: 'font-awesome',
                style: { color: Colors.background, fontSize: 18 },
              }}
              title="Order History"
            />}
            {currentUser &&
            <ListItem
              titleStyle={styles.listTitle}
              containerStyle={styles.listItem}
              leftIcon={{
                name: 'bell',
                type: 'font-awesome',
                style: { color: Colors.background, fontSize: 18 },
              }}
              switched={Boolean(currentUser.pushNotificationToken)}
              hideChevron={true}
              switchButton={true}
              onSwitch={this.registerForPushNotification}
              switchOnTintColor={Colors.background}
              title="Receive Push Notifications"
            />
            }

            <ListItem
              onPress={this.logout}
              style={{ marginTop: 10 }}
              chevronColor={Colors.background}
              titleStyle={styles.listTitle}
              containerStyle={styles.listItem}
              leftIcon={{
                name: 'sign-out',
                type: 'font-awesome',
                style: { color: Colors.background, fontSize: 18 },
              }}
              title="Logout"
            />
          </List>
        </ScrollView>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActionCreators, dispatch),
  userActions: bindActionCreators(userActionCreators, dispatch),
});

const mapStateToProps = state => ({
  user: state.user,
});
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
