import React, {Component} from 'react'
import {Text, View, TouchableOpacity, FlatList, Image} from 'react-native'
import {connect} from 'react-redux'
import style from './Menus.style'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Colors} from '../../Themes/index';
import {vendorActionCreators} from '../../Redux/Vendor/VendorActions';
import {bindActionCreators} from 'redux';
import {LoadingSpinner} from '../../Components/index'
import {Header, Left, Body, Right, Button, Title, Form, Item, Input, Label} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

class MenuTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        }
    }

    componentDidMount() {
        this.fetchMenu();
    }

    addMenuItem = () => {
        this.props.navigation.navigate("MenuForm", null);
    };

    viewItem = (item) => {
        this.props.navigation.navigate("MenuForm", {item})
    };

    fetchMenu = () => {
        console.log('pull to refresh');
        this.props.vendorActions.fetchVendorMenu();
    };

    _renderItem = (data) => {
        const {item} = data;
        return (
            <TouchableOpacity onPress={() => this.viewItem(item)} style={style.itemContainer}>
                <Grid>
                    <Col size={65}>
                        <Text ellipsizeMode="tail" numberOfLines={2} style={style.itemName}>{item.itemName}</Text>
                        <Text ellipsizeMode="tail" numberOfLines={2} style={style.itemDetails}>{item.itemDetail}</Text>
                        <Text style={style.itemCost}>$ {parseFloat(item.itemCost).toFixed(2)}</Text>
                    </Col>
                    <Col size={35} style={{}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Image style={{width: 100, height: 90, borderRadius: 3}}
                                   source={{uri: item.itemImage + '?' + new Date().getTime()}}/>
                        </View>
                    </Col>
                </Grid>
            </TouchableOpacity>
        )
    };

    render() {
        // Add key to the list of Menus
        let menus = [];
        if (this.props.vendor && this.props.vendor.menus) {
            menus = this.props.vendor.menus.map(menu => {
                menu.key = menu.id;
                return menu
            });
        }

        return (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <Header style={{backgroundColor: Colors.snow}}>
                    <Left/>
                    <Body>
                    <Title style={{color: Colors.background}}>Menu</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.addMenuItem()}>
                            <Icon name="plus" size={20} color={Colors.background}/>
                        </Button>
                    </Right>
                </Header>

                <LoadingSpinner
                    show={this.props.vendor.showActivityIndicator && menus.length === 0 || this.state.refreshing}/>

                <FlatList
                    style={{backgroundColor: style.white}}
                    data={menus}
                    refreshing={this.state.refreshing}
                    onRefresh={() => this.fetchMenu()}
                    renderItem={this._renderItem}/>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        vendor: state.vendor,
        auth: state.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        vendorActions: bindActionCreators(vendorActionCreators, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MenuTab)