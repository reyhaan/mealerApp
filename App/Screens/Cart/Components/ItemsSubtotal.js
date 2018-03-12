import React from 'react';
import { Text } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { Colors } from '../../../Themes/index';

function itemsTotalCost(rowData) {
  let total = 0;
  for (let i = 0; i < rowData.length; i++) {
    total += (rowData[i].itemCost * rowData[i].itemCount);
  }

  return parseFloat(total).toFixed(2);
}

export default props => (
  <Row style={{ backgroundColor: Colors.snow, paddingBottom: 25, paddingTop: 10 }}>
    <Col size={2} style={{ paddingLeft: 20 }}>
      <Text style={{ color: Colors.charcoal, fontWeight: 'bold' }}>Subtotal</Text>
    </Col>

    <Col size={1} style={{ alignItems: 'flex-end', justifyContent: 'center', paddingRight: 20 }}>
      <Text style={{ color: Colors.charcoal, fontWeight: 'bold' }}>
        $ {itemsTotalCost(props.cart.items)}
      </Text>
    </Col>
  </Row>
);
