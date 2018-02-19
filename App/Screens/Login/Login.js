import React, { Component } from 'react';
import { ScrollView, View, Image, TouchableOpacity, Alert, Text as TextField } from 'react-native';
import Modal from 'react-native-modal';
import { bindActionCreators } from 'redux';
import SnackBar from 'react-native-snackbar-component';
import { TextField as PasswordTextField } from 'react-native-material-textfield';
import { Text } from 'react-native-elements';
import { Button, Form, Label } from 'native-base';
import { connect } from 'react-redux';
import LoginScreenStyle from './Login.style';
import { Images, Colors } from '../../Themes/index';
import { authActionCreators } from '../../Store/Auth/AuthActions';
import { settingsActionCreators } from '../../Store/Settings/SettingsActions';
import { LoadingSpinner } from '../../Components/index';
import authenticationService from '../../Services/authentication-service';
import ResetPassword from './Components/ResetPassword';
import SignUp from '../SignUp/SignUp';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignUpScreen: false,
      userLoginInfo: { email: '', password: '' },
      resetPasswordEmail: '',
      showToast: false,
    };
  }

  async componentDidMount() {
    try {
      const currentUser = await authenticationService.currentUser();
      const { navigation } = this.props;
      if (currentUser) {
        this.props.getUser(currentUser.uid);
      }

      if (currentUser && currentUser.type === 'customer') {
        navigation.navigate('CustomerTab');
      } else if (currentUser && currentUser.type === 'vendor') {
        navigation.navigate('VendorTab');
      }
    } catch (err) {
      Alert.alert('Error', err);
    }
  }

  getUserLoginInfo = (id, e) => {
    this.setState({ userLoginInfo: Object.assign({}, this.state.userLoginInfo, { [id]: e }) });
  };
  toggleSignUpPage = () => {
    this.setState({ showSignUpScreen: !this.state.showSignUpScreen });
  };
  sendResetPasswordLink = () => {
    const errors = this.isEmailValid();
    if (errors.errorText === undefined) {
      this.props.authActions.setResetPasswordError('');
      this.props.authActions.resetPassword(this.state.resetPasswordEmail);
      this.setState({ showToast: true });
    } else {
      this.props.authActions.setResetPasswordError(errors.errorText);
    }
  };

  isEmailValid = () => {
    let emailError = {};
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!this.state.resetPasswordEmail) {
      emailError = { errorText: 'Email is required' };
    } else if (emailFormat.test(this.state.resetPasswordEmail) === false) {
      emailError = { errorText: 'Email format is invalid' };
    }
    return emailError;
  };

  openResetPasswordModal = () => {
    this.props.authActions.showResetPasswordModal(true);
  };

  closeResetPasswordModal = () => {
    this.props.authActions.showResetPasswordModal(false);
  };

  handleResetPasswordEmail = (e) => {
    this.setState({ resetPasswordEmail: e.toLowerCase() });
  };
  login = () => {
    const { email, password } = this.state.userLoginInfo;
    if (email && password) {
      this.props.authActions.signIn({ email, password });
    } else {
      Alert.alert('', 'Please enter your email and password');
    }
  };

  render() {
    if (this.state.showSignUpScreen) {
      return <SignUp/>;
    }
    return (
      <ScrollView style={LoginScreenStyle.container}>
        <View style={LoginScreenStyle.centered}>
          <Image source={Images.logo} style={LoginScreenStyle.logo}/>
          <Image source={Images.mealerLogo} style={LoginScreenStyle.mealerLogo}/>
        </View>
        <View style={[LoginScreenStyle.section, { marginBottom: 5 }]}>
          <Form style={LoginScreenStyle.forgotPasswordView}>
            <View style={{ marginLeft: 12 }}>
              <PasswordTextField
                keyboardType="email-address"
                value={this.state.userLoginInfo.email}
                autoCapitalize="none"
                autoCorrect={false}
                style={{ color: Colors.charcoal, fontSize: 14 }}
                enablesReturnKeyAutomatically
                onChangeText={e => this.getUserLoginInfo('email', e)}
                label="Email"
                tintColor={Colors.charcoal}
              />
            </View>
            <View style={{ marginLeft: 12 }}>
              <PasswordTextField
                value={this.state.userLoginInfo.password}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                style={{ color: Colors.charcoal, fontSize: 14 }}
                enablesReturnKeyAutomatically
                clearTextOnFocus
                onChangeText={e => this.getUserLoginInfo('password', e)}
                label="Password"
                tintColor={Colors.charcoal}
              />
            </View>
            <Button
              transparent
              style={{ marginLeft: '4%' }}
              onPress={() => this.openResetPasswordModal()}
            >
              <TextField>
                <Label style={LoginScreenStyle.forgotPasswordTextStyle}>
                  Forgot Password?
                </Label>
              </TextField>
            </Button>
          </Form>
          <LoadingSpinner show={this.props.auth.showActivityIndicator}/>
          <Button
            block
            success
            style={LoginScreenStyle.loginButton}
            onPress={this.login}
          >
            <Text style={{ color: Colors.snow, fontSize: 16, fontWeight: 'bold' }}>LOGIN</Text>
          </Button>
          <View style={[LoginScreenStyle.signUpView]}>
            <Text style={LoginScreenStyle.registerButton}> Not Registered?</Text>
            <TouchableOpacity onPress={() => this.toggleSignUpPage()}>
              <Text h5 style={LoginScreenStyle.signUpButton}>SIGN UP!</Text>
            </TouchableOpacity>
          </View>
          <Modal isVisible={this.props.auth.showResetPasswordModal}>
            <ResetPassword
              closeResetPasswordModal={this.closeResetPasswordModal}
              sendResetPasswordLink={this.sendResetPasswordLink}
              handleResetPasswordEmail={this.handleResetPasswordEmail}
              auth={this.props.auth}
            />
          </Modal>
          <SnackBar
            visible={this.state.showToast}
            textMessage="Your reset password email has been sent"
            bottom={0}
            position="bottom"
            backgroundColor="#272A2F"
          />
        </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActionCreators, dispatch),
  settingsActions: bindActionCreators(settingsActionCreators, dispatch),
});
const mapStateToProps = state => ({
  auth: state.auth,
  settings: state.settings,
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
