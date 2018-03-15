import React from 'react';
import { Text } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Colors } from '../../../Themes/index';

export default props => (
  <Grid>
    {props.cart.items[0].delivery &&
    <Row style={{ backgroundColor: Colors.snow, paddingBottom: 25, paddingTop: 10 }}>
      <Col size={2} style={{ paddingLeft: 20 }}>
        <Text style={{ color: Colors.charcoal, fontWeight: 'bold' }}>Delivery</Text>
      </Col>

      <Col size={1} style={{ alignItems: 'flex-end', justifyContent: 'center', paddingRight: 20 }}>
        <Text style={{ color: Colors.charcoal, fontWeight: 'bold' }}>
          $ {props.cart.deliveryFee}
        </Text>
      </Col>
    </Row>
    }

    <Row style={{ backgroundColor: Colors.snow, paddingBottom: 25, paddingTop: 10 }}>
      <Col size={2} style={{ paddingLeft: 20 }}>
        <Text style={{ color: Colors.charcoal, fontWeight: 'bold' }}>Subtotal</Text>
      </Col>

      <Col size={1} style={{ alignItems: 'flex-end', justifyContent: 'center', paddingRight: 20 }}>
        <Text style={{ color: Colors.charcoal, fontWeight: 'bold' }}>
          $ {props.cart.totalCost}
        </Text>
      </Col>
    </Row>
  </Grid>
);
