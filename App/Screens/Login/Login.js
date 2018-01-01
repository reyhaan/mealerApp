import React, {Component} from 'react'
import {ScrollView, View, Image, TouchableOpacity, Alert} from 'react-native'
import LoginScreenStyle from './Login.style'
import {Text} from 'react-native-elements'
import {Button, Form, Item, Input, Label,} from 'native-base'
import {Images, Colors} from '../../Themes/index'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {SignUp} from '../index'
import {authActionCreators} from '../../Redux/Auth/AuthActions'
import {settingsActionCreators} from '../../Redux/Settings/SettingsActions'
import {LoadingSpinner} from '../../Components/index'
import authenticationService from '../../Services/authentication-service'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSignUpScreen: false,
            checked: false,
            userLoginInfo: {'email': '', 'password': ''}
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
                        </Form>
                        <LoadingSpinner show={this.props.auth.showActivityIndicator}/>
                        <Button block success
                                style={LoginScreenStyle.loginButton}
                                onPress={this.login}>
                            <Text style={{color: Colors.snow, fontSize: 16, fontWeight: "bold"}}>LOGIN</Text>
                        </Button>
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

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            ...authActionCreators,
            ...settingsActionCreators
        },
        dispatch);
};
const mapStateToProps = state => ({auth: state.auth});
export default connect(mapStateToProps, mapDispatchToProps)(Login)