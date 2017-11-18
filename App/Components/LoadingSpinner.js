import React, {Component} from 'react'
import styles from './Styles/LoadingSpinnerStyle'
import {View, ActivityIndicator} from 'react-native'
import { Spinner } from 'native-base'


class LoadingSpinner extends Component {
    render() {
        if (this.props.show) {
            return (
                <View style={styles.spinnerContainer}>
                    <Spinner></Spinner>
                    {/* <ActivityIndicator color='black' size='large' style={styles.spinner}/> */}
                </View>
            )
        } else {
            return null;
        }
    }
}

export default LoadingSpinner;