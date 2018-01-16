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
import ResetPassword from './Login'
import Modal from 'react-native-modal'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSignUpScreen: false,
            checked: false,
            userLoginInfo: {'email': '', 'password': ''},
            showResetPasswordModal: false,
            resetPasswordEmail: ''
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
    closeResetPasswordModal = () => {
      this.setState({showResetPasswordModal: false})
    }
    openResetPasswordModal = () => {
      this.setState({showResetPasswordModal: true})
    }
    isEmailValid = (email) => {
      let emailError = {}
      if(email){
        // check if email is in the db and send reset password
      }
      else {
        emailError = {errorText: 'Email is required'}
      }
      return emailError
    }
    sendResetPasswordLink = () => {
      this.props.resetPassword(this.state.resetPasswordEmail)
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
                      <Modal isVisible={this.state.showResetPasswordModal}>
                        <View style={{ display: 'flex', backgroundColor: 'white',
                        height: 300, width: '90%', borderRadius: 8, borderStyle: 'solid',
                        borderWidth: 4, borderColor: 'white',  alignSelf: 'center', paddingRight: 10,
                        paddingLeft: 10}}>
                          <Form style={LoginScreenStyle.forgotPasswordView}>
                          <View style={{alignSelf: 'flex-end'}}>
                            <RNE_Icon
                              raised
                              name='times'
                              type='font-awesome'
                              color={Colors.bloodOrange}
                              onPress={() => this.closeResetPasswordModal()} />
                          </View>
                            <Label style={{color: Colors.charcoal, marginBottom: 10}}>
                              Enter your email address and we'll send you a link to reset your password.
                            </Label>
                            <Item rounded>
                              <Input autoCapitalize="none"
                                placeholder="Enter email"
                                style={{color: Colors.charcoal}}
                                keyboardType="email-address"
                                onChangeText={(e) => { console.log('e', e)
                                  this.setState({resetPasswordEmail: e})}}/>
                              <Icon active name='mail' style={{color: Colors.bloodOrange}}/>
                            </Item>
                            { this.isEmailValid() && this.isEmailValid().errorText && 
                            <Label style={{color: 'red', marginBottom: 10, fontSize: 14}}> 
                              {'*' + this.isEmailValid().errorText} 
                            </Label>}
                            <Button block success
                              style={{margin: 15}}
                              onPress={this.sendResetPasswordLink}>
                              <Text style={{color: Colors.snow, fontSize: 16, fontWeight: "bold"}}>SEND LINK</Text>
                            </Button>
                          </Form>
                        </View>
                      </Modal>
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