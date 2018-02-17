import React, {Component} from 'react'
import {ScrollView, View, Platform, KeyboardAvoidingView, Text} from 'react-native'
import {connect} from 'react-redux'
import {Colors, Fonts, Metrics, Images} from '../../Themes/index'
import {NavigationActions} from 'react-navigation'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {vendorActionCreators} from '../../Store/Vendor/VendorActions';
import {bindActionCreators} from 'redux';
import {Alert} from 'react-native';
import styles from './MenuForm.style'
import {Header, Left, Right, Button, Title, Form, Item, Input, Label, Toast} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import {ImagePicker} from 'expo';
import Avatar from '../../Components/Avatar';
import SnackBar from 'react-native-snackbar-component';

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        vendorActions: bindActionCreators(vendorActionCreators, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(class MenuForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName: "",
            itemDetail: "",
            itemImage: "",
            itemCost: "",
            id: "",
            base64img: null,
            showToast: false
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

    showToast = (toastMessage) => {
        let hideToast = () => {
            setTimeout(() => {
                this.setState({showToast: false, toastMessage: ''})
            }, 2000);
        };

        this.setState({toastMessage, showToast: true}, hideToast);
    };

    onMenuSubmit = () => {
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
                const vendorActions = this.props.vendorActions;
                if (this.state.id) {
                    vendorActions.updateMenu(this.state);
                    this.showToast('Item updated');
                } else {
                    vendorActions.createMenu(this.state);
                    this.showToast('Item Created');
                }
            });
        }
    };

    removeMenu = () => {
        Alert.alert(
            'Are you sure you want to delete item ?', '',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {
                    text: 'OK', onPress: () => {
                    const vendorActions = this.props.vendorActions;
                    vendorActions.removeMenu(this.state);
                    this.resetForm();
                }
                },
            ],
            {cancelable: false}
        );
    };

    navigateBack = () => {
        this.props.navigation.dispatch(NavigationActions.back())
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
                    <Header iosBarStyle="dark-content"
                            style={{backgroundColor: Colors.snow, paddingBottom: Platform.OS === 'android' ? 80 : 0}}>
                        <Left style={{marginTop: Platform.OS === 'android' ? 110 : 0}}>
                            <Button transparent onPress={() => this.navigateBack()}>
                                <Icon name="chevron-left" size={20} color={Colors.background}/>
                            </Button>
                        </Left>
                        <Right/>
                    </Header>

                    <View style={styles.formContainer}>
                        <SnackBar visible={this.state.showToast} textMessage={this.state.toastMessage} position='top' backgroundColor='#272A2F'/>
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
                                        onPress={this.onMenuSubmit}>
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
                                        onPress={this.removeMenu}>
                                    <Text style={{color: Colors.fire}}>Remove</Text>
                                </Button>
                            </Col>
                        </Row>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
})


