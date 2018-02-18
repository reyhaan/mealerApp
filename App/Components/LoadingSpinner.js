import React from 'react';
import { View } from 'react-native';
import { Spinner } from 'native-base';
import styles from './Styles/LoadingSpinnerStyle';

export default (props) => {
  if (props.show) {
    return (
      <View style={styles.spinnerContainer}>
        <Spinner color="black"/>
      </View>
    );
  }
  return null;
};

