import React, { Component } from 'react'
import { ScrollView, Text, View, Platform, Image, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import { Header, Icon, Button, FormInput, FormLabel } from 'react-native-elements'
import { Colors, Fonts, Metrics } from '../../../Themes'
import { NavigationActions } from 'react-navigation'
import { ImagePicker } from 'expo';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { MlImagePicker } from '../../../Components';
import {menuCreators} from '../../../Redux/Menu/MenuActions';
import {bindActionCreators} from 'redux';
// Styles
import styles from '../../Styles/Merchant/MenuTabStyle/CreateMenuItemScreenStyle'

class CreateMenuItemScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      itemName : "",
      itemDetail : "",
      itemImage: "https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/" +
      "v1438133716000/photosp/ig-498695320661758884_396353171/stock-photo-food-soup-healthy-foods-health-recipe-vegan-food-and-drink-stew-ig-498695320661758884_396353171.jpg",
      itemCost: 0.00
    }
  }

  createNewMenu = (event, id) =>{
    id === 'itemCost' && (typeof event === 'string' || event instanceof String) ?
    this.setState({[id] : parseFloat(event)}) : this.setState({[id] : event});
  }

  resetState = () =>{
    this.setState({itemName: "", itemCost: 0.00, itemDetail: ""})
  }

  onMenuSubmit(){
    const {itemName, _, itemImage, itemCost} = this.state;
    if(itemName && itemImage){
      if((typeof itemCost === 'number' || typeof itemCost === 'Number') && itemCost > 0){
        const cost = this.state.itemCost;
        this.setState({itemCost: cost.toFixed(2)}, () => {
          this.props.createMenu(this.state);
          this.resetState()
          this.props.navigation.dispatch(NavigationActions.back())
        })
      }
      //todo display error
      else alert("Cost value is invalid")
    }
    else{
      //todo display error
      alert("Please check form values")
    }
  }

  onCancelMenu = () =>{
    this.resetState();
    this.props.navigation.dispatch(NavigationActions.back())
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

  render () {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style = {styles.container}>
          <Header
            leftComponent = {this._backButton()}
            rightComponent = {null}
            centerComponent = {{ text: 'ADD ITEM', style: { color: Colors.snow, fontWeight: 'bold' } }}
            backgroundColor = {Colors.background}
            outerContainerStyles = { styles.headerOuterContainer }
          />
          <ScrollView>
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
                      keyboardType="email-address"
                      onChangeText={(event) => this.createNewMenu(event, 'itemName')}/>

                    <FormLabel labelStyle={styles.formLabel}>DETAIL</FormLabel>
                    <FormInput
                      underlineColorAndroid="transparent"
                      inputStyle={styles.inputField}
                      containerStyle={styles.inputContainer}
                      autoCapitalize="none" 
                      onChangeText={(event) => this.createNewMenu(event, 'itemDetail')}/>

                    <FormLabel labelStyle={styles.formLabel}>COST</FormLabel>
                    <FormInput
                      underlineColorAndroid="transparent"
                      inputStyle={styles.inputField}
                      containerStyle={styles.inputContainer}
                      autoCapitalize="none" 
                      onChangeText={(event) => this.createNewMenu(event, 'itemCost')}/>

                    <Row style={{height: 40, marginTop: Metrics.doubleBaseMargin, marginBottom: Metrics.doubleBaseMargin}}>

                      <Col size={1}>
                        <Button
                          buttonStyle={[styles.greenButton]}
                          textStyle={{textAlign: 'center', fontFamily: Fonts.type.bold, fontWeight: 'bold'}}
                          title={`DONE`} 
                          onPress={() => this.onMenuSubmit()}/>
                      </Col>
                      
                      <Col size={1}>
                        <Button
                          buttonStyle={[styles.cancelButton]}
                          textStyle={{textAlign: 'center', fontFamily: Fonts.type.bold, fontWeight: 'bold'}}
                          title={`CANCEL`} 
                          onPress={() => this.onCancelMenu()}/>
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(menuCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateMenuItemScreen)
