import React, {Component} from 'react'
import {ScrollView, View, Image, TouchableOpacity} from 'react-native'
import {LoginScreenStyle} from './Styles'
import {Button, FormInput, Text} from 'react-native-elements'
import {Images, Fonts} from '../Themes'
import {connect} from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'

const facebookLoginButtonTitle = () => {
    // TODO: find away to avoid the warning from showing up when using icon in the button title
    // return [<Icon name='facebook' size={14} coilor='white' />, 'acebook']
    return 'Facebook'
};

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    navigateToSignUpScreen = (navigation) => {
        navigation.navigate('SignUpScreen')
    };
    someFunction = () => {
        console.log('dd')
    };

    render() {
        return (
            <ScrollView style={LoginScreenStyle.container}>
                <View style={LoginScreenStyle.centered}>
                    <Image source={Images.logo} style={LoginScreenStyle.logo}/>
                    <Image source={Images.mealerLogo} style={LoginScreenStyle.mealerLogo}/>
                </View>

                <View style={[LoginScreenStyle.section, {marginBottom: 10}]}>
                    <FormInput
                        underlineColorAndroid="transparent"
                        inputStyle={LoginScreenStyle.inputField}
                        containerStyle={LoginScreenStyle.inputContainer}
                        onChangeText={this.someFunction}
                        placeholder="EMAIL"/>

                    <FormInput
                        underlineColorAndroid="transparent"
                        inputStyle={LoginScreenStyle.inputField}
                        containerStyle={LoginScreenStyle.inputContainer}
                        onChangeText={this.someFunction}
                        placeholder="PASSWORD"/>
                </View>

                <View style={[LoginScreenStyle.section, {marginTop: 0}]}>
                    <Button
                        buttonStyle={LoginScreenStyle.primaryButton}
                        textStyle={{textAlign: 'center', fontFamily: Fonts.type.bold, fontWeight: 'bold'}}
                        title={`LOGIN`}/>

                    <Button
                        buttonStyle={LoginScreenStyle.facebookButton}
                        fontWeight='bold'
                        textStyle={{textAlign: 'center'}}
                        title={facebookLoginButtonTitle()}/>

                    <View style={LoginScreenStyle.signUpView}>
                        <View><Text h5 style={LoginScreenStyle.registerButton}> Don't have an account?</Text></View>
                        <TouchableOpacity onPress={() => this.navigateToSignUpScreen(this.props.navigation)}>
                            <Text h5 style={LoginScreenStyle.signUpButton}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)