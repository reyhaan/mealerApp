import React, {Component} from 'react'
import {ScrollView, View, Image, TouchableOpacity} from 'react-native'
import {LoginScreenStyle} from './Styles'
import {Button, FormInput, Text, CheckBox} from 'react-native-elements'
import {Images, Fonts} from '../Themes'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Colors } from '../Themes/'

const facebookLoginButtonTitle = () => {
    // TODO: find away to avoid the warning from showing up when using icon in the button title
    // return [<Icon name='facebook' size={14} coilor='white' />, 'acebook']
    return 'Facebook'
};

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
    }
    navigateToSignUpScreen = (navigation) => {
        navigation.navigate('SignUpScreen')
    };
    getUserLoginInfo = (id, e) => {
        if(id === 'email'){
            this.setState({userLoginInfo: Object.assign({}, this.state.userLoginInfo, {email : e})});
        }
        if(id === 'password'){
            this.setState({userLoginInfo : Object.assign({}, this.state.userLoginInfo, {password : e})});
          }
    };
    componentDidUpdate = ()=>{
        console.log(this.state)
    }

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
                </View>

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
                </View>

                <Button
                        buttonStyle={[LoginScreenStyle.primaryButton, LoginScreenStyle.loginButton]}
                        textStyle={{textAlign: 'center', fontFamily: Fonts.type.bold, fontWeight: 'bold'}}
                        title={`LOGIN`}/>
                <View style={LoginScreenStyle.signUpView}>
                        <View><Text h5 style={LoginScreenStyle.registerButton}> Not Registered?</Text></View>
                        <TouchableOpacity onPress={() => this.navigateToSignUpScreen(this.props.navigation)}>
                            <Text h5 style={LoginScreenStyle.signUpButton}>SIGN UP!</Text>
                        </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)