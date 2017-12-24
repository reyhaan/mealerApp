import React, {Component} from 'react'
import {List, ListItem, Icon} from 'react-native-elements'
import {connect} from 'react-redux'
import {ScrollView, View, Image, Alert, Text, TouchableOpacity} from 'react-native'
import {Images, Fonts, Colors} from '../../Themes/index'
import SignUpScreenStyle from './SignUp.style'
import {bindActionCreators} from 'redux'
import {authActionCreators} from '../../Redux/Auth/AuthActions'
import {Login} from '../index'
import {LoadingSpinner} from '../../Components/index'
import {Form, Item, Input, Label, Button, Content, Left, Radio} from 'native-base'

const merchantTitle = "I AM A MERCHANT";
const customerTitle = "I AM A CUSTOMER";

class SignUp extends Component {
    state = {
        name: "",
        email: "",
        password: "",
        type: 'customer',
        userTypeDropDown: false,
        userTypeTitle: customerTitle
    };

    // state = {
    //     name: "john kenedy",
    //     email: "rrr@rrr.com",
    //     password: "rrrrrr",
    //     type: 'customer',
    //     userTypeDropDown: false,
    //     userTypeTitle: customerTitle
    // };

    toggleLoginScreen = () => {
        this.setState({showLoginScreen: !this.state.showLoginScreen})
    };

    formUpdate = (input, value) => {
        this.setState({
            [input]: value,
        });
    };

    toggleUserType = (value) => {
        if (value === "customer") {
            this.setState({
                type: value,
                userTypeTitle: customerTitle
            });
        } else {
            this.setState({
                type: value,
                userTypeTitle: merchantTitle
            });
        }
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
            return <Login/>
        } else {
            return (
                <ScrollView style={SignUpScreenStyle.container}>
                    <View style={SignUpScreenStyle.centered}>
                        <Image source={Images.logo} style={SignUpScreenStyle.logo}/>
                        <Image source={Images.mealerLogo} style={SignUpScreenStyle.mealerLogo}/>
                    </View>

                    <View style={[SignUpScreenStyle.formContainer]}>
                        <Form style={SignUpScreenStyle.forgotPasswordView}>
                            <Item floatingLabel style={SignUpScreenStyle.formItemContainer}>
                                <Label style={{color: Colors.charcoal}}>Name</Label>
                                <Input style={SignUpScreenStyle.inputField}
                                       onChangeText={(e) => this.formUpdate('name', e)}/>
                            </Item>
                            <Item floatingLabel style={SignUpScreenStyle.formItemContainer}>
                                <Label style={{color: Colors.charcoal}}>Email</Label>
                                <Input keyboardType="email-address"
                                       autoCapitalize="none"
                                       style={SignUpScreenStyle.inputField}
                                       onChangeText={(e) => this.formUpdate('email', e)}/>
                            </Item>
                            <Item floatingLabel style={SignUpScreenStyle.formItemContainer}>
                                <Label style={{color: Colors.charcoal}}>Password</Label>
                                <Input keyboardType="email-address"
                                       style={SignUpScreenStyle.inputField}
                                       secureTextEntry={true}
                                       onChangeText={(e) => this.formUpdate('password', e)}/>
                            </Item>
                        </Form>

                        <Content style={{ marginLeft: 15, marginTop: 0 }}>

                            <TouchableOpacity onPress={() => this.toggleUserType('customer')}>
                                <View style={{ padding: 10, backgroundColor: this.state.type === "customer" ? Colors.background : "#F5F5F5", flex: 1, flexDirection: "row", borderRadius: 3 }}>
                                    <Text style={{ color: this.state.type === "customer" ? Colors.snow : Colors.gray, fontWeight: "bold", flex: 1 }}>AS A CUSTOMER</Text>
                                    <View style={{ width: 40, height: 20, alignItems: 'flex-end' }}>
                                        { this.state.type === "customer" &&
                                        <Icon
                                            size={20}
                                            name='check'
                                            color={Colors.snow}
                                        />
                                        }
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.toggleUserType('merchant')}>
                                <View style={{ backgroundColor: this.state.type === "merchant" ? Colors.background : "#F5F5F5", marginTop: 10, padding: 10, flex: 1, flexDirection: "row", borderRadius: 3 }}>
                                    <Text style={{ color: this.state.type === "merchant" ? Colors.snow : Colors.gray, fontWeight: "bold", flex: 1 }}>AS A MERCHANT</Text>
                                    <View style={{ width: 40, height: 20, alignItems: 'flex-end' }}>
                                        { this.state.type === "merchant" &&
                                        <Icon
                                            size={20}
                                            name='check'
                                            color={Colors.snow}
                                        />
                                        }
                                    </View>
                                </View>
                            </TouchableOpacity>

                        </Content>

                        <LoadingSpinner show={this.props.auth.showActivityIndicator}/>
                        <Button block success
                            style={SignUpScreenStyle.signUpButton}
                            onPress={() => {
                                this.signUp()
                            }}>
                            <Text style={{ textAlign: 'center', fontFamily: Fonts.type.bold, fontWeight: 'bold', color: Colors.snow }}>SIGN UP</Text>
                        </Button>

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>
                            <TouchableOpacity onPress={() => this.toggleLoginScreen()}>
                                <Text h5 style={SignUpScreenStyle.goBackToLoginButton}>GO BACK TO LOGIN</Text>
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
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)