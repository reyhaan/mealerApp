import React, { Component } from 'react'
import { ScrollView, View, Text, Dimensions, StatusBar, TouchableWithoutFeedback } from 'react-native'
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
    title: 'Active Orders',
    icon: 'av-timer'
  },
  {
    title: 'Confirmed Orders',
    icon: 'flight-takeoff'
  },
  {
    title: 'Cancelled Orders',
    icon: 'av-timer'
  },
  {
    title: 'Delivered Orders',
    icon: 'flight-takeoff'
  }
]

class OrdersTab extends Component {
  constructor (props) {
    super(props)
    console.disableYellowBox = true;
    this.state = {
      showDropdown: false
    }
  }

  _showDropdown = () => {
    this.setState({
      showDropdown: !this.state.showDropdown
    })
  }


  render () {
    return (
      <View style={styles.container}>

        <StatusBar barStyle='dark-content'/>

        { this.state.showDropdown &&
          <View style={styles.dropdownContainer}>
            <List containerStyle={{ marginTop: 0 }}>
              {
                list.map((item, i) => (
                  <ListItem
                    containerStyle={{ borderBottomWidth: 0 }}
                    wrapperStyle={{ borderBottomWidth: 0 }}
                    titleStyle={{ fontSize: 14 }}
                    key={i}
                    title={item.title}
                    rightIcon={<Badge
                      value={3}
                      textStyle={{ color: 'orange' }}
                    />}
                  />
                ))
              }
            </List>
          </View>
        }

        <View style={styles.headerContainer}>
          <View style={styles.headerButtonContainer}>

            <View style={styles.countTag}>
              <Text style={{ color: Colors.background, fontWeight: 'bold', fontSize: 16 }} >24</Text>
            </View>


            <View style={ styles.dropdownButtonContainer }>
              <Grid>
                <Col size={1} style={{ paddingLeft: 50, alignItems:'flex-start', justifyContent: 'center' }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 14, color: Colors.charcoal }} >Active Orders</Text>
                </Col>

                <Col style={{ width: 70, flexDirection: 'row' }}>
                  <Col style={{ alignItems:'center', justifyContent: 'center', width: 20}}>
                    <Icon
                      size={14}
                      name={'filter'}
                      color={Colors.gray3}
                      type='font-awesome'
                      onPress={() => {}}
                    />
                  </Col>
                  <Col style={{ alignItems:'flex-start', justifyContent: 'center'}}>
                    <TouchableWithoutFeedback onPress={() => {this._showDropdown()}}>
                      <View>
                        <Text style={{ fontSize: 12, color: Colors.gray }}>FILTER</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </Col>
                </Col>
              </Grid>
            </View>
          </View>
        </View>

        <ScrollView>

          {/* padding for scrollable list */}
          <View style={{ height: 90, backgroundColor: Colors.cloud }}></View>
      
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
