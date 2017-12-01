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
import {Form, Item, Input, Label, Button} from 'native-base';
import styles from './EditMenuScreen.style'
import {TextInputMask} from 'react-native-masked-text';

class EditMenuScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemName: "",
            itemDetail: "",
            itemImage: "",
            itemCost: "",
            id: ""
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
            id:"",
            itemName: "",
            itemCost: "",
            itemDetail: "",
            itemImage: ""
        })
    };

    onMenuSubmit() {
        let {itemName, itemCost, itemDetail, itemImage} = this.state;

        //TODO: Fix, actually save the user image
        itemImage = "https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/" +
            "v1438133716000/photosp/ig-498695320661758884_396353171/stock-photo-food-soup-healthy-foods-health-recipe-vegan-food-and-drink-stew-ig-498695320661758884_396353171.jpg"

        if (itemName &&
            itemDetail &&
            itemImage &&
            itemCost &&
            itemCost.slice(4, itemCost.length) > 0) {
            this.setState({
                itemCost: itemCost,
                itemImage: itemImage //TODO: Fix
            }, () => {
                if (this.state.id){
                    this.props.updateMenu(this.state);
                } else  {
                    this.props.createMenu(this.state);
                }
                this.props.navigation.dispatch(NavigationActions.back())
            });
        }
        else {
            Alert.alert("Please check menu values")
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
                iconStyle={{marginTop: 30, marginLeft:-15}}
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
                            <Item stackedLabel>
                                <Label>Name</Label>
                                <Input autoCapitalize="none"
                                       onChangeText={(e) => this.formUpdate('itemName', e)}
                                       underlineColorAndroid="transparent"
                                       value={this.state.itemName}/>
                            </Item>
                            <Item stackedLabel>
                                <Label>Price</Label>
                                <TextInputMask
                                    ref={'moneyUnit'}
                                    type={'money'}
                                    options={{
                                        separator: '.',
                                        delimiter: ',',
                                        unit: 'CAD$ '
                                    }}
                                    value={this.state.itemCost}
                                    onChangeText={(e) => this.formUpdate('itemCost', e)}
                                    style={{width: '100%', height: 50}}
                                    placeholder="CAD$ 0.00" 
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
                                        style={{backgroundColor:Colors.green}}
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
    return bindActionCreators(merchantActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMenuScreen)
