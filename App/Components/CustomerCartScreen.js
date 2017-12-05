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
          <Grid style={{ borderBottomColor: Colors.gray2, borderBottomWidth: 1 }}>
							<Row style={{ height: 30 }}>
								<Col size={1}>
										<Row style={{ height: 20 }}>
												<Text style={[styles.boldLabel, {color: Colors.gray}]}>{rowData.itemName}</Text>
										</Row>
								</Col>

								<Col style={{ width: 100 }}>
										<Row style={{ height: 20, flexDirection: 'column', alignItems: 'flex-end' }}>
											<Text style={styles.itemCost}>$ {rowData.itemCost}</Text>
										</Row>
								</Col>
							</Row>

							<Row style={{ height: 34 }}>
									<Col>
										<Row style={{ height: 30, backgroundColor: Colors.clear }}>
											<Icon
												size={14}
												name={'trash-o'}
												color={Colors.background}
												type='font-awesome'
												onPress={() => this.decreaseItemCount()}
											/>
											<Text style={styles.itemModify}>&nbsp; Remove</Text>
										</Row>
									</Col>
									
									<Col style={{ width: 125, padding: 2 }}>
										<Row style={{ height: 30, backgroundColor: Colors.clear }}>
											<Col style={styles.itemCountButton}>
												<Icon
													size={14}
													name={'minus'}
													color={Colors.background}
													type='font-awesome'
													onPress={() => this.decreaseItemCount()}
													/>
											</Col>
											
											<Col style={{ width: 65 }}>
												<Row style={{ alignItems: 'center', justifyContent: 'center' }}>
													<Text style={styles.itemCount}>{rowData.itemCount}</Text>
												</Row>
											</Col>
											
											<Col style={styles.itemCountButton}>
												<Icon
													size={14}
													name={'plus'}
													color={Colors.background}
													type='font-awesome'
													onPress={() => this.decreaseItemCount()}
												/>
											</Col>
										</Row>
									</Col>
							</Row>


          </Grid>
        </View>
      </View>
    )
	}

	_renderIndividualMerchantRow = (rowData) => {
		return(
			<Col style={{ paddingTop: 0, backgroundColor: Colors.snow }}>
			
				<Row style={{ paddingLeft: 20, paddingTop: 15, paddingBottom: 15, marginBottom: 5, backgroundColor: Colors.snow, borderBottomColor: Colors.gray2, borderBottomWidth: 1, borderTopColor: Colors.gray2, borderTopWidth: 1 }}>
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
		
				<Row style={{ backgroundColor: Colors.snow, paddingBottom: 25, paddingTop: 10 }}>
		
					<Col size={2} style={{ paddingLeft: 20 }}>
						<Text style={{ color: Colors.charcoal, fontWeight: 'bold' }}>Subtotal</Text>
					</Col>
		
					<Col size={1} style={{ alignItems: 'flex-end', justifyContent: 'center', paddingRight: 20 }}>
						<Text style={{ color: Colors.charcoal, fontWeight: 'bold' }}> $ {this._calculateTotalCost(rowData)}</Text>
					</Col>
		
				</Row>

				{ this.state.merchantDataSourceFromCart.length > 1 &&
					<Row style={{ height: 10, backgroundColor: Colors.gray2 }}></Row>
				}

		
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