import React, { Component } from 'react'
import { ScrollView, Text, View, Platform, Image } from 'react-native'
import { connect } from 'react-redux'
import { Header, Icon, Button, FormInput, FormLabel } from 'react-native-elements'
import { Colors, Fonts, Metrics } from '../../../Themes'
import { NavigationActions } from 'react-navigation'
import { ImagePicker } from 'expo';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { MlImagePicker } from '../../../Components'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../../Styles/Merchant/MenuTabStyle/CreateMenuItemScreenStyle'

class CreateMenuItemScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      image: null
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

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render () {
    let { image } = this.state;
    return (
      <View style = {styles.container}>
        <Header
          leftComponent = {this._backButton()}
          rightComponent = {null}
          centerComponent = {{ text: 'ADD ITEM', style: { color: Colors.snow, fontWeight: 'bold' } }}
          backgroundColor = {Colors.background}
          outerContainerStyles = { styles.headerOuterContainer }
        />

        <Grid>
            <Row style={{ height: 200 }}>
              <MlImagePicker callback={(url) => {console.log(url)}}></MlImagePicker>
            </Row>

            <Row size={1} style={{backgroundColor: Colors.cloud }}>
              <View style={styles.formContainer}>
                <FormLabel labelStyle={styles.formLabel}>NAME</FormLabel>
                <FormInput
                  underlineColorAndroid="transparent"
                  autoCapitalize="none"
                  containerStyle={styles.inputContainer}
                  keyboardType="email-address" />

                <FormLabel labelStyle={styles.formLabel}>DETAIL</FormLabel>
                <FormInput
                  underlineColorAndroid="transparent"
                  inputStyle={styles.inputField}
                  containerStyle={styles.inputContainer}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={(e) => this.getUserLoginInfo('email', e)} />

                <FormLabel labelStyle={styles.formLabel}>COST</FormLabel>
                <FormInput
                  underlineColorAndroid="transparent"
                  inputStyle={styles.inputField}
                  containerStyle={styles.inputContainer}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  onChangeText={(e) => this.getUserLoginInfo('email', e)} />

                <Row style={{height: 40, marginTop: Metrics.doubleBaseMargin}}>

                  <Col size={1}>
                    <Button
                      buttonStyle={[styles.greenButton]}
                      textStyle={{textAlign: 'center', fontFamily: Fonts.type.bold, fontWeight: 'bold'}}
                      title={`DONE`}
                      onPress={this.login}/>
                  </Col>
                  
                  <Col size={1}>
                    <Button
                      buttonStyle={[styles.cancelButton]}
                      textStyle={{textAlign: 'center', fontFamily: Fonts.type.bold, fontWeight: 'bold'}}
                      title={`CANCEL`}
                      onPress={this.login}/>
                  </Col>

                </Row>
              </View>
            </Row>


        </Grid>
        
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateMenuItemScreen)
