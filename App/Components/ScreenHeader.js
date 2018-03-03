import React from 'react';
import { View, Platform } from 'react-native';
import { Header, Left, Body, Right, Title } from 'native-base';
import { Colors } from '../Themes/index';

export default (props) => {
  const { title, rightComponent, leftComponent } = props;
  const iosPlatformWithoutLeftComponent = Platform.OS === 'ios' && !leftComponent;
  const iosPlatformWithoutRightComponent = Platform.OS === 'ios' && !rightComponent;

  return (
    <View>
      <Header
        iosBarStyle="dark-content"
        style={{ backgroundColor: Colors.snow, paddingBottom: Platform.OS === 'android' ? 80 : 0 }}
      >
        {leftComponent && <Left>{leftComponent()}</Left>}
        {iosPlatformWithoutLeftComponent && <Left/>}
        <Body>
          <Title style={{ color: Colors.background, marginTop: Platform.OS === 'android' ? 110 : 0 }}>
            {title}
          </Title>
        </Body>
        {rightComponent && <Right>{rightComponent()}</Right>}
        {iosPlatformWithoutRightComponent && <Right/>}
      </Header>
    </View>
  );
};

