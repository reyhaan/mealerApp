import React, {Component} from 'react'
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Image,
    Platform,
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native'
import {connect} from 'react-redux'
import style from './VendorDetails.style'
import {Icon, Header, Rating} from 'react-native-elements'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Colors} from '../../Themes/index';
import {vendorActionCreators} from '../../Redux/Vendor/VendorActions';
import {cartActionCreators} from '../../Redux/Cart/CartActions'
import {bindActionCreators} from 'redux';
import {UserProfileHeader, AddToCartModal} from '../../Components/index'
import {NavigationActions} from 'react-navigation'
import SnackBar from 'react-native-snackbar-component';

class VendorAddress extends Component {
    render () {
        if (this.props.address){
            return (
                <View>
                    <Row style={{
                        borderBottomColor: Colors.steel,
                        borderBottomWidth: 1,
                        paddingBottom: 10,
                        marginBottom: 10
                    }}>
                        <Text style={{color: Colors.gray, fontWeight: 'bold'}}>ADDRESS</Text>
                    </Row>

                    <Row style={{marginBottom: 20}}>
                        <Text>{this.props.address}</Text>
                    </Row>
                </View>
            )
        } else {
            return null
        }
    }
}

class VendorPhone extends Component {
    render () {
        if (this.props.phone){
            return (
                <View>
                    <Row style={{
                        borderBottomColor: Colors.steel,
                        borderBottomWidth: 1,
                        paddingBottom: 10,
                        marginBottom: 10
                    }}>
                        <Text style={{color: Colors.gray, fontWeight: 'bold'}}>PHONE</Text>
                    </Row>

                    <Row style={{marginBottom: 20}}>
                        <Text>{this.props.phone}</Text>
                    </Row>
                </View>
            )
        } else {
            return null
        }
    }
}

class VendorEmail extends Component {
    render () {
        if (this.props.email){
            return (
                <View>
                    <Row style={{
                        borderBottomColor: Colors.steel,
                        borderBottomWidth: 1,
                        paddingBottom: 10,
                        marginBottom: 10
                    }}>
                        <Text style={{color: Colors.gray, fontWeight: 'bold'}}>EMAIL</Text>
                    </Row>

                    <Row style={{marginBottom: 20}}>
                        <Text>{this.props.email}</Text>
                    </Row>
                </View>
            )
        } else {
            return null
        }
    }
}

class VendorDetails extends Component {
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
    };

    onPress = (mode, activeItem) => {
        switch (mode) {
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

    ratingCompleted = (rating) => {
        let ratingData = {
            rating: rating,
            merchantId: this.state.activeMerchant.uid
        };
        this.props.updateRating(ratingData);

        this.setState({showToast: true, toastMessage: 'Rating applied!'}, () =>
            setTimeout(() => {
                this.setState({showToast: false, toastMessage: ''})
            }, 2000))
    };

    _renderChefDetails = () => {
        let ratingStartingValue = 5;
        if (this.state.activeMerchant.rating && this.state.activeMerchant.rating.cumulativeRating){
            ratingStartingValue = this.state.activeMerchant.rating.cumulativeRating / this.state.activeMerchant.rating.numberOfRatings || 2.5;
        }

        return (
            <Col style={{padding: 20}}>
                <Row style={{
                    paddingBottom: 10,
                    marginBottom: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: "column"
                }}>

                    <Rating
                        showRating
                        type="star"
                        fractions={1}
                        startingValue={ratingStartingValue}
                        imageSize={20}
                        onFinishRating={this.ratingCompleted}
                        style={{paddingVertical: 10, paddingTop: 0}}
                    />
                    <Text style={{color: Colors.gray, fontSize: 10}}>slide over to rate</Text>
                </Row>

                <VendorAddress address={this.state.activeMerchant.address}/>
                <VendorPhone phone={this.state.activeMerchant.phone}/>
                <VendorEmail email={this.state.activeMerchant.email}/>
            </Col>
        )
    };

    renderVendorItem = (item) => {
        return (
            <TouchableOpacity onPress={() => this.onPress('full', item)} style={style.fullModeItemContainer}>
                <Grid>
                    <Row style={{height: 200}}>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderTopLeftRadius: 3,
                            borderTopRightRadius: 3
                        }}>
                            <Image style={style.fullModeItemImage}
                                   source={{uri: item.itemImage}}/>
                        </View>
                    </Row>

                    <Row style={{height: 60}}>
                        <Col size={2} style={{alignItems: 'flex-start', justifyContent: 'center'}}>
                            <Text ellipsizeMode="tail" numberOfLines={2}
                                  style={style.fullModeItemName}>{item.itemName}</Text>
                        </Col>
                        <Col size={1} style={{alignItems: 'flex-end', justifyContent: 'center'}}>
                            <Text style={style.fullModeItemCost}>$ {parseFloat(item.itemCost).toFixed(2)}</Text>
                        </Col>
                    </Row>
                </Grid>
            </TouchableOpacity>
        )
    };

    backButton = () => {
        return (
            <View style={{paddingTop: 25}}>
                <Icon
                    name={Platform.OS === 'ios' ? 'chevron-left' : 'arrow-back'}
                    color={Colors.background}
                    onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
                />
            </View>
        )
    };

    switchView = (mode) => {
        switch (mode) {
            case 'menu':
                this.setState({
                    showMenu: true,
                    showDetails: false
                });
                break;
            case 'details':
                this.setState({
                    showMenu: false,
                    showDetails: true
                });
                break;
        }
    };

    render() {
        // Set the key for the menu
        let {menus} = this.props.vendor;
        if (this.props.vendor && this.props.vendor.menus) {
            menus = this.props.vendor.menus.map(menu => {
                menu.key = menu.id;
                return menu
            });
        }

        return (
            <Col>
                <Header
                    leftComponent={this.backButton()}
                    rightComponent={null}
                    centerComponent={{text: "CHEF", style: {color: Colors.background, fontWeight: 'bold'}}}
                    backgroundColor={Colors.snow}
                />
                <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>

                    <AddToCartModal visible={!this.props.shouldHideAddToCartModal}
                                    activeItem={this.state.activeItem}
                                    activeMerchant={this.state.activeMerchant}/>
                    <UserProfileHeader navigation={this.props.navigation} user={this.state.activeMerchant}/>

                    <View style={{
                        height: 50,
                        borderBottomColor: Colors.lightGray,
                        borderBottomWidth: 1,
                        backgroundColor: Colors.silver
                    }}>
                        <Grid>
                            <TouchableWithoutFeedback onPress={() => this.switchView('menu')}>
                                <Col size={1}
                                     style={{
                                         backgroundColor: (this.state.showMenu) ? Colors.background : Colors.clear,
                                         borderLeftColor: Colors.gray2,
                                         alignItems: 'center',
                                         justifyContent: 'center'
                                     }}>
                                    <View>
                                        <Text style={{
                                            color: (this.state.showMenu) ? Colors.snow : Colors.charcoal,
                                            fontSize: 14,
                                            fontWeight: 'bold'
                                        }}>MENU</Text>
                                    </View>
                                </Col>
                            </TouchableWithoutFeedback>

                            <TouchableWithoutFeedback onPress={() => this.switchView('details')}>
                                <Col size={1}
                                     style={{
                                         backgroundColor: (this.state.showDetails) ? Colors.background : Colors.clear,
                                         borderLeftWidth: 1,
                                         borderLeftColor: Colors.gray2,
                                         alignItems: 'center',
                                         justifyContent: 'center'
                                     }}>
                                    <View>
                                        <Text style={{
                                            color: (this.state.showDetails) ? Colors.snow : Colors.charcoal,
                                            fontSize: 14,
                                            fontWeight: 'bold'
                                        }}>DETAILS</Text>
                                    </View>
                                </Col>
                            </TouchableWithoutFeedback>
                        </Grid>
                    </View>

                    {this.state.showDetails && this._renderChefDetails()}

                    {this.state.showMenu &&
                    <FlatList
                        style={{backgroundColor: Colors.backgroundGray, paddingTop: 10}}
                        data={menus}
                        renderItem={({item}) => this.renderVendorItem(item)}
                    />}

                </ScrollView>

                <SnackBar
                    visible={this.state.showToast}
                    textMessage={this.state.toastMessage}
                    bottom={0} position='bottom' backgroundColor='#272A2F'
                />
            </Col>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        vendor: state.vendor,
        menu: state.menu,
        auth: state.auth,
        shouldHideAddToCartModal: (state.cart.shouldHideAddToCartModal === undefined) || (state.cart.shouldHideAddToCartModal === null) ? true : state.cart.shouldHideAddToCartModal
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(Object.assign({}, vendorActionCreators, cartActionCreators), dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(VendorDetails)