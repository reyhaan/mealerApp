import React, { Component } from 'react';
import {
  FlatList,
  ScrollView,
  View,
  Text,
  Image,
  Platform,
} from 'react-native';
import { Col } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header, Left, Body, Right, Title, Button } from 'native-base';
import style from './OrderHistory.style';
import { Colors, Metrics, Images } from '../../Themes/index';
import { orderActionCreators } from '../../Store/Order/OrderActions';
import OrderHistoryList from './Components/OrderHistoryList';
import LoadingSpinner from '../../Components/LoadingSpinner';

class OrderHistory extends Component {
  componentWillMount = () => {
    const { user, orderActions } = this.props;
    orderActions.getOrders(user.currentUser.uid);
  };

  render() {
    const { props } = this;
    const { orderHistory } = props;
    const showOrdersList = orderHistory && orderHistory.length > 0;

    return (
      <Col style={style.container}>
        <Header
          iosBarStyle="dark-content"
          style={{ backgroundColor: Colors.snow, paddingBottom: Platform.OS === 'android' ? 80 : 0 }}
        >
          <Left style={{ marginTop: Platform.OS === 'android' ? 110 : 0 }}>
            <Button
              transparent
              onPress={() => props.navigation.dispatch(NavigationActions.back())}
            >
              <Icon name="chevron-left" size={20} color={Colors.background}/>
            </Button>
          </Left>
          <Body>
            <Title style={{
              color: Colors.background,
              marginTop: Platform.OS === 'android' ? 110 : 0,
            }}
            >Order History
            </Title>
          </Body>
          <Right/>
        </Header>

        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
          <LoadingSpinner show={props.order && props.order.showActivityIndicator}/>

          {showOrdersList &&
          <FlatList
            data={props.orderHistory}
            renderItem={({ item }) => <OrderHistoryList order={item}/>}
          />}

          {!showOrdersList &&
          <View style={style.emptyHistoryContainer}>
            <Image source={Images.emptyCart} style={style.emptyHistoryLogo}/>
            <Text style={{
              color: Colors.backgroundGray,
              marginTop: Metrics.doubleBaseMargin,
              fontWeight: 'bold',
              fontSize: 18,
            }}
            >Your have no previous orders!
            </Text>
          </View>}
        </ScrollView>
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  orderHistory: state.orderHistory,
});
const mapDispatchToProps = dispatch => ({
  orderActions: bindActionCreators(orderActionCreators, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
