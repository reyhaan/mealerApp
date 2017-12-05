import React, {Component} from 'react'
import {Text, View, TouchableOpacity, FlatList, Image, Platform, ScrollView, TouchableWithoutFeedback} from 'react-native'
import {connect} from 'react-redux'
import style from './CookDetailsScreen.style'
import {Icon} from 'react-native-elements'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Colors} from '../../../Themes';
import {merchantActionCreators} from '../../../Redux/Merchant/MerchantActions';
import { cartActionCreators } from '../../../Redux/Cart/CartActions'
import {bindActionCreators} from 'redux';
import {UserProfileHeader, AddToCartModal} from '../../../Components/index'
import { NavigationActions } from 'react-navigation'
import _ from 'lodash'
import { cartActions } from '../../../Redux/Cart/CartActions';

class CookDetailsScreen extends Component {
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
    
    addMenuItemButton = () => {
        return (
            <Icon
                name='add'
                color={Colors.snow}
                onPress={() => this.props.navigation.navigate("EditMenuScreen")}
            />
        )
    };

    editMenuButton = () => {
        return (
            <Icon
                name='edit'
                color={Colors.snow}
            />
        )
    };

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

    _renderListModeItem() {
        const animation = LayoutAnimation.create(500, 'easeInEaseOut', 'opacity');
        LayoutAnimation.configureNext(animation);
    }

    _renderListModeItem = (item) => {
        return (
            <TouchableOpacity onPress={() => this.onPress('list', item)} style={style.itemContainer}>
                <Grid>
                    <Col style={{ width: 100, paddingLeft: 5 }}>
                        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                            <Image style={{width: 100, height: 100, borderRadius: 2}}
                                source={{uri: item.itemImage}}/>
                        </View>
                    </Col>
                    <Col size={1} style={{ paddingLeft: 5, marginTop: (Platform.OS === 'ios' ? 5 : 0) }}>
                        <Text ellipsizeMode="tail" numberOfLines={2} style={style.itemName}>{item.itemName}</Text>
                        <Text ellipsizeMode="tail" numberOfLines={2} style={style.itemDetails}>{item.itemDetail}</Text>
                        <Text style={style.itemCost}>${item.itemCost}</Text>
                    </Col>
                </Grid>
            </TouchableOpacity>
        )
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
                color={Colors.snow}
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
            <ScrollView style={{flex: 1,backgroundColor: '#fff'}}>

                <AddToCartModal visible={!this.props.shouldHideAddToCartModal} activeItem={this.state.activeItem} activeMerchant={this.state.activeMerchant} ></AddToCartModal>

                {/* <LoadingSpinner show={!this.props.menu.length}/> */}

                <UserProfileHeader navigation={this.props.navigation} user={this.state.activeMerchant}></UserProfileHeader>

                <View style={{ height: 50, borderBottomColor: Colors.lightGray, borderBottomWidth: 1, backgroundColor: Colors.silver }}>
                    <Grid>

                        <Col size={1} 
                            style={{ 
                                backgroundColor: (this.state.showMenu) ? Colors.background : Colors.clear, 
                                borderLeftWidth: 1, 
                                borderLeftColor: Colors.gray2, 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                            }}>
                            <TouchableWithoutFeedback onPress={() => this.switchView('menu')}>
                                <View>
                                    <Text style={{ color: (this.state.showMenu) ? Colors.snow : Colors.charcoal, fontSize: 14, fontWeight: 'bold' }}>MENU</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </Col>

                        <Col size={1} 
                            style={{ 
                                backgroundColor: (this.state.showDetails) ? Colors.background : Colors.clear, 
                                borderLeftWidth: 1, 
                                borderLeftColor: Colors.gray2, 
                                alignItems: 'center', 
                                justifyContent: 'center' 
                            }} >
                            <TouchableWithoutFeedback onPress={() => this.switchView('details')}>
                                <View>
                                    <Text style={{ color: (this.state.showDetails) ? Colors.snow : Colors.charcoal, fontSize: 14, fontWeight: 'bold' }}>DETAILS</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </Col>
                    </Grid>

                    {/* <Grid>

                        <Col style={{ width: 50, backgroundColor: Colors.clear, borderLeftWidth: 1, borderLeftColor: Colors.gray2, paddingTop: 12 }}>
                            <TouchableOpacity>
                                <Icon
                                    name={'view-list'}
                                    color={ (this.state.islistMode) ? Colors.background : Colors.gray3}
                                    onPress={() => this.switchView('list')}
                                />
                            </TouchableOpacity>
                        </Col>

                        <Col style={{ width: 50, backgroundColor: Colors.clear, borderLeftWidth: 1, borderLeftColor: Colors.gray2, paddingTop: 12 }} >
                            <TouchableOpacity>
                                <Icon
                                    name={'view-stream'}
                                    color={ (this.state.isFullMode) ? Colors.background : Colors.gray3}
                                    onPress={() => this.switchView('full')}
                                />
                            </TouchableOpacity>
                        </Col>
                    </Grid> */}
                </View>

                { this.state.showDetails &&
                    <FlatList
                        style={{backgroundColor: '#fff'}}
                        data={menus}
                        renderItem={({item}) => this._renderListModeItem(item)}
                    />
                }

                { this.state.showMenu &&
                    <FlatList
                        style={{backgroundColor: Colors.backgroundGray, paddingTop: 10}}
                        data={menus}
                        renderItem={({item}) => this._renderFullModeItem(item)}
                    />
                }

            </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(CookDetailsScreen)