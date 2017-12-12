import React, {Component} from 'react'
import {Text, View, TouchableOpacity, FlatList, Image, Platform, ScrollView, TouchableWithoutFeedback } from 'react-native'
import {connect} from 'react-redux'
import style from './CustomerOrdersScreen.style'
import {Icon, Header} from 'react-native-elements'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Colors} from '../../Themes';
import {bindActionCreators} from 'redux';
import { NavigationActions } from 'react-navigation'
import _ from 'lodash'
import { orderActionCreators } from '../../Redux/Order/OrderActions';
import { authenticationService } from '../../Services/authentication-service'

class CustomerOrdersScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dataSource: []
		}
	}

	componentWillReceiveProps = (newProps) => {
		let { orders } = newProps
		if (orders) {
			let ordersArray = _.values(orders)
			this._createDatasource(ordersArray)
		}
	}
	
	componentDidMount = () => {
		this.props.getOrders(this.props.user.uid)
	}

	_createDatasource = (orders) => {
		console.log(orders)
		this.setState({
			ordersArray: orders
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
			<View style={style.row}>
			<View style={style.rowInnerContainer}>
				<Grid style={{ borderBottomColor: Colors.gray2, borderBottomWidth: 1 }}>
						
							<Row style={{ height: 30 }}>
								<Col size={1}>
										<Row style={{ height: 20 }}>
												<Text style={[style.boldLabel, {color: Colors.gray}]}>{rowData.itemName}</Text>
										</Row>
								</Col>

								<Col style={{ width: 100 }}>
										<Row style={{ height: 20, flexDirection: 'column', alignItems: 'flex-end' }}>
											<Text style={style.itemCost}>$ {rowData.itemCost}</Text>
										</Row>
								</Col>
							</Row>

							<Row style={{ height: 34 }}>
								<Col>
									<TouchableOpacity onPress={() => {this._removeItem(rowData.id, rowData.merchantInfo.uid)}}>
										<Row style={{ height: 30, width: 70, backgroundColor: Colors.clear }}>
											<Icon
												size={14}
												name={'trash-o'}
												color={Colors.background}
												type='font-awesome'
											/>
											<Text style={style.itemModify}>&nbsp; Remove</Text>
										</Row>
									</TouchableOpacity>
								</Col>
								
								<Col style={{ width: 125, padding: 2 }}>
									<Row style={{ height: 30, backgroundColor: Colors.clear }}>
									<TouchableOpacity onPress={() => {this._updateItemCount(rowData.id, rowData.merchantInfo.uid, rowData.itemCount - 1)}}>
										<Col style={style.itemCountButton}>
											<Icon
												size={14}
												name={'minus'}
												color={Colors.background}
												type='font-awesome'
												/>
										</Col>
									</TouchableOpacity>
										
										<Col style={{ width: 65 }}>
											<Row style={{ alignItems: 'center', justifyContent: 'center' }}>
												<Text style={style.itemCount}>{rowData.itemCount}</Text>
											</Row>
										</Col>
										
									<TouchableOpacity onPress={() => {this._updateItemCount(rowData.id, rowData.merchantInfo.uid, rowData.itemCount + 1)}}>
										<Col style={style.itemCountButton}>
											<Icon
												size={14}
												name={'plus'}
												color={Colors.background}
												type='font-awesome'
												/>
										</Col>
									</TouchableOpacity>
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
							<Text style={{ fontSize: 14, color: Colors.gray3 }}>&nbsp;{ rowData[0].merchantInfo.name.toUpperCase() }</Text>
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
		
				<Row size={1} style={style.listContainer}>
					<FlatList
						contentContainerStyle={style.listContent}
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

				{/* { this.state.merchantDataSourceFromCart.length > 1 &&
					<Row style={{ height: 10, backgroundColor: Colors.gray2 }}></Row>
				} */}

		
			</Col>
		)
	}

	_renderIndividualOrderRow = (order) => {

		let merchantList = order.to;
		let itemListByEachMerchant = _.values(merchantList);
		
		// convert array of item objects to array of item arrays
		itemListByEachMerchant = _.map(itemListByEachMerchant, function(itemListObject) {
			return _.values(itemListObject);
		})

		return (
			<FlatList
				style={{backgroundColor: Colors.snow, paddingTop: 10}}
				data={itemListByEachMerchant}
				renderItem={({item}) => this._renderIndividualMerchantRow(item)}
			/>
		)
	}

	backButton = () => {
		return(
			<Icon
				name={Platform.OS === 'ios' ? 'chevron-left' : 'arrow-back'}
				color={Colors.background}
				onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
			/>
		)
	}

	render() {

		return (
			<Col style={style.container}>
				<Header 
					leftComponent={this.backButton()} 
					rightComponent={null}
					centerComponent={{text: "ORDER HISTORY", style: {color: Colors.background, fontWeight: 'bold'}}}
					backgroundColor={Colors.snow}
					outerContainerStyles={style.headerOuterContainer}
				/>
				<ScrollView style={{flex: 1, backgroundColor: '#fff'}}>

						<FlatList
							style={{backgroundColor: Colors.snow, paddingTop: 10}}
							data={this.state.ordersArray}
							renderItem={({item}) => this._renderIndividualOrderRow(item)}
						/>

				</ScrollView>
			</Col>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		user: state.settings.user,
		orders: state.order.orders
	}
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(orderActionCreators, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrdersScreen)