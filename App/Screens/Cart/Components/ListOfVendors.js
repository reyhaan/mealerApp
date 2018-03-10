import React from 'react';
import { View, FlatList } from 'react-native';
import { Row, Grid } from 'react-native-easy-grid';
import styles from './VendorsInCart.style';
import VendorSection from './VendorSection';

export default (props) => {
  return (
    <View style={styles.container}>
      <Grid>
        <Row>
          <FlatList
            contentContainerStyle={styles.listContent}
            data={props.cart.vendors}
            renderItem={({ item }) => <VendorSection {...props} cart={item} />}
          />
        </Row>
      </Grid>
    </View>
  );
};
