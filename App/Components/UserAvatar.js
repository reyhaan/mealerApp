import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {ImagePicker} from 'expo'
import {Images} from '../Themes/index'
import Avatar from './Avatar'

class UserAvatar extends Component {
    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            base64: true,
        });
        if (!result.cancelled) {
            this.props.setUserAvatar(result);
        }
    };

    render() {
        let {image} = this.props;
        let userImage = image ? {uri: image + '?' + new Date().getTime()} : Images.addImagePlaceHolder;
        return (
            <Avatar image={userImage } _pickImage={this._pickImage}/>
        )
    }
}

UserAvatar.propTypes = {
    image: PropTypes.string,
    setUserAvatar: PropTypes.func.isRequired
};
export default UserAvatar