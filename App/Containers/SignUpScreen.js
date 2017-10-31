import React, {Component} from 'react'
import {Button, FormInput, Text} from 'react-native-elements'
import {connect} from 'react-redux'
import {ScrollView, View, Image, TouchableOpacity} from 'react-native'
import {Images, Fonts} from '../Themes'
import {SignUpScreenStyle} from './Styles'


class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

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
                        onChangeText={this.someFunction}
                        placeholder="NAME"/>

                    <FormInput
                        underlineColorAndroid="transparent"
                        inputStyle={SignUpScreenStyle.inputField}
                        containerStyle={SignUpScreenStyle.inputContainer}
                        onChangeText={this.someFunction}
                        placeholder="EMAIL"/>
                    <FormInput
                        underlineColorAndroid="transparent"
                        inputStyle={SignUpScreenStyle.inputField}
                        containerStyle={SignUpScreenStyle.inputContainer}
                        onChangeText={this.someFunction}
                        placeholder="PASSWORD"/>
                    <Button
                        buttonStyle={SignUpScreenStyle.signUpButton}
                        textStyle={{textAlign: 'center', fontFamily: Fonts.type.bold, fontWeight: 'bold'}}
                        title="SIGN UP"/>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)