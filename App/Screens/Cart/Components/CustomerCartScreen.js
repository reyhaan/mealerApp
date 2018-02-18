import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Row, Grid } from 'react-native-easy-grid';
import _ from 'lodash';
import { Colors } from '../../../Themes/index';
import styles from './CustomerCartScreen.style';
import cartService from '../../../Services/cart-service';
import { cartActionCreators } from '../../../Store/Cart/CartActions';

class CustomerCartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    // cart is not yet on state object, populate it from session object
    const cart = await cartService.getCart();
    if (cart) {
      this.initializeUserCart(cart);
    }
  };

  componentWillReceiveProps = async () => {
    const cart = await cartService.getCart();
    if (cart) {
      this.initializeUserCart(cart);
    }
  };

  initializeUserCart = (cart) => {
    if (cart !== undefined && cart !== null && !_.isEmpty(cart)) {
      const merchantIds = [];
      const userCart = [];

      _.forIn(cart.to, (_, merchantId) => {
        merchantIds.push(merchantId);
      });
      merchantIds.forEach((id) => {
        const key = id;
        const itemsObject = cart.to[id];
        const itemIds = [];
        const items = [];

        _.forIn(itemsObject, (_, id) => {
          itemIds.push(id);
        });
        itemIds.forEach((id) => {
          items.push(itemsObject[id]);
        });
        userCart.push({ key, items });
      });

      this.setState({
        merchantDataSourceFromCart: userCart,
      });
    }
  };

  _calculateTotalCost = (rowData) => {
    let total = 0;
    for (let i = 0; i < rowData.length; i++) {
      total += (rowData[i].itemCost * rowData[i].itemCount);
    }
    return parseFloat(total).toFixed(2);
  };

  _updateItemCount = (itemId, merchantId, newCount) => {
    const count = newCount < 1 ? 1 : newCount;
    this.props.updateItemCount({ itemId, merchantId, newCount: count });
  };

  _removeItem = (itemId, merchantId) => {
    this.props.removeItemFromCart({ itemId, merchantId });
  };

  _renderRow = rowData => (
    <View style={styles.row}>
      <View style={styles.rowInnerContainer}>
        <Grid style={{ borderBottomColor: Colors.gray2, borderBottomWidth: 1 }}>

          <Row style={{ height: 30 }}>
            <Col size={1}>
              <Row style={{ height: 20 }}>
                <Text style={[styles.boldLabel, { color: Colors.gray }]}>{rowData.itemName}</Text>
              </Row>
            </Col>

            <Col style={{ width: 100 }}>
              <Row style={{ height: 20, flexDirection: 'column', alignItems: 'flex-end' }}>
                <Text style={styles.itemCost}>$ {rowData.itemCost}</Text>
              </Row>
            </Col>
          </Row>

          <Row style={{ height: 34 }}>
            <Col>
              <TouchableOpacity onPress={() => {
                this._removeItem(rowData.id, rowData.merchantInfo.uid);
              }}
              >
                <Row style={{ height: 30, width: 70, backgroundColor: Colors.clear }}>
                  <Icon
                    size={14}
                    name="trash-o"
                    color={Colors.background}
                    type="font-awesome"
                  />
                  <Text style={styles.itemModify}>&nbsp; Remove</Text>
                </Row>
              </TouchableOpacity>
            </Col>

            <Col style={{ width: 125, padding: 2 }}>
              <Row style={{ height: 30, backgroundColor: Colors.clear }}>
                <TouchableOpacity onPress={() => {
                  this._updateItemCount(rowData.id, rowData.merchantInfo.uid, rowData.itemCount - 1);
                }}
                >
                  <Col style={styles.itemCountButton}>
                    <Icon
                      size={14}
                      name="minus"
                      color={Colors.background}
                      type="font-awesome"
                    />
                  </Col>
                </TouchableOpacity>

                <Col style={{ width: 65 }}>
                  <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.itemCount}>{rowData.itemCount}</Text>
                  </Row>
                </Col>

                <TouchableOpacity onPress={() => {
                  this._updateItemCount(rowData.id, rowData.merchantInfo.uid, rowData.itemCount + 1);
                }}
                >
                  <Col style={styles.itemCountButton}>
                    <Icon
                      size={14}
                      name="plus"
                      color={Colors.background}
                      type="font-awesome"
                    />
                  </Col>
                </TouchableOpacity>
              </Row>
            </Col>
          </Row>

        </Grid>
      </View>
    </View>
  );

  _renderIndividualMerchantRow = cart => (
    <Col style={{ paddingTop: 0, backgroundColor: Colors.snow }}>

      <Row style={{
        paddingLeft: 20,
        paddingTop: 15,
        paddingBottom: 15,
        marginBottom: 5,
        backgroundColor: Colors.snow,
        borderBottomColor: Colors.gray2,
        borderBottomWidth: 1,
        borderTopColor: Colors.gray2,
        borderTopWidth: 1,
      }}
      >
        <Col size={1}>
          <Text style={{ color: Colors.gray3 }}>CHEF:
            <Text style={{
              fontSize: 14,
              color: Colors.gray3,
            }}
            >&nbsp;{cart.items[0].merchantInfo.name.toUpperCase()}
            </Text>
          </Text>
        </Col>

        <Col style={{ width: 80, alignItems: 'flex-end', paddingRight: 20 }}>
          <TouchableOpacity>
            <View>
              <Text
                style={{ color: Colors.background, fontWeight: 'bold', fontSize: 12 }}
              >DETAILS
              </Text>
            </View>
          </TouchableOpacity>
        </Col>
      </Row>

      <Row size={1} style={styles.listContainer}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={cart.items}
          renderItem={({ item }) => this._renderRow(item)}
        />
      </Row>

      <Row style={{ backgroundColor: Colors.snow, paddingBottom: 25, paddingTop: 10 }}>

        <Col size={2} style={{ paddingLeft: 20 }}>
          <Text style={{ color: Colors.charcoal, fontWeight: 'bold' }}>Subtotal</Text>
        </Col>

        <Col size={1} style={{ alignItems: 'flex-end', justifyContent: 'center', paddingRight: 20 }}>
          <Text style={{ color: Colors.charcoal, fontWeight: 'bold' }}>
            $ {this._calculateTotalCost(cart.items)}
          </Text>
        </Col>

      </Row>

      {this.state.merchantDataSourceFromCart.length > 1 &&
      <Row style={{ height: 10, backgroundColor: Colors.gray2 }} />}
    </Col>
  );

  render() {
    return (
      <View style={styles.container}>
        <Grid>
          <Row>
            <FlatList
              contentContainerStyle={styles.listContent}
              data={this.state.merchantDataSourceFromCart}
              renderItem={({ item }) => this._renderIndividualMerchantRow(item)}
            />
          </Row>
        </Grid>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => (bindActionCreators(cartActionCreators, dispatch));
const mapStateToProps = state => ({
  cart: state.cart.cart,
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomerCartScreen);
