import React from 'react';
import { Text, Icon } from 'react-native-elements';
import { View } from 'react-native';
import { Button, Form, Item, Input, Label } from 'native-base';
import LoginScreenStyle from '../Login.style';
import { Colors } from '../../../Themes/index';

export default () => (
  <View style={{
    display: 'flex',
    backgroundColor: 'white',
    height: 300,
    width: '90%',
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 4,
    borderColor: 'white',
    alignSelf: 'center',
    paddingRight: 10,
    paddingLeft: 10,
  }}
  >
    <Form style={LoginScreenStyle.forgotPasswordView}>
      <View style={{ alignSelf: 'flex-end' }}>
        <Icon
          raised
          name="times"
          type="font-awesome"
          color={Colors.bloodOrange}
          onPress={() => this.props.closeResetPasswordModal()}
        />
      </View>
      <Label style={{ color: Colors.charcoal, marginBottom: 10 }}>
        Enter your email address and we will send you a link to reset your password.
      </Label>
      <Item rounded>
        <Input
          autoCapitalize="none"
          placeholder="Enter email"
          style={{ color: Colors.charcoal }}
          keyboardType="email-address"
          onChangeText={e => this.props.handleResetPasswordEmail(e)}
        />
        <Icon active name="mail" style={{ color: Colors.bloodOrange }}/>
      </Item>
      {this.props.auth && this.props.auth.resetPasswordError ?
        <Label style={{ color: 'red', marginBottom: 10, fontSize: 14 }}>
          {`*${this.props.auth.resetPasswordError}`}
        </Label> : null}
      <Button
        block
        success
        style={{ margin: 15 }}
        onPress={() => this.props.sendResetPasswordLink()}
      >
        <Text style={{ color: Colors.snow, fontSize: 16, fontWeight: 'bold' }}>SEND LINK</Text>
      </Button>
    </Form>
  </View>
);

