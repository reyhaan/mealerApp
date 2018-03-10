import React from 'react';
import { FlatList } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { Colors } from '../../../Themes/index';
import styles from './VendorsInCart.style';
import ItemSection from './ItemSection';
import VendorSectionHeader from './VendorSectionHeader';
import ItemsSubtotal from './ItemsSubtotal';

export default (props) => {
  const { cart } = props;
  return (
    <Col style={{ paddingTop: 0, backgroundColor: Colors.snow }}>
      <VendorSectionHeader {...props} />
      <Row size={1} style={styles.listContainer}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={cart.items}
          renderItem={({ item }) => <ItemSection {...props} item={item} />}
        />
      </Row>
      <ItemsSubtotal {...props}/>
      {cart.vendors > 1 && <Row style={{ height: 10, backgroundColor: Colors.gray2 }} />}
    </Col>
  );
};
