import React from 'react';
import { Text } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Colors } from '../../../Themes/index';
import style from '../OrderHistory.style';

export default (props) => {
  const { item } = props;
  return (
    <Grid style={style.vendorOrderItemsContainer}>
      <Row style={{ height: 25 }}>
        <Col size={1}>
          <Row style={{ height: 20 }}>
            <Text style={[{ color: Colors.gray }]}>{item.itemName}</Text>
          </Row>
        </Col>

        <Col size={1}>
          <Row style={{ height: 20, flexDirection: 'column', alignItems: 'flex-end' }}>
            <Text style={style.itemCost}>$ {item.itemCost} x {item.itemCount}</Text>
          </Row>
        </Col>
      </Row>
    </Grid>
  );
};
