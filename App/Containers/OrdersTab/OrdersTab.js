import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import { connect } from 'react-redux'
import {OrdersTabStyle} from '../Styles'
import { Header } from 'react-native-elements' 
import { IndividualOrderList } from '../../Components'

import { Colors } from '../../Themes'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles

const styles = OrdersTabStyle;

class OrdersTab extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    return (
      <View style={styles.container}>
        <Header
          centerComponent = {{ text: 'ORDERS', style: { color: '#fff', fontWeight: 'bold' } }}
          backgroundColor = {Colors.background}
          outerContainerStyles = { styles.headerOuterContainer }
        />

        <ScrollView>

          <IndividualOrderList></IndividualOrderList>
          <IndividualOrderList></IndividualOrderList>
          <IndividualOrderList></IndividualOrderList>
          <IndividualOrderList></IndividualOrderList>

        </ScrollView>

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

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTab)