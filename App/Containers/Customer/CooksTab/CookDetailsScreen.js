import React, {Component} from 'react'
import {Text, View, ListView, TouchableOpacity, FlatList, Image, Platform, ScrollView, TouchableHighlight, TouchableWithoutFeedback, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import style from './CookDetailsScreen.style'
import {Header, Avatar, Icon} from 'react-native-elements'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Colors, Metrics} from '../../../Themes';
import {merchantActionCreators} from '../../../Redux/Merchant/MerchantActions';
import {bindActionCreators} from 'redux';
import {LoadingSpinner, UserProfileHeader} from '../../../Components/index'
import { NavigationActions } from 'react-navigation'
import * as Animatable from 'react-native-animatable';

const selectOpened = (opened, style) => opened ? style.opened : style.closed;

const getStyles = (opened, left) => StyleSheet.create({
    menuScreenContainer: {
        flex: 1,
    },
    headerOuterContainer: {
        width: Metrics.screenWidth,
        backgroundColor: Colors.background,
        borderBottomColor: Colors.backgroundLighter,
        borderBottomWidth: 1,
        padding: 15,
        height: 75,
    },
    itemContainer: selectOpened( opened, {
        height: 115,
        marginTop: 1,
        marginBottom: 0,
        marginLeft: 4,
        marginRight: 4,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 1,
        borderColor: Colors.lightGray,
    }),
    itemName: {
        marginTop: 12,
        fontWeight: 'bold',
        marginLeft: 10,
        fontSize: 16,
        color: Colors.background
    },
    itemDetails: {
        fontSize:14,
        marginTop:5,
        marginLeft: 10,
        color: Colors.gray
    },
    itemCost: {
        marginTop:10,
        marginLeft: 10,
        fontWeight: 'bold', 
        fontSize: 14
    },

    // FULL MODE STYLES

    fullModeItemContainer: {
        height: 265,
        marginTop: 5,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: Colors.snow,
        borderRadius: 3,
        shadowColor: '#000',
        shadowOpacity: (Platform.OS === 'ios') ? 0.2 : 0.4,
        shadowRadius: (Platform.OS === 'ios') ? 2 : 3,
        shadowOffset: {
          height: (Platform.OS === 'ios') ? 2 : 3,
        },
        elevation: 1
    },
    fullModeItemImage: {
        height: 200, 
        width: Metrics.screenWidth - 20, 
        resizeMode: 'cover', 
        marginTop: 0, 
        borderRadius: 3,
        shadowColor: '#000',
        shadowOpacity: (Platform.OS === 'ios') ? 0.2 : 0.4,
        shadowRadius: (Platform.OS === 'ios') ? 2 : 3,
        shadowOffset: {
          height: (Platform.OS === 'ios') ? 2 : 3,
        },
        zIndex: 1
    },
    fullModeItemName: {
        marginTop: (Platform.OS === 'ios') ? 2 : 0,
        marginLeft: 20,
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.background
    },
    fullModeItemCost: {
        marginTop: (Platform.OS === 'ios') ? 2 : 0,
        marginRight: 20,
        textAlign: 'right',
        fontSize: 14,
        fontWeight: 'bold'
    }
})

class CookDetailsScreen extends Component {
    constructor(props) {
        super(props);
        // this.props.fetchMerchantMenu();

        this.state = { opened: false };

        const _menu = [
            {
                "key": 1,
                "countryOfOrigin" : "Nigeria",
                "itemCost" : 6.99,
                "itemDetail" : "A famous dish from India, made with slowly cooking rice with spicy chicken.",
                "itemImage" : "https://i2.wp.com/ministryofcurry.com/wp-content/uploads/2017/05/IMG_2766.jpg?resize=760%2C507",
                "itemName" : "Chicken Biryani"
            },
            {
                "key": 2,
                "countryOfOrigin" : "Nigeria",
                "itemCost" : 6.99,
                "itemDetail" : "A famous dish from India, made with slowly cooking rice with spicy chicken.",
                "itemImage" : "https://i2.wp.com/ministryofcurry.com/wp-content/uploads/2017/05/IMG_2766.jpg?resize=760%2C507",
                "itemName" : "Chicken Biryani"
            },
            {
                "key": 3,
                "countryOfOrigin" : "Nigeria",
                "itemCost" : 6.99,
                "itemDetail" : "A famous dish from India, made with slowly cooking rice with spicy chicken.",
                "itemImage" : "https://i2.wp.com/ministryofcurry.com/wp-content/uploads/2017/05/IMG_2766.jpg?resize=760%2C507",
                "itemName" : "Chicken Biryani"
            },
            {
                "key": 4,
                "countryOfOrigin" : "Nigeria",
                "itemCost" : 6.99,
                "itemDetail" : "A famous dish from India, made with slowly cooking rice with spicy chicken.",
                "itemImage" : "https://i2.wp.com/ministryofcurry.com/wp-content/uploads/2017/05/IMG_2766.jpg?resize=760%2C507",
                "itemName" : "Chicken Biryani"
            },
            {
                "key": 5,
                "itemCost" : "8.00",
                "itemDetail" : "food",
                "itemImage" : "https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1438133716000/photosp/ig-498695320661758884_396353171/stock-photo-food-soup-healthy-foods-health-recipe-vegan-food-and-drink-stew-ig-498695320661758884_396353171.jpg",
                "itemName" : "test"
            },
            {
                "key": 6,
                "itemCost" : "10000.00",
                "itemDetail" : "we’re",
                "itemImage" : "https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1438133716000/photosp/ig-498695320661758884_396353171/stock-photo-food-soup-healthy-foods-health-recipe-vegan-food-and-drink-stew-ig-498695320661758884_396353171.jpg",
                "itemName" : "chicken feet"
            },
            {
                "key": 7,
                "itemCost" : "20.00",
                "itemDetail" : "www we",
                "itemImage" : "https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1438133716000/photosp/ig-498695320661758884_396353171/stock-photo-food-soup-healthy-foods-health-recipe-vegan-food-and-drink-stew-ig-498695320661758884_396353171.jpg",
                "itemName" : "taofiki "
            },
            {
                "key": 8,
                "itemCost" : "34.55",
                "itemDetail" : "ffggg",
                "itemImage" : "https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1438133716000/photosp/ig-498695320661758884_396353171/stock-photo-food-soup-healthy-foods-health-recipe-vegan-food-and-drink-stew-ig-498695320661758884_396353171.jpg",
                "itemName" : "gggggg"
            },
            {
                "key": 9,
                "itemCost" : "21.99",
                "itemDetail" : "Ksdsdksd",
                "itemImage" : "https://res.cloudinary.com/twenty20/private_images/t_watermark-criss-cross-10/v1438133716000/photosp/ig-498695320661758884_396353171/stock-photo-food-soup-healthy-foods-health-recipe-vegan-food-and-drink-stew-ig-498695320661758884_396353171.jpg",
                "itemName" : "test"
            }
        ]

        this.state ={
            menu: _menu,
            islistMode: true,
            isFullMode: false
        }
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

    onPress = (mode) => {
        switch(mode) {
            case 'list':
            console.log(this)
                this.refs.view.bounce(800).then((endState) => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
                break;

            case 'full':
                
                break;
        }
    };

    componentWillUpdate() {
        const animation = LayoutAnimation.create(500, 'easeInEaseOut', 'opacity');
        LayoutAnimation.configureNext(animation);
    }

    _renderListModeItem = (item) => {
        return (
            <TouchableOpacity onPress={() => this.onPress('list')} style={style.itemContainer}>
                <Animatable.View ref="view">
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
                </Animatable.View>
            </TouchableOpacity>
        )
    };

    _renderFullModeItem = (item) => {
        return (
            <TouchableOpacity onPress={this.onPress('full')} style={style.fullModeItemContainer}>
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
            case 'list':
                this.setState({
                    isFullMode: false,
                    islistMode: true
                })
                break;
            case 'full':
                this.setState({
                    isFullMode: true,
                    islistMode: false
                })
                break;
        }
    }

    render() {
        // const menus = this.props.menu.map(menu => {
        //     menu.key = menu.id;
        //     return menu
        // });

        return (
            <ScrollView style={{flex: 1,backgroundColor: '#fff'}}>

                {/* <LoadingSpinner show={!this.props.menu.length}/> */}

                <UserProfileHeader navigation={this.props.navigation}></UserProfileHeader>

                <View style={{ height: 50, borderBottomColor: Colors.lightGray, borderBottomWidth: 1, backgroundColor: Colors.silver }}>
                    <Grid>
                        <Col size={1} style={{ alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 10 }}>
                            <Text style={{ color: Colors.charcoal, fontSize: 14, fontWeight: 'bold' }}>RECIPES</Text>
                        </Col>

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
                    </Grid>
                </View>

                { this.state.islistMode &&
                    <FlatList
                        style={{backgroundColor: '#fff'}}
                        data={this.state.menu}
                        renderItem={({item}) => this._renderListModeItem(item)}
                    />
                }

                { this.state.isFullMode &&
                    <FlatList
                        style={{backgroundColor: Colors.backgroundGray, paddingTop: 10}}
                        data={this.state.menu}
                        renderItem={({item}) => this._renderFullModeItem(item)}
                    />
                }
            </ScrollView>
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
export default connect(mapStateToProps, mapDispatchToProps)(CookDetailsScreen)