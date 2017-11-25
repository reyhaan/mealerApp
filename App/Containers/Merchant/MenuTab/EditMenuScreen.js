import React, {Component} from 'react'
import {ScrollView, View, Platform, KeyboardAvoidingView, TextInput, Text} from 'react-native'
import {connect} from 'react-redux'
import {Header, Icon,} from 'react-native-elements'
import {Colors, Fonts, Metrics} from '../../../Themes'
import {NavigationActions} from 'react-navigation'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {AppImagePicker} from '../../../Components';
import {merchantActionCreators} from '../../../Redux/Merchant/MerchantActions';
import {bindActionCreators} from 'redux';
import {Alert} from 'react-native';
import { Form, Item, Input, Label, Button } from 'native-base';
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
                size={40}
                iconStyle={{marginTop: 30}}
                underlayColor={'transparent'}
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
                    />
                    <View style={styles.formContainer}>
                        <View style={{maxHeight: 140, height: 140}}>
                            <AppImagePicker style={{maxHeight: 140, height: 140}} callback={(url) => {
                                console.log(url)
                            }}/>
                        </View>

                        <Form>
                            <Item floatingLabel>
                                <Label>Name</Label>
                                <Input autoCapitalize="none"
                                       onChangeText={(event) => this.createNewMenu(event, 'itemName')}
                                       underlineColorAndroid="transparent" />
                            </Item>
                            <Item floatingLabel>
                                <Label>Price</Label>
                                <Input keyboardType="numeric"
                                       onChangeText={(event) => this.createNewMenu(event, 'itemCost')}
                                       underlineColorAndroid="transparent" />
                            </Item>

                            <Item floatingLabel>
                                <Label>Item Detail</Label>
                                <Input autogrow={true}
                                       maxHeight={150}
                                       minHeight={80}
                                       multiline={true}
                                       onChangeText={(event) => this.createNewMenu(event, 'itemDetail')}
                                       underlineColorAndroid="transparent" />
                            </Item>
                        </Form>

                        <Row style={{
                            height: 40,
                            marginTop: Metrics.doubleBaseMargin,
                            marginBottom: Metrics.doubleBaseMargin,
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>

                            <Col size={1} style={{marginRight:10, marginLeft:10}}>
                                <Button success block
                                    buttonStyle={[styles.greenButton]}
                                    textStyle={{
                                        textAlign: 'center',
                                        fontFamily: Fonts.type.bold,
                                        fontWeight: 'bold'
                                    }}
                                    title={`DONE`}
                                    onPress={() => this.onMenuSubmit()}>
                                    <Text style={{color:Colors.white}}>Save</Text>
                                </Button>
                            </Col>

                            <Col size={1} style={{marginRight:10, marginLeft:10}}>
                                <Button danger block bordered
                                    buttonStyle={[styles.cancelButton]}
                                    textStyle={{
                                        textAlign: 'center',
                                        fontFamily: Fonts.type.bold,
                                        fontWeight: 'bold'
                                    }}
                                    title={`CANCEL`}
                                    onPress={() => this.onCancelMenu()}>
                                    <Text style={{color:Colors.fire}}>Cancel</Text>
                                </Button>
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
    return bindActionCreators(merchantActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMenuScreen)
