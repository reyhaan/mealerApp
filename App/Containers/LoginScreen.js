import React, {Component} from 'react'
import {ScrollView, View, Image, TouchableOpacity, Alert, ActivityIndicator} from 'react-native'
import {LoginScreenStyle} from './Styles'
import {Button, FormInput, Text, CheckBox} from 'react-native-elements'
import {Images, Fonts} from '../Themes'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Colors} from '../Themes/'
import {bindActionCreators} from 'redux'
import {SignUpScreen} from './index'
import {authActionCreators} from '../Redux/Auth/AuthActions'
import {LoadingSpinner} from '../Components'

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSignUpScreen: false,
            checked: false,
            userLoginInfo: {'email': '', 'password': ''}
        };

        // this.state = {
        //     showSignUpScreen: false,
        //     checked: false,
        //     userLoginInfo: {'email': 'rrr@rrr.com', 'password': 'rrrrrr'}
        // };
    }

    toggleSignUpPage = () => {
        this.setState({showSignUpScreen: !this.state.showSignUpScreen})
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
            return <SignUpScreen/>
        } else {
            return (
                <ScrollView style={LoginScreenStyle.container}>
                    <View style={LoginScreenStyle.centered}>
                        <Image source={Images.logo} style={LoginScreenStyle.logo}/>
                        <Image source={Images.mealerLogo} style={LoginScreenStyle.mealerLogo}/>
                    </View>

                    <View style={[LoginScreenStyle.section, {marginBottom: 5}]}>
                        <FormInput
                            underlineColorAndroid="transparent"
                            inputStyle={LoginScreenStyle.inputField}
                            containerStyle={LoginScreenStyle.inputContainer}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            onChangeText={(e) => this.getUserLoginInfo('email', e)}
                            placeholder="EMAIL"/>
                        <FormInput
                            underlineColorAndroid="transparent"
                            inputStyle={LoginScreenStyle.inputField}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            containerStyle={LoginScreenStyle.inputContainer}
                            onChangeText={(e) => this.getUserLoginInfo('password', e)}
                            placeholder="PASSWORD"
                            secureTextEntry={true}/>
                        <View style={LoginScreenStyle.forgotPasswordView}>
                            {/*<CheckBox*/}
                            {/*title='Remember me'*/}
                            {/*iconLeft*/}
                            {/*checked={this.state.checked}*/}
                            {/*checkedColor={'white'}*/}
                            {/*uncheckedColor={'white'}*/}
                            {/*textStyle={LoginScreenStyle.checkBoxTextStyle}*/}
                            {/*containerStyle={LoginScreenStyle.checkBoxContainerStyle}*/}
                            {/*onPress={this.toggleCheckBox}/>*/}
                            {/*<Text style={LoginScreenStyle.forgotPasswordTextStyle}>*/}
                            {/*Forgot Password?*/}
                            {/*</Text>*/}
                        </View>
                        <View Style={LoginScreenStyle.loginButtonView}>
                            <LoadingSpinner show={this.props.auth.showActivityIndicator}/>
                            <Button
                                buttonStyle={[LoginScreenStyle.primaryButton]}
                                textStyle={{textAlign: 'center', fontFamily: Fonts.type.bold, fontWeight: 'bold'}}
                                title={`LOGIN`}
                                onPress={this.login}/>
                        </View>
                        <View style={[LoginScreenStyle.signUpView]}>
                            <Text h5 style={LoginScreenStyle.registerButton}> Not Registered?</Text>
                            <TouchableOpacity onPress={() => this.toggleSignUpPage()}>
                                <Text h5 style={LoginScreenStyle.signUpButton}>SIGN UP!</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            )
        }
    }
}

const mapDispatchToProps = (dispatch) => (bindActionCreators(authActionCreators, dispatch));
const mapStateToProps = state => ({nav: state.navigation, auth: state.auth});
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)