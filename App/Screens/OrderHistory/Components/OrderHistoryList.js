import React from 'react';
import { Text, FlatList } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { Colors } from '../../../Themes/index';
import OrderHistory from './OrderHistory';

export default (props) => {
  const { order } = props;
  return (
    <Col>
      <Row style={{ padding: 10, backgroundColor: '#F5F5F5' }}>
        <Text style={{ color: Colors.gray3 }}>ORDER # {order.id}</Text>
      </Row>
      <Col style={{ backgroundColor: Colors.snow }}>
        <FlatList
          style={{ backgroundColor: Colors.snow }}
          data={order.ordersToVendor}
          renderItem={({ item }) => <OrderHistory order={item}/>}
        />
      </Col>
    </Col>
  );
};
