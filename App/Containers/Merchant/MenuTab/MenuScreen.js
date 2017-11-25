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

class MenuTab extends Component {
    constructor(props) {
        super(props);
        this.props.fetchMerchantMenu();
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

    _onPress = () => {
        console.log("list pressed");
    };

    _renderItem = (data) => {
        const {item} = data;
        return (
            <TouchableOpacity onPress={this._onPress} style={style.itemContainer}>
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
        const menus = this.props.menu.map(menu => {
            menu.key = menu.id;
            return menu
        });

        return (
            <View style={{flex: 1,backgroundColor: '#fff'}}>
                <Header
                    leftComponent={this.editMenuButton()}
                    rightComponent={this.addMenuItemButton()}
                    centerComponent={{text: 'MENU', style: {color: '#fff', fontWeight: 'bold'}}}
                    backgroundColor={Colors.background}
                    outerContainerStyles={style.headerOuterContainer}
                />

                <LoadingSpinner show={!this.props.menu.length}/>

                <FlatList
                    style={{backgroundColor: Colors.white}}
                    data={menus}
                    renderItem={this._renderItem}
                />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        menu: state.menu,
        auth: state.auth
    }
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(merchantActionCreators, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(MenuTab)