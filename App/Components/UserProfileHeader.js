import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native'
import { Header, Icon, Button, Avatar } from 'react-native-elements'
import { ImagePicker } from 'expo';
import { Grid, Col, Row } from 'react-native-easy-grid'
import { NavigationActions } from 'react-navigation'

import { Colors, Fonts, Images, Metrics } from '../Themes'
import styles from './Styles/UserProfileHeaderStyle'

export default class UserProfileHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      image: null
    }
  }

  _backButton = () => {
    console.log(this.props)
    return (
        <Icon
            name={Platform.OS === 'ios' ? 'chevron-left' : 'arrow-back'}
            color={Colors.snow}
            onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
        />
    )
  };

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
                      <Row style={{ height: 45, marginTop: Metrics.doubleBaseMargin, marginLeft: 10 }}>
                        <Icon
                            name={Platform.OS === 'ios' ? 'chevron-left' : 'arrow-back'}
                            color={Colors.snow}
                            onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
                        />
                      </Row>
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
