import React, { PureComponent } from 'react';
import { View, Platform } from 'react-native';
import { Header, Left, Body, Right, Title } from 'native-base';
import { Colors } from '../Themes/index';

export default class ScreenHeader extends PureComponent {
  render() {
    const { title, rightComponent, leftComponent } = this.props;
    const iosPlatform = Platform.OS === 'ios';
    const androidPlatform = Platform.OS === 'android';
    const iosPlatformWithTitle = iosPlatform && title;
    const androidPlatformWithTitle = androidPlatform && title;
    const iosPlatformWithoutLeftComponent = iosPlatform && !leftComponent;
    const iosPlatformWithoutRightComponent = iosPlatform && !rightComponent;

    return (
      <View>
        <Header
          iosBarStyle="dark-content"
          style={{ backgroundColor: Colors.snow, paddingBottom: androidPlatform ? 80 : 0 }}
        >
          {leftComponent &&
          <Left style={{
            marginTop: androidPlatform ? 125 : 0,
          }}
          >
            {leftComponent()}
          </Left>}
          {iosPlatformWithoutLeftComponent && <Left/>}

          <Body>

            {androidPlatformWithTitle &&
            <Title style={{ color: Colors.background, marginLeft: leftComponent ? -90 : 0, marginTop: 121 }}>
              {title}
            </Title>
            }

            {iosPlatformWithTitle &&
            <Title style={{ color: Colors.background }}>
              {title}
            </Title>
            }
          </Body>

          {rightComponent &&
          <Right style={{
            marginTop: androidPlatform ? 125 : 0,
          }}
          >
            {rightComponent()}
          </Right>
          }
          {iosPlatformWithoutRightComponent && <Right/>}
        </Header>
      </View>
    );
  }
}
