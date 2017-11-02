import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import { connect } from 'react-redux'
import {Button, Text} from 'react-native-elements'
import {SettingsTabStyle} from '../Styles'

import { Colors } from '../../Themes'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import { List, ListItem } from 'react-native-elements'

// Styles
const styles = SettingsTabStyle

const list = [
  {
    name: 'Address',
    icon: 'home',
    screen: ''
  },
  {
    name: 'Display Name',
    icon: 'user',
    screen: ''
  },
  {
    name: 'Password',
    icon: 'lock',
    screen: 'PasswordChangeScreen'
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
