import React, {Component} from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import {ImagePicker} from 'expo';
import {Colors, Fonts, Images} from '../Themes'
import {Button} from 'native-base';

export default class AppImagePicker extends Component {
    constructor(props) {
        super(props);
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
            this.setState({image: result.uri});
            this.props.callback(result.uri);
        }
    };

    render() {
        let {image} = this.state;
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                {!image &&
                <TouchableOpacity style={{marginTop: 25}} onPress={() => this._pickImage()}>
                    <Image
                        style={{
                            maxHeight: 140,
                            maxWidth: 140,
                            borderWidth: 1,
                            borderRadius: 2,
                            borderColor: Colors.gray4
                        }}
                        source={Images.addImagePlaceHolder}
                    />
                </TouchableOpacity>}

                {image &&
                <Image source={{uri: image}} style={{width: 200, height: 200}}/>
                }
            </View>
        )
    }
}
