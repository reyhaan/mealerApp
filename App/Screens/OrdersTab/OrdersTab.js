import React, { Component } from 'react'
import { ScrollView, View, Text, Dimensions, StatusBar, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import OrdersTabStyle from './OrdersTab.style'
import { IndividualOrderList, CustomerCartScreen } from '../../Components'
import { Colors, Metrics, Images } from '../../Themes'
import {Col, Row, Grid} from 'react-native-easy-grid';
import { Icon, Badge, List, ListItem } from 'react-native-elements'
import authenticationService from '../../Services/authentication-service'
import cartService from '../../Services/cart-service'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { cartActionCreators } from '../../Redux/Cart/CartActions'

// Styles
const styles = OrdersTabStyle;

const list = [
  {
    name: 'New Orders',
    key: 'newOrders'
  },
  {
    name: 'Confirmed Orders',
    key: 'confirmedOrders'
  },
  {
    name: 'Cancelled Orders',
    key: 'cancelledOrders'
  },
  {
    name: 'Delivered Orders',
    key: 'deliveredOrders'
  }
]

class OrdersTab extends Component {

  constructor (props) {
    super(props)

    // Turn off warnings for now :/
    console.disableYellowBox = true;

    this.state = {
      showDropdown: false,
      activeFilter: list[0],
      isMerchant: false,
      isCustomer: true,
      isCartEmpty: true
    }
  }

  componentWillReceiveProps = async (newProps) => {
    let cart = await cartService.getCart();
    this._setConfirmOrderButtonVisibility(newProps.cart || cart);
  }
  
  componentDidMount = async () => {
    let currentUser = await authenticationService.currentUser();
    this._setCurrentUserType(currentUser.type)
    
    let cart = await cartService.getCart();
    this._setConfirmOrderButtonVisibility(cart); 

    // Just putting it on state to save it to prevent calling service again
    this.setState({
      activeUser: currentUser
    })
  }

  _doCheckout = () => {
    let data = {
      userInfo: this.state.activeUser
    }
    this.props.doCheckout(data);
  }

  _setConfirmOrderButtonVisibility = async (cart) => {
    if(cart === undefined || cart === null || _.isEmpty(cart) || _.isEmpty(cart.to)) {
      this.setState({
        isCartEmpty: true
      })
    } else {

      let totalCost = await cartService.getTotalCost()

      this.setState({
        totalCost: totalCost,
        isCartEmpty: false
      })
    }
  }

  _setCurrentUserType = (userType) => {
    if (userType === 'customer') {
      this.setState({
        isMerchant: false,
        isCustomer: true
      })
    } else {
      this.setState({
        isMerchant: true,
        isCustomer: false
      })
    }
  }

  _showDropdown = () => {
    this.setState({
      showDropdown: true
    })
  }

  _hideDropdown = () => {
    this.setState({
      showDropdown: false
    })
  }

  _switchFilter = (item) => {
    this._hideDropdown();
    this.setState({
      activeFilter: item
    })
    switch(item.key) {
      case 'newOrders':

        break;

      case 'confirmedOrders':
      
        break;

      case 'cancelledOrders':
      
        break;

      case 'deliveredOrders':

        break;
    }
  }

  _renderCustomerOrder = () => {
    return (
      <Col>

        { this.state.isCartEmpty &&
          <View style={styles.subContainer}>
              <Image source={Images.emptyCart} style={styles.logo}/>
              <Text style={{color: Colors.backgroundGray, marginTop: Metrics.doubleBaseMargin, fontWeight: 'bold', fontSize: 18}}>Your cart is empty!</Text>
          </View>
        }

        { !this.state.isCartEmpty &&
          <CustomerCartScreen></CustomerCartScreen>
        }


      </Col>
    );
  }

  _renderMerchantOrders = () => {
    return (
      <Col>
        <IndividualOrderList></IndividualOrderList>
        <IndividualOrderList></IndividualOrderList>
        <IndividualOrderList></IndividualOrderList>
        <IndividualOrderList></IndividualOrderList>
      </Col>
    );
  }

  render () {
    return (
      <View style={styles.container}>
      
        <StatusBar barStyle='dark-content'/>

        {/* Drop for filter options */}
        { this.state.showDropdown &&
          <View style={styles.dropdownContainer}>
            <List containerStyle={{ marginTop: 0 }}>
              {
                list.map((item, i) => (
                  <TouchableOpacity key={i} onPress={() => {this._switchFilter(item)}}>
                    <ListItem
                      containerStyle={{ borderBottomWidth: 0 }}
                      wrapperStyle={{ borderBottomWidth: 0 }}
                      titleStyle={{ fontSize: 14 }}
                      key={item.key}
                      hideChevron={true}
                      title={item.name}
                      leftIcon={<Badge
                        wrapperStyle={{ paddingRight: 10 }}
                        containerStyle={{ backgroundColor: Colors.background }}
                        value={3}
                        textStyle={{ color: Colors.snow }}
                      />}
                    />
                  </TouchableOpacity>
                ))
              }
            </List>
          </View>
        }


        {/* Main Header section */}
        <View style={styles.headerContainer}>
          <View style={styles.headerButtonContainer}>

            <View style={ styles.dropdownButtonContainer }>
              <Grid>
                <Col size={1} style={{ paddingLeft: 5, alignItems:'flex-start', justifyContent: 'center' }}>
                  { this.state.isMerchant &&
                    <Row>
                      <Badge
                        wrapperStyle={{ alignSelf: 'center' }}
                        containerStyle={{ backgroundColor: Colors.snow }}
                        value={3}
                        textStyle={{ color: Colors.background, fontWeight: 'bold', fontSize: 16 }}
                      />
                      <Text style={styles.headerTitle} >{ this.state.activeFilter.name.toUpperCase() }</Text>
                    </Row>
                  }

                  { this.state.isCustomer &&
                    <Row>
                      <Icon
                        size={16}
                        name={'cutlery'}
                        color={Colors.background}
                        type='font-awesome'
                        onPress={() => {}}
                      />
                      <Text style={styles.headerTitle} >MY CART</Text>
                    </Row>
                  }
                </Col>

                <Col style={{ width: (this.state.isMerchant) ? 80 : 90, flexDirection: 'row', paddingRight: 5 }}>
                  <Col style={{ width: 5, marginRight: (this.state.isMerchant) ? 10 : 0, alignItems: 'flex-start', justifyContent: 'center' }}>
                    <View style={{ width: 1, backgroundColor: Colors.background, height: 20, marginLeft: (this.state.isMerchant) ? 5 : 0 }}></View>
                  </Col>
                  <Col style={{ alignItems:'flex-end', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => {this._showDropdown()}}>
                      { this.state.isMerchant &&
                        <Row>
                          <Icon
                            size={14}
                            name={'filter'}
                            color={Colors.snow}
                            type='font-awesome'
                            onPress={() => {}}
                          />
                          <Text style={styles.headerRightButton}>FILTER</Text>
                        </Row>
                      }

                      { this.state.isCustomer &&
                        <Row>
                          <Icon
                            size={16}
                            name={'archive'}
                            color={Colors.background}
                            onPress={() => {}}
                          />
                          <Text style={styles.headerRightButton}>ORDERS</Text>
                        </Row>
                      }
                    </TouchableOpacity>
                  </Col>
                </Col>
              </Grid>
            </View>

          </View>
        </View>

        {/* Body for List view */}
        <ScrollView>

          {/* padding for scrollable list */}
          <View style={{ height: 80, backgroundColor: Colors.cloud }}></View>
          
          {this.state.isMerchant &&
            <Col>
              {this._renderMerchantOrders()}
            </Col>
          }

          {this.state.isCustomer &&
            <Col>
              {this._renderCustomerOrder()}
            </Col>
          }


        </ScrollView>

        { !this.state.isCartEmpty &&
          <Row style={{ height: 45, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center', margin: 10, borderRadius: 3 }}>
            <TouchableOpacity onPress={() => {this._doCheckout()}}>
              <Row style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: Metrics.screenWidth }}>
                <Text style={{ fontWeight: 'bold', fontSize: 14, color: Colors.snow }}>CHECKOUT:
                  <Text style={{ fontWeight: 'bold', fontSize: 17, color: Colors.snow }}> $ {this.state.totalCost}</Text>
                </Text>
              </Row>
            </TouchableOpacity>
          </Row>
        }

      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => (bindActionCreators(cartActionCreators, dispatch));

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTab)
