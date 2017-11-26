import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, Platform, StatusBar } from 'react-native'
import { Header, Icon, Button, Avatar, Rating } from 'react-native-elements'
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
    return (
      <Icon
          name={'close'}
          color={Colors.gray}
          style={{ padding: 10 }}
          onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
      />
    )
  };

  _infoButton = () => {
    return (
      <Icon
          name={'ios-information-circle-outline'}
          type='ionicon'
          color={Colors.gray}
          size={28}
          style={{ padding: 10 }}
          onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
      />
    )
  }
  
  render () {
    let { image } = this.state;
    return (
      <View style={styles.mainContainer}>
      <StatusBar barStyle='dark-content'/>

        <Grid>
            <Col size={1} style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ marginTop: 45 }}>
                {this._backButton()}
              </View>
            </Col>

            <Col size={1} style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image
                  source={{uri: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAARGAAAAJGE5ZTUxOWE3LWUwNjItNGZiMi1hMDdkLTA1MzE5YWVlYzBmZQ.jpg'}} 
                  style={styles.userImage}>
              </Image>
            </Col>

            <Col size={1} style={{ alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ marginTop: 45 }}>
                {this._infoButton()}
              </View>
            </Col>


        </Grid>
        
        <View style={ styles.subContainer }>
            <Grid>

                <Row style={{ height: 40, alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                  <Text style={styles.userName}>Mohammad Rehaan</Text>
                </Row>

                <Row style={{ height: 30, alignItems: 'center', justifyContent: 'center' }}>
                  <Rating
                    type="star"
                    ratingColor={Colors.pink2}
                    fractions={1}
                    startingValue={4}
                    readonly
                    imageSize={18}
                    onFinishRating={this.ratingCompleted}
                    style={{ paddingVertical: 2, backgroundColor: Colors.clear}}
                  />
                </Row>

                <Row size={1} style={{ backgroundColor: Colors.snow }}>
                  <Col size={1} style={{ }}>
                    <Row size={1} style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.background }}>70</Text>
                    </Row>
                    <Row size={1} style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', paddingTop: 2 }}>
                      <Text style={{ color: Colors.gray, fontSize: 12 }}>ORDER LIMIT</Text>
                    </Row>
                  </Col>
                  
                  <Col size={1} style={{ }}>
                    <Row size={1} style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.background }}>4.0</Text>
                    </Row>
                    <Row size={1} style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', paddingTop: 2 }}>
                      <Text style={{ color: Colors.gray, fontSize: 12 }}>RATING</Text>
                    </Row>
                  </Col>
                  
                  <Col size={1} style={{ }}>
                    <Row size={1} style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }}>
                      <Text style={{ fontSize: 18, fontWeight: 'bold', color: Colors.background }}>14</Text>
                    </Row>
                    <Row size={1} style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center', paddingTop: 2 }}>
                      <Text style={{ color: Colors.gray, fontSize: 12 }}>ITEMS</Text>
                    </Row>
                  </Col>
                </Row>

            </Grid>

        </View>

      </View>
    )
  }
}
