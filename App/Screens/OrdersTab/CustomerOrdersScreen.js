import React, {Component} from 'react'
import {Text, View, TouchableOpacity, FlatList, Image, Platform, ScrollView, TouchableWithoutFeedback} from 'react-native'
import {connect} from 'react-redux'
import style from './CustomerOrdersScreen.style'
import {Icon, Header} from 'react-native-elements'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Colors} from '../../Themes';
import {merchantActionCreators} from '../../Redux/Merchant/MerchantActions';
import { cartActionCreators } from '../../Redux/Cart/CartActions'
import {bindActionCreators} from 'redux';
import {UserProfileHeader, AddToCartModal} from '../../Components/index'
import { NavigationActions } from 'react-navigation'
import _ from 'lodash'
import { cartActions } from '../../Redux/Cart/CartActions';

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
			this.props.fetchMerchantMenu(state.params.selectedCook.uid);
			this.setState({
				activeMerchant: state.params.selectedCook
			})
		}
	}

	_showModal = () => {
		this.props.hideAddToCartModal(false);
	}

	_hideModal = () => {
		this.props.hideAddToCartModal(true);
	}

	onPress = (mode, activeItem) => {
		switch(mode) {
			case 'list':
				this.setState({
						activeItem: activeItem
				});
				this._showModal();
				break;
			// TODO: made 2 cases because I want to apply transitions instead of dialog box
			case 'full':
				this.setState({
						activeItem: activeItem
				});
				this._showModal();
				break;
		}
	};

	_renderFullModeItem = (item) => {
		return (
			<TouchableOpacity onPress={() => this.onPress('full', item)} style={style.fullModeItemContainer}>
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

	switchView = (mode) => {
		switch(mode) {
			case 'menu':
				this.setState({
						showMenu: true,
						showDetails: false
				})
				break;
			case 'details':
				this.setState({
						showMenu: false,
						showDetails: true
				})
				break;
		}
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
		merchant:state.merchant,
		menu: state.menu,
		auth: state.auth,
		shouldHideAddToCartModal: (state.cart.shouldHideAddToCartModal === undefined) || (state.cart.shouldHideAddToCartModal === null) ? true : state.cart.shouldHideAddToCartModal
	}
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Object.assign({}, merchantActionCreators, cartActionCreators), dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrdersScreen)