import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Col, Row } from 'react-native-easy-grid';
import { Colors } from '../../../Themes/index';

export default (props) => {
  const { cart } = props;
  return (
    <Row style={{
      paddingLeft: 20,
      paddingTop: 15,
      paddingBottom: 15,
      marginBottom: 5,
      backgroundColor: Colors.snow,
      borderBottomColor: Colors.gray2,
      borderBottomWidth: 1,
      borderTopColor: Colors.gray2,
      borderTopWidth: 1,
    }}
    >
      <Col size={1}>
        <Text style={{ color: Colors.gray3 }}>CHEF:
          <Text style={{
            fontSize: 14,
            color: Colors.gray3,
          }}
          >&nbsp;{cart.items[0].merchantInfo.name.toUpperCase()}
          </Text>
        </Text>
      </Col>

      <Col style={{ width: 80, alignItems: 'flex-end', paddingRight: 20 }}>
        <TouchableOpacity>
          <View>
            <Text
              style={{ color: Colors.background, fontWeight: 'bold', fontSize: 12 }}
            >DETAILS
            </Text>
          </View>
        </TouchableOpacity>
      </Col>
    </Row>
  );
};
