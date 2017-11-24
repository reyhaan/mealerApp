import React, { Component } from 'react'
import { ScrollView, Text, View, Image } from 'react-native'
import { connect } from 'react-redux'
import { Header } from 'react-native-elements'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './InfoTab.style'
import { Colors, Fonts, Images, Metrics } from '../../Themes/index'

class InfoTab extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{ text: 'INFO', style: { color: '#fff', fontWeight: 'bold' } }}
          backgroundColor={Colors.background}
          outerContainerStyles={styles.headerOuterContainer}
        />
        <View style={styles.subContainer}>
          <Image source={Images.logo} style={styles.logo} />
          <Image source={Images.mealerLogo} style={styles.mealerLogo} />
          <Text style={{ color: Colors.snow, marginTop: Metrics.doubleBaseMargin }} >version: 1.0.0</Text>
          <Text style={{ color: Colors.snow, marginTop: Metrics.doubleBaseMargin }} >copyright © 2017</Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoTab)
