import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { Grid, Col, Row } from 'react-native-easy-grid';
import { Switch } from 'native-base';
import { Colors } from '../../../Themes/index';

const style = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.snow,
    borderBottomColor: Colors.gray2,
    borderBottomWidth: 1,
    borderTopColor: Colors.gray2,
    borderTopWidth: 1,
  },
  vendorNameContainer: {
    flex: 1,
    alignSelf: 'center',
  },
  vendorNameText: {
    fontSize: 14,
    color: Colors.gray3,
  },
  deliveryType: {
    marginLeft: 10,
    color: Colors.gray3,
  },
  vendorDeliveryMethodSwitch: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default class VendorSectionHeader extends Component {
  setVendorDeliveryType = (state) => {
    const { cartActions, cart } = this.props;
    const vendor = cart.items[0].merchantInfo;
    cartActions.setOrderDeliveryType({
      vendorId: vendor.id,
      delivery: state,
    });
  };

  render() {
    const { cart } = this.props;
    const delivery = Boolean(cart.items[0].delivery);
    return (
      <Grid style={style.container}>
        <Row style={style.vendorNameContainer}>
          <Text style={style.vendorNameText}>
            {cart.items[0].merchantInfo.name.toUpperCase()}
          </Text>
        </Row>
        <Row>
          <Col>
            <Text style={style.deliveryType}>
              {delivery ? 'Delivery' : 'Pick-Up'}
            </Text>
          </Col>
          <Col style={style.vendorDeliveryMethodSwitch}>
            <Switch
              value={delivery}
              onValueChange={this.setVendorDeliveryType}
              switchOnTintColor={Colors.background}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}
