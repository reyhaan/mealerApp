import React, {Component} from 'react'
import {Text, View, TouchableOpacity, FlatList, Image, Platform, ScrollView } from 'react-native'
import {connect} from 'react-redux'
import style from './CustomerOrdersScreen.style'
import {Icon, Header} from 'react-native-elements'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Colors} from '../../Themes';
import {bindActionCreators} from 'redux';
import { NavigationActions } from 'react-navigation'
import _ from 'lodash'
import { customerActionCreators } from '../../Redux/Customer/CustomerActions';

class CustomerOrdersScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			showMenu: true,
			showDetails: false,
			islistMode: false,
			isFullMode: true,
			isModalVisible: false,
			activeItem: {
					itemName: '',
					itemImage: '',
					itemDetail: '',
					itemCost: ''
			},
			activeMerchant: ''
		}
	}

	componentDidMount() {
		const {state} = this.props.navigation;
		if (state.params && state.params.selectedCook) {
			this.setState({
				activeMerchant: state.params.selectedCook
			})
		}
	}

	_renderFullModeItem = (item) => {
		return (
			<TouchableOpacity onPress={() => {}} style={style.fullModeItemContainer}>
				<Grid>
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
			</TouchableOpacity>
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
		// Set the key for the menu
		let  {menus} =  this.props.merchant;
		if (this.props.merchant && this.props.merchant.menus) {
			menus = this.props.merchant.menus.map(menu => {
				menu.key = menu.id;
				return menu
			});
		}

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
							data={menus}
							renderItem={({item}) => this._renderFullModeItem(item)}
						/>

				</ScrollView>
			</Col>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.auth	
	}
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(customerActionCreators, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrdersScreen)