import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { Colors } from '../../../Themes/index';
import styles from './VendorsInCart.style';
import ItemSection from './ItemSection';
import VendorSectionHeader from './VendorSectionHeader';

export default class VendorSection extends PureComponent {
  render() {
    const { cart } = this.props;
    return (
      <Col style={{ paddingTop: 0, backgroundColor: Colors.snow }}>
        <VendorSectionHeader {...this.props} />
        <Row size={1} style={styles.listContainer}>
          <FlatList
            contentContainerStyle={styles.listContent}
            data={cart.items}
            extraData={this.props}
            renderItem={({ item }) => <ItemSection {...this.props} item={item}/>}
          />
        </Row>
      </Col>
    );
  }
}
