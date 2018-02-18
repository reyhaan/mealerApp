import React, { Component } from 'react';
import { ImagePicker } from 'expo';
import { Images } from '../Themes/index';
import Avatar from './Avatar';

class UserAvatar extends Component {
    _pickImage = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        base64: true,
      });
      if (!result.cancelled) {
        this.props.setUserAvatar(result);
      }
    };

    render() {
      const { image } = this.props;
      const userImage = image ? { uri: `${image}?${new Date().getTime()}` } : { uri: Images.addImagePlaceHolder };
      return (
        <Avatar image={userImage} _pickImage={this._pickImage} />
      );
    }
}
export default UserAvatar;
