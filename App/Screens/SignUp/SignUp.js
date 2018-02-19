import React, { Component } from 'react';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextField as PasswordTextField } from 'react-native-material-textfield';
import { Form, Button, Content, CheckBox } from 'native-base';
import { ScrollView, View, Image, Alert, Text, TouchableOpacity } from 'react-native';
import { Images, Fonts, Colors } from '../../Themes/index';
import SignUpScreenStyle from './SignUp.style';
import { authActionCreators } from '../../Store/Auth/AuthActions';
import LoadingSpinner from '../../Components/LoadingSpinner';
import AgreementModal from './Components/AgreementModal';
import Login from '../Login/Login';

class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    type: 'customer',
    agreeToTermsAndConditions: false,
    isAgreementModalOpen: false,
  };

  toggleLoginScreen = () => {
    this.setState({ showLoginScreen: !this.state.showLoginScreen });
  };

  formUpdate = (input, value) => {
    this.setState({
      [input]: value,
    });
  };

  toggleUserType = (value) => {
    if (value === 'customer') {
      this.setState({
        type: value,
      });
    } else {
      this.setState({
        type: value,
      });
    }
  };

  signUp = () => {
    const {
      email, password, name, type, agreeToTermsAndConditions,
    } = this.state;
    if (email && password && name && type && agreeToTermsAndConditions) {
      this.props.signUp({
        name, email, password, type, agreeToTermsAndConditions,
      });
    } else if (this.state.agreeToTermsAndConditions) {
      Alert.alert('', 'Enter your name, email & password');
    } else {
      Alert.alert('', 'Enter your name, email & password \n Agree to terms and condition');
    }
  };

  toggleTermsAndConditionsAgreement = () => {
    this.setState({ agreeToTermsAndConditions: !this.state.agreeToTermsAndConditions });
  };

  openAgreementModal = () => {
    this.setState({ isAgreementModalOpen: true });
  };

  closeAgreementModal = () => {
    this.setState({ isAgreementModalOpen: false });
  };

  // TODO: Add form validation for email and password
  render() {
    if (this.state.showLoginScreen) {
      return <Login />;
    }
    return (
      <ScrollView style={SignUpScreenStyle.container}>
        <View style={SignUpScreenStyle.centered}>
          <Image source={Images.logo} style={SignUpScreenStyle.logo} />
          <Image source={Images.mealerLogo} style={SignUpScreenStyle.mealerLogo} />
        </View>

        <View style={[SignUpScreenStyle.formContainer]}>
          <Form style={SignUpScreenStyle.forgotPasswordView}>
            <View style={{ marginLeft: 12 }}>
              <PasswordTextField
                value={this.state.name}
                autoCapitalize="none"
                autoCorrect={false}
                style={{ color: Colors.charcoal, fontSize: 14 }}
                enablesReturnKeyAutomatically
                onChangeText={e => this.formUpdate('name', e)}
                label="Name"
                tintColor={Colors.charcoal}
              />
            </View>
            <View style={{ marginLeft: 12 }}>
              <PasswordTextField
                value={this.state.email}
                autoCapitalize="none"
                autoCorrect={false}
                style={{ color: Colors.charcoal, fontSize: 14 }}
                enablesReturnKeyAutomatically
                onChangeText={e => this.formUpdate('email', e)}
                label="Email"
                tintColor={Colors.charcoal}
              />
            </View>
            <View style={{ marginLeft: 12 }}>
              <PasswordTextField
                value={this.state.password}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                style={{ color: Colors.charcoal, fontSize: 14 }}
                enablesReturnKeyAutomatically
                clearTextOnFocus
                onChangeText={e => this.formUpdate('password', e)}
                label="Password"
                tintColor={Colors.charcoal}
              />
            </View>
            <View style={{
              marginLeft: 12,
              marginTop: 10,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}
            >
              <CheckBox
                checked={this.state.agreeToTermsAndConditions}
                color={Colors.bloodOrange}
                onPress={() => this.toggleTermsAndConditionsAgreement()}
              />
              <TouchableOpacity
                onPress={() => this.openAgreementModal()}
                style={{ marginLeft: 15 }}
              >
                <Text
                  style={{ textDecorationLine: 'underline', color: Colors.charcoal }}
                >
                  I agree to Terms and Conditions
                </Text>
              </TouchableOpacity>
            </View>
          </Form>
          {this.state.isAgreementModalOpen &&
          AgreementModal(this.state.isAgreementModalOpen, this.closeAgreementModal)
          }
          <Content style={{ marginLeft: 15, marginTop: 0 }}>

            <TouchableOpacity onPress={() => this.toggleUserType('customer')}>
              <View style={{
                padding: 10,
                backgroundColor: this.state.type === 'customer' ? Colors.background : '#F5F5F5',
                flex: 1,
                flexDirection: 'row',
                borderRadius: 3,
              }}
              >
                <Text style={{
                  color: this.state.type === 'customer' ? Colors.snow : Colors.gray,
                  fontWeight: 'bold',
                  flex: 1,
                }}
                >AS A CUSTOMER
                </Text>
                <View style={{ width: 40, height: 20, alignItems: 'flex-end' }}>
                  {this.state.type === 'customer' &&
                  <Icon
                    size={20}
                    name="check"
                    color={Colors.snow}
                  />
                  }
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.toggleUserType('vendor')}>
              <View style={{
                backgroundColor: this.state.type === 'vendor' ? Colors.background : '#F5F5F5',
                marginTop: 10,
                padding: 10,
                flex: 1,
                flexDirection: 'row',
                borderRadius: 3,
              }}
              >
                <Text
                  style={{
                    color: this.state.type === 'vendor' ? Colors.snow : Colors.gray,
                    fontWeight: 'bold',
                    flex: 1,
                  }}
                >AS A MERCHANT
                </Text>
                <View style={{ width: 40, height: 20, alignItems: 'flex-end' }}>
                  {this.state.type === 'vendor' &&
                  <Icon
                    size={20}
                    name="check"
                    color={Colors.snow}
                  />
                  }
                </View>
              </View>
            </TouchableOpacity>

          </Content>

          <LoadingSpinner show={this.props.auth.showActivityIndicator} />
          <Button
            block
            success
            style={SignUpScreenStyle.signUpButton}
            onPress={() => {
              this.signUp();
            }}
          >
            <Text style={{
              textAlign: 'center', fontFamily: Fonts.type.bold, fontWeight: 'bold', color: Colors.snow,
            }}
            >SIGN UP
            </Text>
          </Button>

          <View style={{
            flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 15,
          }}
          >
            <TouchableOpacity onPress={() => this.toggleLoginScreen()}>
              <Text h5 style={SignUpScreenStyle.goBackToLoginButton}>GO BACK TO LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch => (bindActionCreators(authActionCreators, dispatch));
const mapStateToProps = state => ({ auth: state.auth });
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
