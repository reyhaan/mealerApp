import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native'
import {ImagePicker} from 'expo';
import {Colors, Fonts, Images} from '../Themes'
import {Button} from 'native-base';
import style from './Styles/AddToCartModalStyle'
import Modal from 'react-native-modal'
import {Col, Row, Grid} from 'react-native-easy-grid'
import {Header, Avatar, Icon} from 'react-native-elements'
import { AddToCartButton } from './index';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { cartActionCreators } from '../Redux/Cart/CartActions'
import { Constants } from '../Utils/Constants'

class AddToCartModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeMerchant: '',
            activeItem: '',
            isModalVisible: false
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            isModalVisible: newProps.visible,
            activeItem: newProps.activeItem,
            activeMerchant: newProps.activeMerchant
        })
    }

    _hideModal = () => {
        this.setState({
            isModalVisible: false
        })
    }

    addToCartButtonCallback = (itemCount) => {
        let orderItem = {
            from: this.props.user.uid,
            to: this.state.activeMerchant.uid,
            item: this.state.activeItem,
            itemCount: itemCount,
            status: Constants.orderStatus.new
        }
        this.props.addToCart(orderItem)
    }

    render() {
        return (
            <Modal isVisible={this.state.isModalVisible} backdropOpacity={0.4} onBackButtonPress={() => this._hideModal()} style={style.modalContainer}>
                <View style={style.addItemModal}>
                    <Grid>
                        <Row style={{ height: 200 }}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 3, borderTopRightRadius: 3}}>
                                <Image style={style.modal_itemImage}
                                    source={{uri: this.state.activeItem.itemImage}}/>
                            </View>
                        </Row>

                        <Row style={{ height: 60 }}>
                            <Col size={1} style={{ alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 20, paddingTop: 10 }}>
                                <Icon
                                    name={'times'}
                                    color={Colors.gray3}
                                    type='font-awesome'
                                    onPress={() => this._hideModal()}
                                />
                            </Col>
                            <Col size={2} style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                                <Text ellipsizeMode="tail" style={style.modal_itemName}>{this.state.activeItem.itemName}</Text>
                                <Text style={style.modal_itemCost}>$ {this.state.activeItem.itemCost}</Text>
                            </Col>
                        </Row>

                        <Row style={{ padding: 10, borderTopWidth: 1, borderTopColor: Colors.lightGray, marginTop: 10 }}>
                            <ScrollView style={{ flex: 1 }}>
                                <Text ellipsizeMode="tail" style={style.modal_itemDetails}>{this.state.activeItem.itemDetail}</Text>
                            </ScrollView>
                        </Row>

                        <Row style={{ height: 60 }}>
                            <AddToCartButton callback={(itemCount) => this.addToCartButtonCallback(itemCount)}></AddToCartButton>
                        </Row>
                    </Grid>
                </View>
            </Modal>
        )
    }
}

const mapDispatchToProps = (dispatch) => (bindActionCreators(cartActionCreators, dispatch));
const mapStateToProps = state => {
    return {
        user: state.settings.user,
        shouldHideAddToCartModal: state.cart.shouldHideAddToCartModal,
        cart: state.cart
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartModal)