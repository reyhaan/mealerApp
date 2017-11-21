import React, { Component } from 'react'
import { ScrollView, Text, View, Platform, Image, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { Header, Icon, Button, FormInput, FormLabel } from 'react-native-elements'
import {UserInfoChangeScreenStyle} from '../../Styles'
import { Colors, Fonts, Metrics } from '../../../Themes'
import { NavigationActions } from 'react-navigation'
import { Col, Row, Grid } from 'react-native-easy-grid'
import SettingsService from '../../../Services/settings-service'
import authentication from '../../../Services/authentication-service'
import { settingsActionCreators } from '../../../Redux/Settings/SettingsActions'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
const styles = UserInfoChangeScreenStyle;

class UserInfoChangeScreen extends Component {

  constructor (props) {
    super(props)

    this.state = {
      user: '',
      name: '',
      address: '',
      phone: '',
      password: 'bleh'
    }

  }

  componentDidMount() {
    authentication.currentUser().then((user) => {
      this.setState({
        user: user
      });
    });
  }

  backButton = () => {
    return(
      <Icon
        name={Platform.OS === 'ios' ? 'chevron-left' : 'arrow-back'}
        color={Colors.snow}
        onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
      />
    )
  }

  updateUserDetails = () => {
    let data = {
      name: this.state.name || this.state.user.name,
      address: this.state.address || this.state.user.address,
      phone: this.state.phone || this.state.user.phone,
      password: this.state.password || this.state.user.password,
      uid: this.state.user.uid
    }
    this.props.updateUserInfo(data)
  }

  getUserInfo = (inputType, value) => {
    switch(inputType) {
      case "address":
        this.setState({
          address: value
        })
        break;

      case "phone":
        this.setState({
          phone: value
        })
        break;

      case "name":
        this.setState({
          name: value
        })
        break;

      case "password":
        this.setState({
          password: value
        })
        break;
    }
  }

  render () {
    const { params } = this.props.navigation.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.container}>
          <Header
            leftComponent = {this.backButton()}
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
                            onChangeText={(value) => this.getUserInfo('address', value)}
                            defaultValue={this.state.user ? this.state.user.address : ''}
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                            containerStyle={styles.inputContainer}
                            keyboardType="email-address" />
      
                          <FormLabel labelStyle={styles.formLabel}>PHONE NUMBER</FormLabel>
                          <FormInput
                            onChangeText={(value) => this.getUserInfo('phone', value)}
                            defaultValue={this.state.user ? this.state.user.phone : ''}
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
                          onChangeText={(value) => this.getUserInfo('name', value)}
                          defaultValue={this.state.user ? this.state.user.name : ''}
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
                          onChangeText={(value) => this.getUserInfo('password', value)}
                          defaultValue={this.state.user ? this.state.user.password : ''}
                          underlineColorAndroid="transparent"
                          inputStyle={styles.inputField}
                          containerStyle={styles.inputContainer}
                          autoCapitalize="none" />

                        <FormLabel labelStyle={styles.formLabel}>CONFIRM PASSWORD</FormLabel>
                        <FormInput
                          onChangeText={(value) => this.getUserInfo('confirmPassword', value)}
                          defaultValue={this.state.user ? this.state.user.confirmPassword : ''}
                          underlineColorAndroid="transparent"
                          inputStyle={styles.inputField}
                          containerStyle={styles.inputContainer}
                          autoCapitalize="none" />
                      </View>
                    }
                    <Row style={{height: 40, marginTop: Metrics.doubleBaseMargin, marginBottom: Metrics.doubleBaseMargin}}>

                      <Col size={1}>
                        <Button
                          onPress={() => {this.updateUserDetails()}}
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
