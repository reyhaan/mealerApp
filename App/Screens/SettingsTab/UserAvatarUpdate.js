import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Button, Image, View } from 'react-native'
import { ImagePicker } from 'expo'
import { Images } from '../../Themes'
import Avatar from '../Common/Avatar'

class UserAvatar extends Component {
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      base64: true,
    });
    console.log(result);

    if (!result.cancelled) {
      this.props.setUserAvatar({ image: result.uri });
    }
  };

  render () {
    let { image } = this.props
    let userImage = image ? {uri: image} : Images.addImagePlaceHolder;
    return (
      <Avatar image={userImage} _pickImage={this._pickImage}/>
    )
  }
}

UserAvatar.propTypes = {
  image: PropTypes.string,
  setUserAvatar: PropTypes.func.isRequired
}
export default UserAvatar