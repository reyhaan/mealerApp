import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import {Button, Text} from 'react-native-elements'
import {SettingsTabStyle} from '../Styles'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
const styles = SettingsTabStyle

class SettingsTab extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Button
          buttonStyle={{marginTop: 20}}
          fontWeight='bold'
          textStyle={{textAlign: 'center'}}
          title='something'
          onPress={() => { this.props.navigation.navigate('PasswordChangeScreen') }}
          />
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsTab)
