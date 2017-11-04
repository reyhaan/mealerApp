import React, {Component} from 'react'
import {Button, FormInput, List, ListItem, Text} from 'react-native-elements'
import {connect} from 'react-redux'
import {ScrollView, View, Image, TouchableOpacity} from 'react-native'
import {Images, Fonts} from '../Themes'
import {SignUpScreenStyle} from './Styles'
import {bindActionCreators} from 'redux'
import * as UserActionCreators from '../Redux/User/UserActions'

const merchantTitle = "I AM A MERCHANT";
const customerTitle = "I AM A CUSTOMER";

class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            userType: 'customer',
            userTypeDropDown: false,
            userTypeTitle: customerTitle
        };
    }

    formUpdate = (input, value) => {
        this.setState({
            [input]: value,
        });

        console.log(this.props.signIn());
    };

    onSelectUserType = (value) => {
        this.toggleUserTypeDropDown();
        this.setState({
            userType: value,
            userTypeTitle: value === 'customer' ? customerTitle : merchantTitle
        });
    };

    toggleUserTypeDropDown = () => {
        this.setState({userTypeDropDown: !this.state.userTypeDropDown});
    };


    //TODO: Create custom drop down list component
    userTypeDropDown = () => {
        if (this.state.userTypeDropDown) {
            return (
                <List containerStyle={SignUpScreenStyle.userTypePickerDropDown}>
                    <ListItem titleStyle={SignUpScreenStyle.userTypePickerTitle} hideChevron={true}
                              title={"I AM A CUSTOMER"} onPress={() => {
                        this.onSelectUserType("customer")
                    }}/>
                    <ListItem titleStyle={SignUpScreenStyle.userTypePickerTitle} hideChevron={true}
                              title={"I AM A MERCHANT"} onPress={() => {
                        this.onSelectUserType("merchant")
                    }}/>
                </List>
            )
        } else {
            return null
        }
    };

    render() {
        return (
            <ScrollView style={SignUpScreenStyle.container}>
                <View style={SignUpScreenStyle.centered}>
                    <Image source={Images.logo} style={SignUpScreenStyle.logo}/>
                    <Image source={Images.mealerLogo} style={SignUpScreenStyle.mealerLogo}/>
                </View>

                <View style={[SignUpScreenStyle.section, {marginBottom: 10}]}>
                    <FormInput
                        underlineColorAndroid="transparent"
                        inputStyle={SignUpScreenStyle.inputField}
                        containerStyle={SignUpScreenStyle.inputContainer}
                        onChangeText={(e) => this.formUpdate('name', e)}
                        placeholder="NAME"/>

                    <FormInput
                        underlineColorAndroid="transparent"
                        inputStyle={SignUpScreenStyle.inputField}
                        containerStyle={SignUpScreenStyle.inputContainer}
                        onChangeText={(e) => this.formUpdate('email', e)}
                        placeholder="EMAIL"/>
                    <FormInput
                        underlineColorAndroid="transparent"
                        inputStyle={SignUpScreenStyle.inputField}
                        containerStyle={SignUpScreenStyle.inputContainer}
                        onChangeText={(e) => this.formUpdate('password', e)}
                        placeholder="PASSWORD"/>

                    {/*Todo use TouchableOpacity for this button instead since icon is not showing properly*/}
                    <Button
                        buttonStyle={SignUpScreenStyle.userTypePickerBtn}
                        fontWeight={'600'}
                        iconRight={{name: 'check'}}
                        title={this.state.userTypeTitle}
                        onPress={() => {
                            this.toggleUserTypeDropDown()
                        }}/>

                    {this.userTypeDropDown()}

                    <Button
                        buttonStyle={SignUpScreenStyle.signUpButton}
                        textStyle={{textAlign: 'center', fontFamily: Fonts.type.bold, fontWeight: 'bold'}}
                        title="SIGN UP"/>
                    <Button
                        fontSize={15}
                        buttonStyle={SignUpScreenStyle.goBackToLoginButton}
                        textStyle={{textAlign: 'center', fontFamily: Fonts.type.bold, fontWeight: 'bold'}}
                        title="GO BACK TO LOGIN"/>
                </View>
            </ScrollView>
        )
    }
}

const mapDispatchToProps = (dispatch) => (bindActionCreators(UserActionCreators, dispatch));
const mapStateToProps = state => ({nav: state.navigation});
export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)