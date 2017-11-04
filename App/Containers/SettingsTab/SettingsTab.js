import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import {Button, Text, List, ListItem} from 'react-native-elements'
import {SettingsTabStyle} from '../Styles'

import { Colors } from '../../Themes'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import Header from '../../Components/Header'

// Styles
const styles = SettingsTabStyle

const list = [
  {
    name: 'Address',
    icon: 'home',
    screen: 'UserInfoChangeScreen'
  },
  {
    name: 'Display Name',
    icon: 'user',
    screen: 'UserInfoChangeScreen'
  },
  {
    name: 'Password',
    icon: 'lock',
    screen: 'UserInfoChangeScreen'
  },
  {
    name: 'Logout',
    icon: 'sign-out',
    screen: ''
  }
]

class SettingsTab extends Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {}
  // }

  render () {
    return (
      <ScrollView style={styles.container}>

          <Header style={{marginBottom: 40}} />

          <List wrapperStyle={styles.listWrapper} containerStyle={styles.listContainer}>
            {
              list.map((l, i) => (
                <ListItem
                  underlayColor={Colors.backgroundDarker}
                  onPress={() => {this.props.navigation.navigate(l.screen)}}
                  chevronColor='#FFFFFF'
                  titleStyle={styles.listTitle}
                  containerStyle={styles.listItem}
                  leftIcon={{name: l.icon, type: 'font-awesome', style: {color: '#FFFFFF', fontSize: 18} }}
                  key={i}
                  title={l.name}
                />
              ))
            }
          </List>
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsTab)
