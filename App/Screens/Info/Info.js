import React, {Component} from 'react'
import {Text, View, Image} from 'react-native'
import {connect} from 'react-redux'
import styles from './Info.style'
import {Colors, Fonts, Images, Metrics} from '../../Themes/index'

class InfoTab extends Component {
    render() {
        return (
            <View style={styles.subContainer}>
                <Image source={Images.logo} style={styles.logo}/>
                <Image source={Images.mealerLogo} style={styles.mealerLogo}/>
                <Text style={{color: Colors.charcoal, marginTop: Metrics.doubleBaseMargin}}>version: 1.0.0</Text>
                <Text style={{color: Colors.charcoal, marginTop: Metrics.doubleBaseMargin}}>copyright © 2017</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoTab)
