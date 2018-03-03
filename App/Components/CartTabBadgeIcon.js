import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconBadge from 'react-native-icon-badge';
import { View, Text } from 'react-native';
import { Colors } from '../Themes/index';


const mapDispatchToProps = dispatch => ({
  dispatch,
});

const mapStateToProps = state => ({
  cart: state.cart,
});

class BadgeIcon extends PureComponent {
  render() {
    let totalItemCount = 0;
    if (this.props.cart.cart && this.props.cart.cart.totalItemCount) {
      // eslint-disable-next-line prefer-destructuring
      totalItemCount = this.props.cart.cart.totalItemCount;
    }

    return (
      <IconBadge
        MainElement={
          <View style={{
            position: 'relative',
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            <Icon
              name="shopping-cart"
              size={20}
              color={this.props.tintColor}
            />
          </View>}
        BadgeElement={
          <Text style={{
            color: '#FFFFFF',
            fontSize: 8,
          }}
          > {totalItemCount}
          </Text>}
        IconBadge={{
          position: 'absolute',
          width: 50,
          height: 50,
          borderRadius: 20,
        }}
        IconBadgeStyle={{
          top: 7,
          right: 0,
          marginTop: 5.5,
          backgroundColor: totalItemCount > 0 ? Colors.background : this.props.tintColor,
        }}
        Hidden={false}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BadgeIcon);
