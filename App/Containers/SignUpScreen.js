import React, {Component} from 'react'
import {Button, FormInput, List, ListItem, Text} from 'react-native-elements'
import {connect} from 'react-redux'
import {ScrollView, View, Image, Alert} from 'react-native'
import {Images, Fonts} from '../Themes'
import {SignUpScreenStyle} from './Styles'
import {bindActionCreators} from 'redux'
import {authActionCreators} from '../Redux/Auth/AuthActions'
import {LoginScreen} from './index'
import {LoadingSpinner} from '../Components'

const merchantTitle = "I AM A MERCHANT";
const customerTitle = "I AM A CUSTOMER";

class SignUpScreen extends Component {
    // state = {
    //     name: "",
    //     email: "",
    //     password: "",
    //     type: 'customer',
    //     userTypeDropDown: false,
    //     userTypeTitle: customerTitle
    // };

    state = {
        name: "john kenedy",
        email: "rrr@rrr.com",
        password: "rrrrrr",
        type: 'customer',
        userTypeDropDown: false,
        userTypeTitle: customerTitle
    };

    toggleLoginScreen = () => {
        this.setState({showLoginScreen: !this.state.showLoginScreen})
    };

    formUpdate = (input, value) => {
        this.setState({
            [input]: value,
        });
    };

    onSelectUserType = (value) => {
        this.toggleUserTypeDropDown();
        this.setState({
            type: value,
            userTypeTitle: value === 'customer' ? customerTitle : merchantTitle
        });
    };

    toggleUserTypeDropDown = () => {
        this.setState({userTypeDropDown: !this.state.userTypeDropDown});
    };

    signUp = () => {
        const {email, password, name, type} = this.state;
        if (email && password && name && type) {
            this.props.signUp({name, email, password, type});
        } else {
            Alert.alert("", "Enter your name, email & password")
        }
    };

    //TODO: Add form validation for email and password
    render() {
        if (this.state.showLoginScreen) {
            return <LoginScreen/>
        } else {
            return (
                <ScrollView style={SignUpScreenStyle.container}>
                    <View style={SignUpScreenStyle.centered}>
                        <Image source={Images.logo} style={SignUpScreenStyle.logo}/>
                        <Image source={Images.mealerLogo} style={SignUpScreenStyle.mealerLogo}/>
                    </View>

                    <View style={[SignUpScreenStyle.section]}>
                        <FormInput
                            underlineColorAndroid="transparent"
                            inputStyle={SignUpScreenStyle.inputField}
                            containerStyle={SignUpScreenStyle.inputContainer}
                            onChangeText={(e) => this.formUpdate('name', e)}
                            placeholder="NAME"/>
                        <FormInput
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            inputStyle={SignUpScreenStyle.inputField}
                            containerStyle={SignUpScreenStyle.inputContainer}
                            onChangeText={(e) => this.formUpdate('email', e)}
                            placeholder="EMAIL"/>
                        <FormInput
                            secureTextEntry={true}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            underlineColorAndroid="transparent"
                            inputStyle={SignUpScreenStyle.inputField}
                            containerStyle={SignUpScreenStyle.inputContainer}
                            onChangeText={(e) => this.formUpdate('password', e)}
                            placeholder="PASSWORD"/>

                        {/*/!*Todo use TouchableOpacity for this button instead since icon is not showing properly*!/*/}
                        <Button
                            buttonStyle={SignUpScreenStyle.userTypePickerBtn}
                            fontWeight={'500'}
                            iconRight={{name: 'check'}}
                            title={this.state.userTypeTitle}
                            onPress={() => {
                                this.toggleUserTypeDropDown()
                            }}/>

                        {this.state.userTypeDropDown ?
                            <List containerStyle={SignUpScreenStyle.userTypePickerDropDown}>
                                <ListItem titleStyle={SignUpScreenStyle.userTypePickerTitle} hideChevron={true}
                                          title={"I AM A CUSTOMER"} onPress={() => {
                                    this.onSelectUserType("customer")
                                }}/>
                                <ListItem titleStyle={SignUpScreenStyle.userTypePickerTitle} hideChevron={true}
                                          title={"I AM A MERCHANT"} onPress={() => {
                                    this.onSelectUserType("merchant")
                                }}/>
                            </List> : null}

                        <LoadingSpinner show={this.props.auth.showActivityIndicator}/>
                        <Button
                            buttonStyle={SignUpScreenStyle.signUpButton}
                            textStyle={{textAlign: 'center', fontFamily: Fonts.type.bold, fontWeight: 'bold'}}
                            title="SIGN UP"
                            onPress={() => {
                                this.signUp()
                            }}/>
                        <Button
                            fontSize={15}
                            buttonStyle={SignUpScreenStyle.goBackToLoginButton}
                            textStyle={{textAlign: 'center', fontFamily: Fonts.type.bold, fontWeight: 'bold'}}
                            title="GO BACK TO LOGIN"
                            onPress={() => {
                                this.toggleLoginScreen()
                            }}/>
                    </View>
                </ScrollView>
            )
        }
    }
}

const mapDispatchToProps = (dispatch) => (bindActionCreators(authActionCreators, dispatch));
const mapStateToProps = state => ({auth: state.auth});
export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)