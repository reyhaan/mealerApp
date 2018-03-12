import React, { PureComponent } from 'react';
import { View, FlatList } from 'react-native';
import { Row, Grid } from 'react-native-easy-grid';
import styles from './VendorsInCart.style';
import VendorSection from './VendorSection';

export default class ListOfVendors extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Grid>
          <Row>
            <FlatList
              contentContainerStyle={styles.listContent}
              data={this.props.cart.vendors}
              extraData={this.props}
              renderItem={({ item }) => <VendorSection {...this.props} cart={item}/>}
            />
          </Row>
        </Grid>
      </View>
    );
  }
}
