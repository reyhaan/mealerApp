import React, { Component } from 'react'
import { ScrollView, View, Image, TouchableOpacity } from 'react-native'
import styles from './Styles/LoginStyles'
import { Button, FormInput, Text } from 'react-native-elements'
import { Images, Fonts } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'

const facebookLoginButtonTitle = () => {
  // TODO: find away to avoid the warning from showing up when using icon in the button title
  // return [<Icon name='facebook' size={14} color='white' />, 'acebook']
  return 'Facebook'
}

export default class Login extends Component {
  navigateToSignUpScreen = (navigation) => {
    navigation.navigate('SignUpScreen')
  }
  someFunction = () => {
    console.log('dd')
  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.logo} style={styles.logo}/>
            <Image source={Images.mealerLogo} style={styles.mealerLogo}/>
          </View>

          <View style={[styles.section, {marginBottom: 10}]}>
            <FormInput
              underlineColorAndroid="transparent"
              inputStyle={styles.inputField}
              containerStyle={styles.inputContainer}
              onChangeText={this.someFunction}
              placeholder="EMAIL"/>

            <FormInput
              underlineColorAndroid="transparent"
              inputStyle={styles.inputField}
              containerStyle={styles.inputContainer}
              onChangeText={this.someFunction}
              placeholder="PASSWORD"/>
          </View>

          <View style={[styles.section, {marginTop: 0}]}>
            <Button
              buttonStyle={styles.primaryButton}
              textStyle={{textAlign: 'center', fontFamily: Fonts.type.bold, fontWeight: 'bold'}}
              title={`LOGIN`}/>

            <Button
              buttonStyle={styles.facebookButton}
              fontWeight='bold'
              textStyle={{textAlign: 'center'}}
              title={facebookLoginButtonTitle()}/>

            <View style={styles.signUpView}>
              <View><Text h5 style={styles.registerButton}> Don't have an account?</Text></View>
              <TouchableOpacity onPress={() => this.navigateToSignUpScreen(this.props.navigation)}>
                <Text h5 style={styles.signUpButton}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </View>
    )
  }
}
