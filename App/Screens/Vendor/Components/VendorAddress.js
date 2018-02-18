import React, { Component } from 'react';
import {
  Text,
  View,
  Alert, TouchableOpacity,
} from 'react-native';
import { Map } from 'react-native-openanything';
import { Icon } from 'react-native-elements';
import { Row } from 'react-native-easy-grid';
import { Colors } from '../../../Themes/index';

export default class VendorAddress extends Component {
  _fetchVendorAddress = () => {
    Map(this.props.address)
      .catch(() => {
        Alert.alert('Error: ', 'An error occured while opening map');
      });
  };

  render() {
    if (this.props.address) {
      return (
        <View>
          <Row style={{
            borderBottomColor: Colors.steel,
            borderBottomWidth: 1,
            paddingBottom: 10,
            marginBottom: 10,
          }}
          >
            <Text style={{ color: Colors.gray, fontWeight: 'bold' }}>PICKUP ADDRESS</Text>
          </Row>
          <TouchableOpacity onPress={this._fetchVendorAddress}>
            <Row style={{ marginBottom: 20 }}>
              <Text>{this.props.address}</Text>
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
                  name="map-marker"
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
