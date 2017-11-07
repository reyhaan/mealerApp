import React, {Component} from 'react'
import {ScrollView, View, Image, TouchableOpacity} from 'react-native'
import {LoginScreenStyle} from './Styles'
import {Button, FormInput, Text, CheckBox} from 'react-native-elements'
import {Images, Fonts} from '../Themes'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Colors } from '../Themes/'
import {bindActionCreators} from 'redux'
import * as UserActionCreators from '../Redux/Auth/AuthRedux'


class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked : false,
            userLoginInfo : {'email':'', 'password':''}
        }
    }
    toggleCheckBox = ()=>{
        this.setState({checked : !this.state.checked})
    };
    navigateToSignUpScreen = (navigation) => {
        navigation.navigate('SignUpScreen')
    };
    getUserLoginInfo = (id, e) => {
            this.setState({userLoginInfo: Object.assign({}, this.state.userLoginInfo, {[id] : e})});
    };

    login = () => {
        let {email, password} = this.state.userLoginInfo;
        if(email && password){
            this.props.signIn({email, password});
        }
    };
    render() {
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
                        onChangeText={(e)=>this.getUserLoginInfo('email', e)}
                        placeholder="EMAIL"/>

                    <FormInput
                        underlineColorAndroid="transparent"
                        inputStyle={LoginScreenStyle.inputField}
                        containerStyle={LoginScreenStyle.inputContainer}
                        onChangeText={(e)=>this.getUserLoginInfo('password', e)}
                        placeholder="PASSWORD"
                        secureTextEntry={true}/>
                    <View style={LoginScreenStyle.forgotPasswordView}>
                        <CheckBox 
                            title='Remember me'
                            iconLeft
                            checked={this.state.checked}
                            checkedColor={'white'}
                            uncheckedColor={'white'}
                            textStyle={LoginScreenStyle.checkBoxTextStyle}
                            containerStyle={LoginScreenStyle.checkBoxContainerStyle}
                            onPress={this.toggleCheckBox}
                        />
                        <Text style={LoginScreenStyle.forgotPasswordTextStyle}>
                            Forgot Password?
                        </Text>
                    </View >
                    <View Style={LoginScreenStyle.loginButtonView}>
                    <Button
                                /*containerViewStyle={LoginScreenStyle.loginButtonView}*/
                                buttonStyle={[LoginScreenStyle.primaryButton]}
                                textStyle={{textAlign: 'center', fontFamily: Fonts.type.bold, fontWeight: 'bold'}}
                                title={`LOGIN`}
                                onPress={this.login}/></View>
                    <View style={[LoginScreenStyle.signUpView]}>
                            <Text h5 style={LoginScreenStyle.registerButton}> Not Registered?</Text>
                            <TouchableOpacity onPress={() => this.navigateToSignUpScreen(this.props.navigation)}>
                                <Text h5 style={LoginScreenStyle.signUpButton}>SIGN UP!</Text>
                            </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const mapDispatchToProps = (dispatch) => (bindActionCreators(UserActionCreators, dispatch));
const mapStateToProps = state => ({nav: state.navigation, auth: state.auth});
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)