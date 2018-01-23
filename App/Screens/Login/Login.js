import React, {Component} from 'react'
import {ScrollView, View, Image, TouchableOpacity, Alert, Text as TextField} from 'react-native'
import LoginScreenStyle from './Login.style'
import {Text, Icon as RNE_Icon} from 'react-native-elements'
import {Button, Form, Item, Input, Label, Icon} from 'native-base'
import {Images, Colors} from '../../Themes/index'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {SignUp} from '../index'
import {authActionCreators} from '../../Redux/Auth/AuthActions'
import {settingsActionCreators} from '../../Redux/Settings/SettingsActions'
import {LoadingSpinner} from '../../Components/index'
import authenticationService from '../../Services/authentication-service'
import ResetPassword from './ResetPassword'
import Modal from 'react-native-modal'
import SnackBar from 'react-native-snackbar-component';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSignUpScreen: false,
            checked: false,
            userLoginInfo: {'email': '', 'password': ''},
            resetPasswordEmail: '',
            showToast: false
        };
    }

    async componentDidMount() {
        try {
            const currentUser = await authenticationService.currentUser();
            const {navigation} = this.props;
            if (currentUser) {
                this.props.getUser(currentUser.uid)
            }

            if (currentUser && currentUser.type === "customer") {
                navigation.navigate('CustomerTab')
            } else if (currentUser && currentUser.type === "vendor") {
                navigation.navigate('VendorTab')
            }

        } catch (err) {
            Alert.alert('Error', err);
        }
    }
    handleResetPasswordEmail = (e) => {
      this.setState({resetPasswordEmail: e.toLowerCase()})
    }
    closeResetPasswordModal = () => {
      this.props.showResetPasswordModal(false)
    }
    openResetPasswordModal = () => {
      this.props.showResetPasswordModal(true)
    }
    isEmailValid = () => {
      let emailError = {}
      let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
      if (!this.state.resetPasswordEmail) {
        emailError = {errorText: 'Email is required'}
      } else if (emailFormat.test(this.state.resetPasswordEmail) === false) {
        emailError = {errorText: 'Email format is invalid'}
      }
      return emailError
    }
    sendResetPasswordLink = () => {
      const errors = this.isEmailValid()
      if (errors.errorText === undefined) {
        this.props.setResetPasswordError('')
        this.props.resetPassword(this.state.resetPasswordEmail)
        this.setState({showToast: true})
      } else {
        this.props.setResetPasswordError(errors.errorText)
      }
    }
    toggleSignUpPage = () => {
        this.setState({showSignUpScreen: !this.state.showSignUpScreen});
    };
    toggleCheckBox = () => {
        this.setState({checked: !this.state.checked})
    };
    getUserLoginInfo = (id, e) => {
        this.setState({userLoginInfo: Object.assign({}, this.state.userLoginInfo, {[id]: e})});
    };

    login = () => {
        let {email, password} = this.state.userLoginInfo;
        if (email && password) {
            this.props.signIn({email, password});
        } else {
            Alert.alert("", "Please enter your email and password",)
        }
    };

    render() {
        if (this.state.showSignUpScreen) {
            return <SignUp/>
        } else {
            return (
              <ScrollView style={LoginScreenStyle.container}>
                  <View style={LoginScreenStyle.centered}>
                      <Image source={Images.logo} style={LoginScreenStyle.logo}/>
                      <Image source={Images.mealerLogo} style={LoginScreenStyle.mealerLogo}/>
                  </View>
                  <View style={[LoginScreenStyle.section, {marginBottom: 5}]}>
                      <Form style={LoginScreenStyle.forgotPasswordView}>
                          <Item floatingLabel>
                              <Label style={{color: Colors.charcoal}}>Email</Label>
                              <Input autoCapitalize="none"
                                style={{color: Colors.charcoal}}
                                keyboardType="email-address"
                                onChangeText={(e) => this.getUserLoginInfo('email', e)}/>
                          </Item>
                          <Item floatingLabel>
                              <Label style={{color: Colors.charcoal}}>Password</Label>
                              <Input autoCapitalize="none"
                                style={{color: Colors.charcoal}}
                                keyboardType="email-address"
                                onChangeText={(e) => this.getUserLoginInfo('password', e)}
                                secureTextEntry={true}
                                password={true}/>
                          </Item>
                        <Button transparent style={{marginLeft: '4%'}} 
                          onPress={() => this.openResetPasswordModal()}>
                          <TextField> 
                            <Label style={LoginScreenStyle.forgotPasswordTextStyle}>
                              Forgot Password?
                            </Label> 
                          </TextField>
                        </Button>
                      </Form>
                      <LoadingSpinner show={this.props.auth.showActivityIndicator}/>
                      <Button block success
                            style={LoginScreenStyle.loginButton}
                            onPress={this.login}>
                        <Text style={{color: Colors.snow, fontSize: 16, fontWeight: "bold"}}>LOGIN</Text>
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
                      <SnackBar visible={this.state.showToast}
                        textMessage={'Your reset password email has been sent'}
                        bottom={0}
                        position='bottom' backgroundColor='#272A2F'/>
                  </View>                    
              </ScrollView>
            )
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            ...authActionCreators,
            ...settingsActionCreators
        },
        dispatch);
};
const mapStateToProps = state => ({auth: state.auth});
export default connect(mapStateToProps, mapDispatchToProps)(Login)