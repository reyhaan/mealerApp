import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, ListView, FlatList } from 'react-native'
import { Header, Icon, Button, Avatar, ButtonGroup } from 'react-native-elements'
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Colors, Fonts, Images } from '../Themes'
import styles from './Styles/CustomerCartScreenStyle'
import cartService from '../Services/cart-service'
import _ from 'lodash'
import { merchant } from '../Redux/Merchant/MerchantReducers';

export default class CustomerCartScreen extends Component {
	constructor (props) {
		super(props)
		
		this.orderObject = {
			// orders: this.orders,
			customerName: "Mohammad Rehaan"
		}

		this.state = {
        dataSource: '',
        index: 4,
        isMerchant: false,
        isCustomer: true
		}

	}

	componentWillReceiveProps = async () => {
		let cart = await cartService.getCart();
		this.setState({
			cart: cart
		})

		let merchantList = this.state.cart.to;

		let itemListByEachMerchant = _.values(merchantList);

		this.setState({
			merchantDataSourceFromCart: itemListByEachMerchant
		})
	}

	_calculateTotalCost = (rowData) => {
		let total = 0;
		for(let i = 0; i < rowData.length; i++) {
			total += (rowData[i].itemCost * rowData[i].itemCount)
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
                    source={{uri: rowData.itemImage}}
                  />
              </Col>
              <Col>
                  <Row style={{ height: 20}}>
                      <Text style={[styles.boldLabel, {color: Colors.coal}]}>{rowData.itemName}</Text>
                  </Row>
                  <Row style={{ height: 26, paddingRight: 20 }}>
                      <Text style={{fontSize: 11, color: Colors.charcoal}} numberOfLines={1} >{rowData.itemDetail}</Text>
                  </Row>
              </Col>
              <Col style={{ width: 80 }}>
                  <Row style={{ height: 20, flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                    <Text style={styles.itemCost}>$ {rowData.itemCost}
                      <Text style={{ color: Colors.gray, fontSize: 12 }}> x {rowData.itemCount}</Text>
                    </Text>
                  </Row>
              </Col>
          </Grid>
        </View>
      </View>
    )
	}

	_renderIndividualMerchantRow = (rowData) => {
		return(
			<Col style={{ paddingBottom: 30, paddingTop: 0 }}>
			
				<Row style={{ paddingLeft: 10, paddingTop: 15, paddingBottom: 10 }}>
					<Col size={1}>
						<Text style={{ color: Colors.gray3 }} >CHEF:
							<Text style={{ fontSize: 14, color: Colors.gray3 }}> { this.orderObject.customerName.toUpperCase() }</Text>
						</Text>
					</Col>
		
					<Col style={{ width: 80, alignItems:'flex-end', paddingRight: 20 }}>
						<TouchableOpacity>
							<View>
								<Text style={{ color: Colors.background, fontWeight: 'bold', fontSize: 12 }} >DETAILS</Text>
							</View>
						</TouchableOpacity>
					</Col>
				</Row>
		
				<Row size={1} style={styles.listContainer}>
					<FlatList
						contentContainerStyle={styles.listContent}
						data={rowData}
						renderItem={({item}) => this._renderRow(item)}
					/> 
				</Row>
		
				<Row>
		
					<Col size={2} style={{ paddingLeft: 10 }}>
						
					</Col>
		
					<Col size={1} style={{ alignItems: 'flex-end', justifyContent: 'center', paddingRight: 20 }}>
						<Text style={{ color: Colors.gray }}>Total:
							<Text style={{ color: Colors.coal, fontWeight: 'bold' }}> $ {this._calculateTotalCost(rowData)}</Text>
						</Text>
					</Col>
		
				</Row>
		
			</Col>
		)
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
					<FlatList
						contentContainerStyle={styles.listContent}
						data={this.state.merchantDataSourceFromCart}
						renderItem={({item}) => this._renderIndividualMerchantRow(item)}
					/>
        </Grid>
      </View>
    )
  }
}