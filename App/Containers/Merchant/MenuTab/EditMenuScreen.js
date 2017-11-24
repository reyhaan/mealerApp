import React, {Component} from 'react'
import {ScrollView, View, Platform, KeyboardAvoidingView, TextInput, Text} from 'react-native'
import {connect} from 'react-redux'
import {Header, Icon, Button, FormInput, FormLabel} from 'react-native-elements'
import {Colors, Fonts, Metrics} from '../../../Themes'
import {NavigationActions} from 'react-navigation'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {MlImagePicker} from '../../../Components';
import {menuCreators} from '../../../Redux/Merchant/MerchantActions';
import {bindActionCreators} from 'redux';
import {Alert} from 'react-native';
// Styles
import styles from './EditMenuScreen.style'

class EditMenuScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName: "",
            itemDetail: "",
            itemImage: "https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/" +
            "v1438133716000/photosp/ig-498695320661758884_396353171/stock-photo-food-soup-healthy-foods-health-recipe-vegan-food-and-drink-stew-ig-498695320661758884_396353171.jpg",
            itemCost: 0.00
        }
    }

    createNewMenu = (event, id) => {
        id === 'itemCost' && (typeof event === 'string' || event instanceof String) ?
            this.setState({[id]: parseFloat(event)}) : this.setState({[id]: event})
    };

    resetState = () => {
        this.setState({itemName: "", itemCost: 0.00, itemDetail: ""})
    };

    onMenuSubmit() {
        const {itemName, _, itemImage, itemCost} = this.state;
        if (itemName && itemImage) {
            if ((typeof itemCost === 'number' || typeof itemCost === 'number') && itemCost > 0) {
                const cost = this.state.itemCost;
                this.setState({itemCost: cost.toFixed(2)}, () => {
                    this.props.createMenu(this.state);
                    this.resetState();
                    this.props.navigation.dispatch(NavigationActions.back())
                })
            }
            //todo display error
            else Alert.alert("Cost value is invalid")
        }
        else {
            //todo display error
            Alert.alert("Please check form values")
        }
    }

    onCancelMenu = () => {
        this.resetState();
        this.props.navigation.dispatch(NavigationActions.back())
    };

    _backButton = () => {
        return (
            <Icon
                name={Platform.OS === 'ios' ? 'chevron-left' : 'arrow-back'}
                color={Colors.snow}
                onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
            />
        )
    };

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <ScrollView style={styles.container}>
                    <Header leftComponent={this._backButton()} rightComponent={null}
                            centerComponent={{text: 'ADD ITEM', style: {color: Colors.snow, fontWeight: 'bold'}}}
                            backgroundColor={Colors.background}
                            outerContainerStyles={styles.headerOuterContainer}/>
                    <View style={styles.formContainer}>

                        <View style={{height: 150}}>
                            <MlImagePicker style={{height: 150}} callback={(url) => {
                                console.log(url)
                            }}></MlImagePicker>
                        </View>

                        <FormLabel labelStyle={styles.formLabel}>Name</FormLabel>
                        <TextInput style={styles.formInput}
                                   autoCapitalize="none"
                                   onChangeText={(event) => this.createNewMenu(event, 'itemName')}
                                   underlineColorAndroid="transparent"/>

                        <FormLabel labelStyle={styles.formLabel}>Price</FormLabel>
                        <TextInput style={styles.formInput}
                                   keyboardType="numeric"
                                   onChangeText={(event) => this.createNewMenu(event, 'itemCost')}
                                   underlineColorAndroid="transparent"/>

                        <FormLabel labelStyle={styles.formLabel}>Item Detail</FormLabel>
                        <TextInput style={styles.formInputExtendedHeight}
                                   autogrow={true}
                                   maxHeight={100}
                                   minHeight={80}
                                   multiline={true}
                                   onChangeText={(event) => this.createNewMenu(event, 'itemDetail')}
                                   underlineColorAndroid="transparent"/>

                        <Row style={{
                            height: 40,
                            marginTop: Metrics.doubleBaseMargin,
                            marginBottom: Metrics.doubleBaseMargin
                        }}>

                            <Col size={1}>
                                <Button
                                    buttonStyle={[styles.greenButton]}
                                    textStyle={{
                                        textAlign: 'center',
                                        fontFamily: Fonts.type.bold,
                                        fontWeight: 'bold'
                                    }}
                                    title={`DONE`}
                                    onPress={() => this.onMenuSubmit()}/>
                            </Col>

                            <Col size={1}>
                                <Button
                                    buttonStyle={[styles.cancelButton]}
                                    textStyle={{
                                        textAlign: 'center',
                                        fontFamily: Fonts.type.bold,
                                        fontWeight: 'bold'
                                    }}
                                    title={`CANCEL`}
                                    onPress={() => this.onCancelMenu()}/>
                            </Col>
                        </Row>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(menuCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMenuScreen)
