import React, {Component} from 'react'
import styles from './Styles/LoadingSpinnerStyle'
import {View, ActivityIndicator} from 'react-native'


class LoadingSpinner extends Component {
    render() {
        if (this.props.show) {
            return (
                <View style={styles.spinnerContainer}>
                    <ActivityIndicator color='black' size='large' style={styles.spinner}/>
                </View>
            )
        } else {
            return null;
        }
    }
}

export default LoadingSpinner;