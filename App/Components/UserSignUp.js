import React, { Component } from 'react'
import { Text } from 'react-native'
import styles from './Styles/RoundedButtonStyles'

export default class UserSignUp extends Component {
  getText () {
    return "testing"
  }

  render () {
    return (
        <Text style={styles.buttonText}>{this.getText()}</Text>
    )
  }
}
