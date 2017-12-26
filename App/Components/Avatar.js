import React, {Component} from 'react'
import {Colors} from '../Themes/index'
import PropTypes from 'prop-types'
import {Text, Image, TouchableOpacity, View} from 'react-native'
import {Icon} from 'react-native-elements'
import {Button} from 'native-base';

class Avatar extends Component {
    render() {
        const {image, _pickImage} = this.props;

        console.log(image);
        return (


            <TouchableOpacity onPress={_pickImage} style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20
            }}>
                <Image source={image} style={{width: 150, height: 150, borderRadius: 72}}/>
                <View style={{
                    marginTop: 15,
                    padding: 10,
                    flex: 1,
                    flexDirection: "row",
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start'
                }}>
                    <Icon size={20} name='upload' color={Colors.background} type='font-awesome'/>
                    <Text style={{
                        marginLeft: 10,
                        paddingTop: 2,
                        color: Colors.background,
                        fontWeight: "bold"
                    }}>UPLOAD</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default Avatar