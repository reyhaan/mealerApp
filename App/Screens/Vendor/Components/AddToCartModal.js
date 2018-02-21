import React, { Component } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Modal from 'react-native-modal';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Icon } from 'react-native-elements';
import { Colors } from '../../../Themes/index';
import style from './AddToCartModal.style';
import AddToCartButton from './AddToCartButton';
import { cartActionCreators } from '../../../Store/Cart/CartActions';
import Constants from '../../../Constants/Constants';

class AddToCartModal extends Component {
    addItemToCart = (itemCount) => {
      const { user } = this.props;
      const orderItem = {
        from: user.currentUser.uid,
        to: this.props.selectedVendor.uid,
        item: Object.assign({}, this.props.selectedItem),
        itemCount,
        status: Constants.orderStatus.new,
        merchantInfo: this.props.selectedVendor,
      };

      this.props.cartActions.addToCart(orderItem);
      this.props.closeSelectedItemModal();
    };

    render() {
      return (
        <Modal
          isVisible={this.props.showSelectedItem}
          backdropOpacity={0.4}
          onBackButtonPress={() => this.closeSelectedItemModal()}
          style={style.modalContainer}
        >
          <View style={style.addItemModal}>
            <Grid>
              <Row style={{ height: 200 }}>
                <View style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderTopLeftRadius: 3,
                  borderTopRightRadius: 3,
                }}
                >
                  <Image
                    style={style.modal_itemImage}
                    source={{ uri: this.props.selectedItem.itemImage }}
                  />
                </View>
              </Row>

              <Row style={{ height: 60 }}>
                <Col
                  size={1}
                  style={{
                    alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 20, paddingTop: 10,
                  }}
                >
                  <Icon
                    name="times"
                    color={Colors.gray3}
                    type="font-awesome"
                    onPress={() => this.props.closeSelectedItemModal()}
                  />
                </Col>
                <Col size={2} style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                  <Text ellipsizeMode="tail" style={style.modal_itemName}>{this.props.selectedItem.itemName}</Text>
                  <Text style={style.modal_itemCost}>$ {this.props.selectedItem.itemCost}</Text>
                </Col>
              </Row>

              <Row style={{
                padding: 10, borderTopWidth: 1, borderTopColor: Colors.lightGray, marginTop: 10,
              }}
              >
                <ScrollView style={{ flex: 1 }}>
                  <Text ellipsizeMode="tail" style={style.modal_itemDetails}>{this.props.selectedItem.itemDetail}</Text>
                </ScrollView>
              </Row>

              <Row style={{ height: 60 }}>
                <AddToCartButton callback={itemCount => this.addItemToCart(itemCount)} />
              </Row>
            </Grid>
          </View>
        </Modal>
      );
    }
}

const mapDispatchToProps = dispatch => ({
  cartActions: bindActionCreators(cartActionCreators, dispatch),
});
const mapStateToProps = state => ({
  user: state.user,
  cart: state.cart,
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToCartModal);
