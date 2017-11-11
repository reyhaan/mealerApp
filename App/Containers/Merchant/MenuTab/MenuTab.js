import React, { Component } from 'react'
import { ScrollView, Text } from 'react-native'
import { connect } from 'react-redux'
import { MenuTabStyle } from '../../Styles'
import { Header } from 'react-native-elements' 

import { Colors } from '../../../Themes'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles

const styles = MenuTabStyle;

class MenuTab extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    return (
      <ScrollView style={styles.container}>
        <Header
          centerComponent = {{ text: 'MENU', style: { color: '#fff', fontWeight: 'bold' } }}
          backgroundColor = {Colors.background}
          outerContainerStyles = { styles.headerOuterContainer }
        />
      </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuTab)