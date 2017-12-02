import React, { Component } from 'react'
import { ScrollView, View, Text, Dimensions, StatusBar, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import OrdersTabStyle from './OrdersTab.style'
import { IndividualOrderList } from '../../Components'
import { Colors, Metrics } from '../../Themes'
import {Col, Row, Grid} from 'react-native-easy-grid';
import { Icon, Badge, List, ListItem } from 'react-native-elements'

// Styles
const styles = OrdersTabStyle;

const list = [
  {
    name: 'NEW ORDERS',
    key: 'newOrders'
  },
  {
    name: 'CONFIRMED ORDERS',
    key: 'confirmedOrders'
  },
  {
    name: 'CANCELLED ORDERS',
    key: 'cancelledOrders'
  },
  {
    name: 'DELIVERED ORDERS',
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
      activeFilter: list[0]
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


  render () {
    return (
      <View style={styles.container}>

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

        <View style={styles.headerContainer}>
          <View style={styles.headerButtonContainer}>

            <View style={ styles.dropdownButtonContainer }>
              <Grid>
                <Col size={1} style={{ paddingLeft: 5, alignItems:'flex-start', justifyContent: 'center' }}>
                  <Row>
                    <Badge
                      wrapperStyle={{ alignSelf: 'center' }}
                      containerStyle={{ backgroundColor: Colors.snow }}
                      value={3}
                      textStyle={{ color: Colors.background, fontWeight: 'bold', fontSize: 16 }}
                    />
                    <Text style={{ paddingLeft: 10, fontWeight: 'bold', fontSize: 14, color: Colors.snow, alignSelf: 'center', textAlignVertical: 'center' }} >{ this.state.activeFilter.name }</Text>
                  </Row>
                </Col>

                <Col style={{ width: 80, flexDirection: 'row', paddingRight: 5 }}>
                  <Col style={{ width: 5, marginRight: 10, alignItems: 'flex-start', justifyContent: 'center' }}>
                    <View style={{ width: 1, backgroundColor: Colors.snow, height: 20, marginLeft: 5 }}></View>
                  </Col>
                  <Col style={{ alignItems:'flex-end', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={() => {this._showDropdown()}}>
                      <Row>
                        <Icon
                          size={14}
                          name={'filter'}
                          color={Colors.snow}
                          type='font-awesome'
                          onPress={() => {}}
                        />
                        <Text style={{ marginLeft: 10, fontSize: 12, color: Colors.snow, alignSelf: 'center', textAlignVertical: 'center' }}>FILTER</Text>
                      </Row>
                    </TouchableOpacity>
                  </Col>
                </Col>
              </Grid>
            </View>
          </View>
        </View>

        <ScrollView>

          {/* padding for scrollable list */}
          <View style={{ height: 80, backgroundColor: Colors.cloud }}></View>
      
          <IndividualOrderList></IndividualOrderList>
          <IndividualOrderList></IndividualOrderList>
          <IndividualOrderList></IndividualOrderList>
          <IndividualOrderList></IndividualOrderList>

        </ScrollView>

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTab)
