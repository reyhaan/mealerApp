import React, {Component} from 'react'
import {
    Text,
    View,
    Alert, TouchableOpacity
} from 'react-native'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Colors} from '../../../Themes/index';
import {Email} from 'react-native-openanything';
import {Icon} from 'react-native-elements';


export default class VendorEmail extends Component {
    _emailVendor = () => {
        Email(to = this.props.email, subject = 'Mealer Order Placement')
            .catch(
                error => {
                    Alert.alert('Error: ', 'An error occured while sending email')
                }
            )
    };

    render() {
        if (this.props.email) {
            return (
                <View>
                    <Row style={{
                        borderBottomColor: Colors.steel,
                        borderBottomWidth: 1,
                        paddingBottom: 10,
                        marginBottom: 10
                    }}>
                        <Text style={{color: Colors.gray, fontWeight: 'bold'}}>EMAIL</Text>
                    </Row>
                    <TouchableOpacity onPress={this._emailVendor}>
                        <Row style={{marginBottom: 20}}>
                            <Text>{this.props.email}</Text>
                            <View
                                style={{
                                    position: 'absolute',
                                    right: 30,
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end'
                                }}>
                                <View
                                    style={{
                                        height: 30,
                                        width: 1,
                                        backgroundColor: Colors.steel
                                    }}
                                />
                                <Icon
                                    raised
                                    name='envelope'
                                    type='font-awesome'
                                    color='#87CEFA'
                                    size={13}
                                    containerStyle={{marginTop: 0, marginLeft: 20}}
                                />
                            </View>
                        </Row>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return null
        }
    }
}