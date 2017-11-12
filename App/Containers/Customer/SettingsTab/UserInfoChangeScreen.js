import React, { Component } from 'react'
import { View, Text, Platform } from 'react-native'
import { connect } from 'react-redux'
import { Header, Icon } from 'react-native-elements'
import {UserInfoChangeScreenStyle} from '../../Styles'
import { Colors } from '../../../Themes'
import { NavigationActions } from 'react-navigation'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
const styles = UserInfoChangeScreenStyle;

class UserInfoChangeScreen extends Component {

  _backButton = () => {
    return(
      <Icon
        name={Platform.OS === 'ios' ? 'chevron-left' : 'arrow-back'}
        color={Colors.snow}
        onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
      />
    )
  }

  render () {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Header
          leftComponent = {this._backButton()}
          centerComponent = {{ text: params.page, style: { color: '#fff', fontWeight: 'bold' } }}
          backgroundColor = {Colors.background}
          outerContainerStyles = { styles.headerOuterContainer }
        />
        <Text>{params.page}</Text>
      </View>
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
