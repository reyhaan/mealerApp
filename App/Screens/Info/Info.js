import React from 'react';
import { Text, View, Image } from 'react-native';
import styles from './Info.style';
import { Colors, Images, Metrics } from '../../Themes/index';

export default () => (
  <View style={styles.subContainer}>
    <Image source={Images.logo} style={styles.logo}/>
    <Image source={Images.mealerLogo} style={styles.mealerLogo}/>
    <Text style={{ color: Colors.charcoal, marginTop: Metrics.doubleBaseMargin }}>version: 1.0.0</Text>
    <Text style={{ color: Colors.charcoal, marginTop: Metrics.doubleBaseMargin }}>copyright © 2017</Text>
  </View>
);
