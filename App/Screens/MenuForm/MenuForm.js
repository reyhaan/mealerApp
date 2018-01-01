import React, {Component} from 'react'
import {ScrollView, View, Platform, KeyboardAvoidingView, Text, Image, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {Header, Icon,} from 'react-native-elements'
import {Colors, Fonts, Metrics, Images} from '../../Themes/index'
import {NavigationActions} from 'react-navigation'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {vendorActionCreators} from '../../Redux/Vendor/VendorActions';
import {bindActionCreators} from 'redux';
import {Alert} from 'react-native';
import {Form, Item, Input, Label, Button} from 'native-base';
import styles from './MenuForm.style'
import {TextInputMask} from 'react-native-masked-text';
import {ImagePicker} from 'expo';
import Avatar from '../../Components/Avatar'

class MenuForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName: "",
            itemDetail: "",
            itemImage: "",
            itemCost: "",
            id: "",
            base64img: null,
        }
    }

    componentDidMount() {
        const {state} = this.props.navigation;
        if (state.params && state.params.item) {
            const item = state.params.item;
            this.setState({
                id: item.id,
                itemName: item.itemName,
                itemDetail: item.itemDetail,
                itemImage: item.itemImage,
                itemCost: item.itemCost.toString()
            })
        } else {
            this.resetForm();
        }
    }

    formUpdate = (input, value) => {
        this.setState({
            [input]: value,
        });
    };

    resetForm = () => {
        this.setState({
            id: "",
            itemName: "",
            itemCost: "",
            itemDetail: "",
            itemImage: ""
        })
    };

    onMenuSubmit() {
        let {itemName, itemCost, itemDetail, itemImage, base64img} = this.state;

        if (!itemName) {
            Alert.alert("Missing item name")
        }
        else if (!itemCost) {
            Alert.alert("Missing item cost")
        }
        else if (!itemDetail) {
            Alert.alert("Missing item details")
        }
        else if (!itemImage) {
            Alert.alert("Missing item image")
        }
        else {
            itemCost = itemCost.replace('$ ', '');
            itemCost = Number(itemCost);
            itemCost = parseFloat(itemCost).toFixed(2);
            this.setState({
                itemCost: itemCost,
            }, () => {
                if (this.state.id) {
                    this.props.updateMenu(this.state);
                } else {
                    this.props.createMenu(this.state);
                }
                this.props.navigation.dispatch(NavigationActions.back())
            });
        }
    }

    removeMenu = () => {
        this.props.removeMenu(this.state);
        this.resetForm();
        this.props.navigation.dispatch(NavigationActions.back());
    };

    _backButton = () => {
        return (
            <Icon
                name={Platform.OS === 'ios' ? 'chevron-left' : 'arrow-back'}
                color={Colors.snow}
                size={40}
                iconStyle={{marginTop: 30, marginLeft: -15}}
                underlayColor={'transparent'}
                onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
            />
        )
    };

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.1,
            base64: true,
        });

        if (!result.cancelled) {
            this.setState({base64img: result.base64, itemImage: result.uri});
        }
    };

    render() {
        //Set the item image or show a placeholder
        let image = this.state.itemImage ? {uri: this.state.itemImage} : {uri: Images.addImagePlaceHolder};

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <ScrollView style={styles.container}>
                    <Header leftComponent={this._backButton()} rightComponent={null}
                            centerComponent={{text: 'ADD ITEM', style: {color: Colors.snow, fontWeight: 'bold'}}}
                            backgroundColor={Colors.background}
                    />
                    <View style={styles.formContainer}>
                        <Avatar image={image} _pickImage={this._pickImage}/>
                        <Form>
                            <Item stackedLabel>
                                <Label>Name</Label>
                                <Input autoCapitalize="none"
                                       onChangeText={(e) => this.formUpdate('itemName', e)}
                                       underlineColorAndroid="transparent"
                                       value={this.state.itemName}/>
                            </Item>
                            <Item stackedLabel>
                                <Label>Price</Label>
                                <Input
                                    ref={'moneyUnit'}
                                    value={this.state.itemCost}
                                    onChangeText={(e) => this.formUpdate('itemCost', e)}
                                    style={{width: '100%', height: 50}}
                                    placeholder="$ 0.00"
                                    keyboardType="numeric"
                                />
                            </Item>

                            <Item stackedLabel>
                                <Label>Item Detail</Label>
                                <Input autogrow={true}
                                       maxHeight={150}
                                       minHeight={80}
                                       multiline={true}
                                       onChangeText={(e) => this.formUpdate('itemDetail', e)}
                                       underlineColorAndroid="transparent"
                                       value={this.state.itemDetail}/>
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

                            <Col size={1} style={{marginRight: 10, marginLeft: 10}}>
                                <Button block
                                        style={{backgroundColor: Colors.green}}
                                        textStyle={{
                                            textAlign: 'center',
                                            fontFamily: Fonts.type.bold,
                                            fontWeight: 'bold',
                                        }}
                                        onPress={() => this.onMenuSubmit()}>
                                    <Text style={{color: Colors.white}}>Save</Text>
                                </Button>
                            </Col>

                            <Col size={1} style={{marginRight: 10, marginLeft: 10}}>
                                <Button danger block bordered
                                        textStyle={{
                                            textAlign: 'center',
                                            fontFamily: Fonts.type.bold,
                                            fontWeight: 'bold'
                                        }}
                                        title={`CANCEL`}
                                        onPress={() => this.removeMenu()}>
                                    <Text style={{color: Colors.fire}}>Remove</Text>
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
    return bindActionCreators(vendorActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuForm)
