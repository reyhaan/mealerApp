import React, {Component} from 'react'
import {ScrollView, View, Image, TouchableOpacity, Alert} from 'react-native'
import {LoginScreenStyle} from './Styles'
import {Button, FormInput, Text} from 'react-native-elements'
import {Images, Fonts} from '../Themes'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {SignUpScreen} from './index'
import {authActionCreators} from '../Redux/Auth/AuthActions'
import {LoadingSpinner} from '../Components'
import authenticationService from '../Services/authentication-service'


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

    async componentDidMount() {
        try {
            const currentUser = await authenticationService.currentUser();
            const {navigation} = this.props;
            if (currentUser && currentUser.type === "customer") {
                navigation.navigate('CustomerTab')
            } else if (currentUser && currentUser.type === "merchant") {
                navigation.navigate('MerchantTab')
            }

            // navigation.navigate('CustomerTab')
            // navigation.navigate('MerchantTab')

        } catch (err) {
            Alert.alert('Error', err);
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
const mapStateToProps = state => ({auth: state.auth});
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)