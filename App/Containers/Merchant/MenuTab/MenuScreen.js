import React, {Component} from 'react'
import {Text, View, ListView, TouchableOpacity, FlatList, Image} from 'react-native'
import {connect} from 'react-redux'
import style from './MenuScreen.style'
import {Header, Avatar, Icon} from 'react-native-elements'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Colors} from '../../../Themes';
import {merchantActionCreators} from '../../../Redux/Merchant/MerchantActions';
import {bindActionCreators} from 'redux';
import {LoadingSpinner} from '../../../Components/index'
import authenticationService from '../../../Services/authentication-service'

class MenuTab extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const currentUser = await authenticationService.currentUser();
        if (currentUser) {
            this.props.fetchMerchantMenu(currentUser.uid);
        }
    }

    addMenuItemButton = () => {
        return (
            <Icon
                name='add'
                color={Colors.snow}
                iconStyle={{marginTop: 20,}}
                underlayColor={'transparent'}
                size={35}
                onPress={() => this.props.navigation.navigate("EditMenuScreen", null)}
            />
        )
    };

    viewItem = (item) => {
        this.props.navigation.navigate("EditMenuScreen", {item})
    };

    _renderItem = (data) => {
        const {item} = data;
        return (
            <TouchableOpacity onPress={() => this.viewItem(item)} style={style.itemContainer}>
                <Grid>
                    <Col size={65}>
                        <Text ellipsizeMode="tail" numberOfLines={2} style={style.itemName}>{item.itemName}</Text>
                        <Text ellipsizeMode="tail" numberOfLines={2} style={style.itemDetails}>{item.itemDetail}</Text>
                        <Text style={style.itemCost}>${item.itemCost}</Text>
                    </Col>
                    <Col size={35} style={{}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Image style={{width: 100, height: 90, borderRadius: 3}}
                                   source={{uri: item.itemImage}}/>
                        </View>
                    </Col>
                </Grid>
            </TouchableOpacity>
        )
    };

    render() {
        let menus = [];
        if (this.props.merchant && this.props.merchant.menus) {
            menus = this.props.merchant.menus.map(menu => {
                menu.key = menu.id;
                return menu
            });
        }

        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Header
                    rightComponent={this.addMenuItemButton()}
                    centerComponent={{text: 'MENU', style: {color: '#fff', fontWeight: 'bold'}}}
                    backgroundColor={Colors.background}
                    outerContainerStyles={style.headerOuterContainer}
                />

                <LoadingSpinner show={this.props.merchant.showActivityIndicator && menus.length === 0}/>

                <FlatList
                    style={{backgroundColor: style.white}}
                    data={menus}
                    renderItem={this._renderItem}/>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        merchant: state.merchant,
        auth: state.auth
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(merchantActionCreators, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(MenuTab)