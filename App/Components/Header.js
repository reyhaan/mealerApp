import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import styles from './Styles/HeaderStyle'

import {List, ListItem} from 'react-native-elements'
import { Colors } from '../Themes'

const list = [
  {
    name: 'Mohammad Rehaan',
    screen: ''
  }
]

export default class Header extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render () {
    return (
      <View style={styles.container}>
        <List wrapperStyle={styles.listWrapper} containerStyle={styles.listContainer}>
          {
            list.map((l, i) => (
              <ListItem
                roundAvatar
                hideChevron={true}
                titleStyle={styles.listTitle}
                containerStyle={styles.listItem}
                key={i}
                title={l.name}
                subtitleContainerStyle={styles.subtitleContainer}
                subtitleStyle={styles.subtitle}
                subtitle='mohammad.rehaan@hotmail.com'
                avatar={{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}
                avatarContainerStyle={styles.avatarContainer}
                
              />
            ))
          }
        </List>
      </View>
    )
  }
}
