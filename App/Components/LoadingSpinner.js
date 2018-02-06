import React, {Component} from 'react'
import styles from './Styles/LoadingSpinnerStyle'
import {View} from 'react-native'
import { Spinner } from 'native-base';

class LoadingSpinner extends Component {
    render() {
        if (this.props.show) {
            return (
                <View style={styles.spinnerContainer}>
                    <Spinner color='black'/>
                </View>
            )
        } else {
            return null;
        }
    }
}

export default LoadingSpinner;