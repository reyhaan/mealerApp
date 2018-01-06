import React, {Component} from 'react'
import {
    Text,
    View,
} from 'react-native'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Colors} from '../../Themes/index';


export default class VendorEmail extends Component {
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

                    <Row style={{marginBottom: 20}}>
                        <Text>{this.props.email}</Text>
                    </Row>
                </View>
            )
        } else {
            return null
        }
    }
}