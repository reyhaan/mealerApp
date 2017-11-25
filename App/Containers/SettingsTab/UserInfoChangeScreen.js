import React, { Component } from 'react'
import { ScrollView, Text, View, Platform, Image, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Header, Icon, Button, FormInput, FormLabel } from 'react-native-elements'
import UserInfoChangeScreenStyle from './UserInfoChangeScreen.style'
import { Colors, Fonts, Metrics } from '../../Themes/index'
import { NavigationActions } from 'react-navigation'
import { Col, Row, Grid } from 'react-native-easy-grid'
import SettingsService from '../../Services/settings-service'
import authentication from '../../Services/authentication-service'
import { settingsActionCreators } from '../../Redux/Settings/SettingsActions'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
const styles = UserInfoChangeScreenStyle;

class UserInfoChangeScreen extends Component {

  constructor (props) {
    super(props)

    this.state = {

    }

  }

  _backButton = () => {
    return(
      <Icon
        name={Platform.OS === 'ios' ? 'chevron-left' : 'arrow-back'}
        color={Colors.snow}
        onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
      />
    )
  }

  _updateUserDetails = () => {
    console.log(this.props);

    var data = {
      userDetails: {
        address: "810 Edgeworth Avenue",
        phone: "6132345467",
        name: "Rehaan"
      }
    }

    authentication.currentUser().then((user) => {
      data.uid = user.uid
      this.props.updateUserInfo(data)
      // SettingsService.updateUserInfo(user.uid, data)
    })
  }

  render () {
    const { params } = this.props.navigation.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.container}>
          <Header
            leftComponent = {this._backButton()}
            centerComponent = {{ text: params.page, style: { color: '#fff', fontWeight: 'bold' } }}
            backgroundColor = {Colors.background}
            outerContainerStyles = { styles.headerOuterContainer }
          />
          <ScrollView>
            <Grid>
                <Row size={1} style={{backgroundColor: Colors.cloud }}>
                  <View style={styles.formContainer}>
                    {/* ADDRESS CHANGE */}
                    { params.page === "ADDRESS" &&
                      <View>
                          <FormLabel labelStyle={styles.formLabel}>ADDRESS</FormLabel>
                          <FormInput
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                            containerStyle={styles.inputContainer}
                            keyboardType="email-address" />
      
                          <FormLabel labelStyle={styles.formLabel}>PHONE NUMBER</FormLabel>
                          <FormInput
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                            containerStyle={styles.inputContainer}
                            keyboardType="email-address" />
                      </View>
                    }

                    {/* DISPLAY NAME CHANGE */}
                    { params.page === "DISPLAY NAME" &&
                      <View>
                        <FormLabel labelStyle={styles.formLabel}>DISPLAY NAME</FormLabel>
                        <FormInput
                          underlineColorAndroid="transparent"
                          inputStyle={styles.inputField}
                          containerStyle={styles.inputContainer}
                          autoCapitalize="none" />
                      </View>
                    }

                    {/* PASSWORD CHANGE */}
                    { params.page === "PASSWORD" &&
                      <View>
                        <FormLabel labelStyle={styles.formLabel}>PASSWORD</FormLabel>
                        <FormInput
                          underlineColorAndroid="transparent"
                          inputStyle={styles.inputField}
                          containerStyle={styles.inputContainer}
                          autoCapitalize="none" />

                        <FormLabel labelStyle={styles.formLabel}>CONFIRM PASSWORD</FormLabel>
                        <FormInput
                          underlineColorAndroid="transparent"
                          inputStyle={styles.inputField}
                          containerStyle={styles.inputContainer}
                          autoCapitalize="none" />
                      </View>
                    }
                    <Row style={{height: 40, marginTop: Metrics.doubleBaseMargin, marginBottom: Metrics.doubleBaseMargin}}>

                      <Col size={1}>
                        <Button
                          onPress={() => {this._updateUserDetails()}}
                          buttonStyle={[styles.greenButton]}
                          textStyle={{textAlign: 'center', fontFamily: Fonts.type.bold, fontWeight: 'bold'}}
                          title={`UPDATE`} />
                      </Col>

                    </Row>
                  </View>
                </Row>

            </Grid>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(settingsActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoChangeScreen)
