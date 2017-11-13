import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, ListView } from 'react-native'
import { Header, Icon, Button, Avatar, ButtonGroup } from 'react-native-elements'
import { Col, Row, Grid } from 'react-native-easy-grid';

import { Colors, Fonts, Images } from '../Themes'
import styles from './Styles/IndividualOrderListStyle'

export default class MlImagePicker extends Component {
	constructor (props) {
		super(props)

    this.orders = [
      {
        itemName: "Chicken Biryani",
        itemImage: Images.biryani,
        itemDetail: "A famous dish from India, made with slowly cooking rice with spicy chicken.",
				itemCost: 6.99,
				quantity: 2
      },
      {
        itemName: "Chicken Biryani",
        itemImage: Images.biryani,
        itemDetail: "A famous dish from India, made with slowly cooking rice with spicy chicken.",
				itemCost: 6.99,
				quantity: 1
      },
      {
        itemName: "Chicken Biryani",
        itemImage: Images.biryani,
        itemDetail: "A famous dish from India, made with slowly cooking rice with spicy chicken.",
				itemCost: 6.99,
				quantity: 5
      }
		]
		
		this.orderObject = {
			orders: this.orders,
			customerName: "Mohammad Rehaan"
		}

		const rowHasChanged = (r1, r2) => r1 !== r2

		const ds = new ListView.DataSource({rowHasChanged})

		this.state = {
        dataSource: ds.cloneWithRows(this.orderObject.orders),
        index: 4,
        isMerchant: true,
        isCustomer: false
		}

	}

	_calculateTotalCost = () => {
		let total = 0;
		for(let i = 0; i < this.orderObject.orders.length; i++) {
			total += (this.orderObject.orders[i].itemCost * this.orderObject.orders[i].quantity)
		}
		return total;
	}

	_renderRow = (rowData) => {
    return (
      <View style={styles.row}>
        <View style={styles.rowInnerContainer}>
          <Grid>
              <Col style={{ width: 60 }}>
                  <Avatar
                    medium
                    source={rowData.itemImage}
                  />
              </Col>
              <Col>
                  <Row style={{ height: 20}}>
                      <Text style={styles.boldLabel}>{rowData.itemName}</Text>
                  </Row>
                  <Row style={{ height: 26 }}>
                      <Text style={{fontSize: 11, color: Colors.charcoal}} numberOfLines={2} >{rowData.itemDetail}</Text>
                  </Row>
              </Col>
              <Col style={{ width: 80 }}>
                  <Row style={{ height: 20, flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={styles.itemCost}>$ {rowData.itemCost}
                      <Text style={{ color: Colors.background, fontSize: 12 }}> x {rowData.quantity}</Text>
                    </Text>
                  </Row>
              </Col>
          </Grid>
        </View>
      </View>
    )
	}
	
	_noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  _updateIndex = (index) => {
    this.setState({index})
  }

  _setButtonColor = () => {
    switch (this.state.index) {
      case 0:
        return Colors.error
        break;
      
      case 1:
        return Colors.darkOrange
        break;
      
      case 2:
        return Colors.green
        break;
      
      default:
        return Colors.snow
    }
  }

  _getOrderStatus = () => {
    let status = 'CONFIRMED'
    switch (status) {
      case 'CANCELLED':
        return (<Text style={{ color: Colors.pink, fontWeight: 'bold', fontSize: 12 }}>: CANCELLED</Text>)
        break;
      
      case 'CONFIRMED':
        return (<Text style={{ color: Colors.orange, fontWeight: 'bold', fontSize: 12 }}>: CONFIRMED</Text>)
        break;
      
      case 'DELIVERED':
        return (<Text style={{ color: Colors.green, fontWeight: 'bold', fontSize: 12 }}>: DELIVERED</Text>)
        break;
      
      default:
        return (<Text style={{ color: Colors.darkOrange, fontWeight: 'bold', fontSize: 12 }}>: CONFIRMED</Text>)
    }
  }

  render () {
    let { isMerchant, isCustomer } = this.state
    return (
      <View style={styles.container}>
        <Grid>
					<Col style={{ padding: 10 }}>

						<Row style={{ paddingLeft: 10 }}>
							<Text style={{ color: Colors.snow }} >From
								<Text style={{ fontWeight: 'bold', color: Colors.snow }}>: { this.orderObject.customerName }</Text>
							</Text>
						</Row>

						<Row size={1} style={styles.listContainer}>
							<ListView
								contentContainerStyle={styles.listContent}
								dataSource={this.state.dataSource}
								renderRow={this._renderRow}
								enableEmptySections
								pageSize={15}
							/> 
						</Row>

						<Row>

              {isMerchant &&
                <Col size={2}>
                  <ButtonGroup
                    selectedBackgroundColor={this._setButtonColor()}
                    onPress={this._updateIndex}
                    selectedIndex={this.state.index}
                    buttons={['CANCEL', 'CONFIRM', 'DELIVERED']}
                    containerStyle={{height: 30, borderWidth: 0, borderRadius: 2, backgroundColor: Colors.backgroundDarker}}
                    containerBorderRadius={2}
                    textStyle={{ fontSize: 10, color: Colors.snow }}
                    selectedTextStyle={{ color: Colors.snow }}
                    innerBorderStyle={{ color: Colors.background }} />
                </Col>
              }

              {isCustomer &&
                <Col size={2} style={{ paddingLeft: 10 }}>
                  <Text style={{ color: Colors.snow }}>Status
                    <Text style={{ color: Colors.snow, fontWeight: 'bold' }}>: {this._getOrderStatus()}</Text>
                  </Text>
                </Col>
              }

              <Col size={1} style={{ alignItems: 'flex-end', justifyContent: 'center', paddingRight: 10 }}>
                <Text style={{ color: Colors.snow }}>Total
                  <Text style={{ color: Colors.snow, fontWeight: 'bold' }}>: $ {this._calculateTotalCost()}</Text>
                </Text>
              </Col>
						</Row>

					</Col>
        </Grid>
      </View>
    )
  }
}