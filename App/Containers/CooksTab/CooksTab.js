import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { connect } from 'react-redux'
import { CooksTabStyle } from '../Styles'
import { Header } from 'react-native-elements' 

import { Colors } from '../../Themes'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
const styles = CooksTabStyle

class CooksTab extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    return (
      <View style = {styles.container}>
        <Header
          leftComponent = {{ icon: 'filter', color: '#fff', type: 'font-awesome' }}
          centerComponent = {{ text: 'COOKS', style: { color: '#fff' } }}
          rightComponent = {{ icon: 'search', color: '#fff' }}
          backgroundColor = {Colors.background}
          outerContainerStyles = { styles.headerOuterContainer }
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(CooksTab)
