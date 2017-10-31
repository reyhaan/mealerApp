import React, {Component} from 'react'
import {ScrollView, View, Image, TouchableOpacity} from 'react-native'
import {LoginStyles} from './Styles'
// import {Button, FormInput, Text} from 'react-native-elements'
import {Images, Fonts} from '../Themes'

import { Button } from 'antd-mobile';




export default class UserSignUp extends Component {
    render() {
        return (
            <ScrollView style={LoginStyles.container}>
                <View style={LoginStyles.centered}>
                    <Image source={Images.logo} style={LoginStyles.logo}/>
                    <Image source={Images.mealerLogo} style={LoginStyles.mealerLogo}/>
                </View>

                <View style={[LoginStyles.section, {marginBottom: 10}]}>
                    

                    <Button>antd-mobile button</Button>

                    {/*<FormInput*/}
                        {/*underlineColorAndroid="transparent"*/}
                        {/*inputStyle={LoginStyles.inputField}*/}
                        {/*containerStyle={LoginStyles.inputContainer}*/}
                        {/*onChangeText={this.someFunction}*/}
                        {/*placeholder="NAME"/>*/}
                    {/*<FormInput*/}
                        {/*underlineColorAndroid="transparent"*/}
                        {/*inputStyle={LoginStyles.inputField}*/}
                        {/*containerStyle={LoginStyles.inputContainer}*/}
                        {/*onChangeText={this.someFunction}*/}
                        {/*placeholder="EMAIL"/>*/}
                    {/*<FormInput*/}
                        {/*underlineColorAndroid="transparent"*/}
                        {/*inputStyle={LoginStyles.inputField}*/}
                        {/*containerStyle={LoginStyles.inputContainer}*/}
                        {/*onChangeText={this.someFunction}*/}
                        {/*placeholder="PASSWORD"/>*/}
                    {/*<Button*/}
                        {/*buttonStyle={LoginStyles.primaryButton}*/}
                        {/*textStyle={{textAlign: 'center', fontFamily: Fonts.type.bold, fontWeight: 'bold'}}*/}
                        {/*title={`LOGIN`}/>*/}

                    {/*<Button*/}
                        {/*buttonStyle={LoginStyles.facebookButton}*/}
                        {/*fontWeight='bold'*/}
                        {/*textStyle={{textAlign: 'center'}}*/}
                        {/*title='test'/>*/}




                    {/*<View><Text h5 style={LoginStyles.registerButton}> Don't have an account?</Text></View>*/}
                    {/*<TouchableOpacity onPress={() => this.navigateToSignUpScreen(this.props.navigation)}>*/}
                        {/*<Text h5 style={LoginStyles.signUpButton}>Sign Up</Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>


                {/*<View style={LoginStyles.signUpView}>*/}

                {/*</View>*/}

            </ScrollView>
        )
    }
}
