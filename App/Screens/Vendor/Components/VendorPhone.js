import React, { Component } from 'react';
import {
  Text,
  View,
  Alert, TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { Call } from 'react-native-openanything';
import { Row } from 'react-native-easy-grid';
import { Colors } from '../../../Themes/index';

export default class VendorPhone extends Component {
  _callVendor = () => {
    Call(this.props.phone).catch(() => Alert.alert('Error', 'An error occured while making your call'));
  };

  render() {
    if (this.props.phone) {
      return (
        <View>
          <Row style={{
            borderBottomColor: Colors.steel,
            borderBottomWidth: 1,
            paddingBottom: 10,
            marginBottom: 10,
          }}
          >
            <Text style={{ color: Colors.gray, fontWeight: 'bold' }}>PHONE</Text>
          </Row>
          <TouchableOpacity onPress={this._callVendor}>
            <Row style={{ marginBottom: 20 }}>
              <Text>{this.props.phone}</Text>
              <View
                style={{
                  position: 'absolute',
                  right: 30,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <View
                  style={{
                    height: 30,
                    width: 1,
                    backgroundColor: Colors.steel,
                  }}
                />
                <Icon
                  raised
                  name="phone-square"
                  type="font-awesome"
                  color="#87CEFA"
                  size={13}
                  containerStyle={{ marginTop: 0, marginLeft: 20 }}
                />
              </View>
            </Row>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }
}
