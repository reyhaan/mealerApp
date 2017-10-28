import React, { Component } from 'react'
import { ScrollView, Text, View, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import { Images, Fonts } from '../Themes'
import { Button, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome'

// Styles
import styles from './Styles/AuthScreenStyle'

class AuthScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  someFunction = () => {

  }

  render () {
    return (
      <View style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.logo} style={styles.logo} />
            <Image source={Images.mealerLogo} style={styles.mealerLogo} />
          </View>

          <View style={[styles.section, {marginBottom: 10}]} >
            <FormInput
              underlineColorAndroid = "transparent"
              inputStyle={styles.inputField}
              containerStyle={styles.inputContainer}
              onChangeText={this.someFunction}
              placeholder="EMAIL"
            />
              
            <FormInput
              underlineColorAndroid = "transparent"
              inputStyle={styles.inputField}
              containerStyle={styles.inputContainer}
              onChangeText={this.someFunction}
              placeholder="PASSWORD"
            />

          </View>

          <View style={[styles.section, {marginTop: 0}]} >

            <Button
              buttonStyle={styles.primaryButton}
              textStyle={{textAlign: 'center', fontFamily: Fonts.type.bold, fontWeight: 'bold'}}
              title={`LOGIN`}
            />

            <Button
              buttonStyle={styles.facebookButton}
              fontWeight= 'bold'
              textStyle={{textAlign: 'center'}}
              title={[<Icon name='facebook' size={14} color='white' />, 'acebook']}
            />

          </View>

        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)