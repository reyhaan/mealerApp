import React, { Component } from 'react'
import { Colors } from '../Themes/index'
import PropTypes from 'prop-types'
import { Text, Image, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { Button } from 'native-base';

class Avatar extends Component {
  render () {
    const {image, _pickImage } = this.props;
    return (
      <TouchableOpacity onPress={_pickImage} style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
        }}>
        <Image source={image} style={{width: 150, height: 150, borderRadius:72}}/>

        <Button iconLeft bordered small light
                style={{alignSelf: 'center', margin: 10}} onPress={_pickImage}>
            <Icon style={{Left: 50}} name='upload' color={Colors.background} type='font-awesome'/>
            <Text style={{margin: 10}}>Upload</Text>
        </Button>
      </TouchableOpacity>
    )
  }
}

export default Avatar