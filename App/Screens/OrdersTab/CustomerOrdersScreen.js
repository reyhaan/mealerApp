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
			this.setState({
				dataSource: ordersArray
			})
		}
	}
	
	componentDidMount = () => {
		this.props.getOrders(this.props.user.uid)
	}

	_renderOrderItem = (item) => {
		return (
			<TouchableWithoutFeedback onPress={() => {}}>
				<Grid style={style.fullModeItemContainer}>
					<Row style={{ height: 200 }}>
						<View style={{flex: 1, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 3, borderTopRightRadius: 3}}>
							<Image style={style.fullModeItemImage}
									source={{uri: item.itemImage}}/>
						</View>
					</Row>

					<Row style={{ height: 60 }}>
						<Col size={2} style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
							<Text ellipsizeMode="tail" numberOfLines={2} style={style.fullModeItemName}>{item.itemName}</Text>
						</Col>
						<Col size={1} style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
							<Text style={style.fullModeItemCost}>$ {item.itemCost}</Text>
						</Col>
					</Row>
					
				</Grid>
			</TouchableWithoutFeedback>
		)
	};

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
							data={this.state.dataSource}
							renderItem={({item}) => this._renderOrderItem(item)}
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