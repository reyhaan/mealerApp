import React, { Component } from 'react'
import { ScrollView, Text, View, Platform, Image, KeyboardAvoidingView, TextInput } from 'react-native'
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
import authenticationService from '../../Services/authentication-service'
import {Alert} from 'react-native';
// Styles
const styles = UserInfoChangeScreenStyle;

class UserInfoChangeScreen extends Component {

  constructor (props) {
    super(props)
    this.state = {
      name: '',
      address: '',
      phone: '',
      email: ''
    }
  }

  componentDidMount() {
    const currentUser = this.props.settings.user;
    currentUser
    ? this.setState({
      name: currentUser.name || '',
      address: currentUser.address || '',
      phone: currentUser.phone || '',
      email: currentUser.email || ''
    })
    : Alert.alert('Error:', 'unable to retrieve your info')
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
    const {name: newName, address: newAddress, email: newEmail, phone: newPhone} = this.state
    const existingUser = this.props.settings.user
    if(newName && newEmail){
      ((existingUser.name !== newName) 
      || (existingUser.address !== newAddress)
      || (existingUser.email !== newEmail)
      || (existingUser.phone !== newPhone))
      ? this.props.updateUserInfo({ uid: existingUser.uid, userDetails: this.state })
      : '' 
    }
    else Alert.alert('Name and Email is required')
  }

  onInputChange = (value, name) => {
    this.setState({[name]: value})
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
                    { params.page === "UPDATE PROFILE" &&
                      <View >
                          <FormLabel labelStyle={styles.formLabel}>DISPLAY NAME</FormLabel>
                          <TextInput
                            underlineColorAndroid="transparent"
                            style={styles.inputField}
                            autoCapitalize="none" 
                            value={this.state.name}
                            onChangeText={(value) => this.onInputChange(value, 'name')}/>

                          <FormLabel labelStyle={styles.formLabel}>ADDRESS</FormLabel>
                          <TextInput
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                            style={styles.inputField}
                            keyboardType="default"
                            value={this.state.address}
                            onChangeText={(value) => this.onInputChange(value, 'address')} />

                          <FormLabel labelStyle={styles.formLabel}>EMAIL</FormLabel>
                          <TextInput
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                            style={styles.inputField}
                            keyboardType="email-address"
                            value={this.state.email} 
                            onChangeText={(value) => this.onInputChange(value, 'email')}/>

                          <FormLabel labelStyle={styles.formLabel}>PHONE NUMBER</FormLabel>
                          <TextInput
                            underlineColorAndroid="transparent"
                            autoCapitalize="none"
                            style={styles.inputField}
                            keyboardType="number-pad"
                            value={this.state.phone}
                            onChangeText={(value) => this.onInputChange(value, 'phone')} />

                          <FormLabel labelStyle={styles.formLabel}>PASSWORD</FormLabel>
                          <TextInput
                            underlineColorAndroid="transparent"
                            style={styles.inputField}
                            autoCapitalize="none" />

                          <FormLabel labelStyle={styles.formLabel}>CONFIRM PASSWORD</FormLabel>
                          <TextInput
                            underlineColorAndroid="transparent"
                            style={styles.inputField}
                            autoCapitalize="none" />
                      </View>
                    }

                    {/* DISPLAY NAME CHANGE */}
                    { params.page === "DELIVERY ADDRESS" &&
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
                    { params.page === "ACCOUNT CREDITS" &&
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
                    {/* REFER FRIENDS*/}
                    { params.page === "REFER FRIENDS" &&
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
    menu: state.menu,
    auth: state.auth,
    settings: state.settings
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(settingsActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoChangeScreen)
