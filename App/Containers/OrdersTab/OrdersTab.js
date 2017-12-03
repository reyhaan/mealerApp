import React, { Component } from 'react'
import { ScrollView, View, Text, Dimensions, StatusBar, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import OrdersTabStyle from './OrdersTab.style'
import { IndividualOrderList } from '../../Components'
import { Colors, Metrics } from '../../Themes'
import {Col, Row, Grid} from 'react-native-easy-grid';
import { Icon, Badge, List, ListItem } from 'react-native-elements'
import authenticationService from '../../Services/authentication-service'

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
      isCustomer: true
    }
  }

  componentDidMount = async () => {
    let currentUser = await authenticationService.currentUser();
    this._setCurrentUserType(currentUser.type)
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
                        color={Colors.snow}
                        type='font-awesome'
                        onPress={() => {}}
                      />
                      <Text style={styles.headerTitle} >YOUR ORDER</Text>
                    </Row>
                  }
                </Col>

                <Col style={{ width: (this.state.isMerchant) ? 80 : 90, flexDirection: 'row', paddingRight: 5 }}>
                  <Col style={{ width: 5, marginRight: (this.state.isMerchant) ? 10 : 0, alignItems: 'flex-start', justifyContent: 'center' }}>
                    <View style={{ width: 1, backgroundColor: Colors.snow, height: 20, marginLeft: (this.state.isMerchant) ? 5 : 0 }}></View>
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
                            size={14}
                            name={'history'}
                            color={Colors.snow}
                            type='font-awesome'
                            onPress={() => {}}
                          />
                          <Text style={styles.headerRightButton}>HISTORY</Text>
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

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTab)
