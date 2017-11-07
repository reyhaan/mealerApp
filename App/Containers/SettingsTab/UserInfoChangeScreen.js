import React, { Component } from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import {UserInfoChangeScreenStyle} from '../Styles'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
const styles = UserInfoChangeScreenStyle;

class UserInfoChangeScreen extends Component {

  render () {
    const { params } = this.props.navigation.state;
    return (
      <ScrollView style={styles.container}>
        <Text>{params.page}</Text>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoChangeScreen)
