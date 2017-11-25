import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Header, Icon, Button, Avatar } from 'react-native-elements'
import { ImagePicker } from 'expo';
import { Grid, Col, Row } from 'react-native-easy-grid'

import { Colors, Fonts, Images } from '../Themes'
import styles from './Styles/UserProfileHeaderStyle'

export default class UserProfileHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      image: null
    }
  }

  render () {
    let { image } = this.state;
    return (
      <View style={styles.mainContainer}>
        <Image
            source={{uri: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAARGAAAAJGE5ZTUxOWE3LWUwNjItNGZiMi1hMDdkLTA1MzE5YWVlYzBmZQ.jpg'}} 
            style={styles.userImage}>

            <View style={ styles.subContainer }>
                <Grid>

                    <Row style={{ height: 250, backgroundColor: Colors.clear }}>

                    </Row>

                    <Row style={{ height: 50, backgroundColor: "rgba(0, 0, 0, 0.4)", flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Text style={styles.userName}>Mohammad Rehaan</Text>
                    </Row>

                </Grid>

            </View>

        </Image>
      </View>
    )
  }
}
