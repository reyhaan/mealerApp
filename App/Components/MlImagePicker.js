import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { Header, Icon, Button } from 'react-native-elements'
import { ImagePicker } from 'expo';

import { Colors, Fonts, Images } from '../Themes'
import styles from './Styles/MlImagePickerStyle'

export default class MlImagePicker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      image: null
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      this.props.callback(result.uri);
    }
  };

  render () {
    let { image } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {!image && 
          <TouchableOpacity onPress={() => this._pickImage()}>
            <Image
              style={{height: 90, width: 90, resizeMode: 'contain'}}
              source={Images.addItemImage2x}
            />
          </TouchableOpacity>
        }

        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        }
      </View>
    )
  }
}
