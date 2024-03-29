import React from 'react';
import {
  Text,
  Image,
  View,
} from 'react-native';
import { Button } from 'native-base';
import styles from '../Cart.style';
import { Colors, Images } from '../../../Themes/index';

export default props => (
  <View style={styles.emptyCart}>
    <Image source={Images.emptyCart} style={styles.logo} />
    <Button
      block
      success
      style={{ backgroundColor: Colors.background }}
      onPress={() => {
        props.navigation.navigate('Root');
      }}
    >
      <Text style={{
        color: Colors.snow,
        fontSize: 18,
      }}
      >Cart is empty shop now!
      </Text>
    </Button>
  </View>
);
