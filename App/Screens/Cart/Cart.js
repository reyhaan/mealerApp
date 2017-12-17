import React, {Component} from 'react'
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import {connect} from 'react-redux'
import styles from './Cart.style'
import {CustomerCartScreen} from '../../Components/index'
import {Colors, Metrics, Images} from '../../Themes/index'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Header} from 'react-native-elements'
import {Icon} from 'react-native-elements'
import authenticationService from '../../Services/authentication-service'
import cartService from '../../Services/cart-service'
import _ from 'lodash'
import {bindActionCreators} from 'redux'
import {cartActionCreators} from '../../Redux/Cart/CartActions'

class MerchantOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMerchant: false,
            isCustomer: true,
            isCartEmpty: true
        };

        // Turn off warnings for now :/
        console.disableYellowBox = true;
    }

    componentDidMount = async () => {
        let cart = await cartService.getCart();
        if (cart === undefined || cart === null || _.isEmpty(cart) || _.isEmpty(cart.to)) {
            this.setState({
                isCartEmpty: true
            })
        } else {
            let totalCost = await cartService.getTotalCost();
            this.setState({
                totalCost: totalCost,
                isCartEmpty: false
            })
        }
    };

    _showPreviousOrders = () => {
        this.props.navigation.navigate('CustomerOrders')
    };

    _doCheckout = async () => {
        let currentUser = await authenticationService.currentUser();
        let data = {
            userInfo: currentUser
        };
        this.props.doCheckout(data);
    };

    _renderCustomerCart = () => {
        if (this.state.isCartEmpty) {
            return (
                <View style={styles.subContainer}>
                    <Image source={Images.emptyCart} style={styles.logo}/>
                    <Text style={{
                        color: Colors.backgroundGray,
                        marginTop: Metrics.doubleBaseMargin,
                        fontWeight: 'bold',
                        fontSize: 18
                    }}>Your cart is empty!</Text>
                </View>
            )
        } else {
            return <CustomerCartScreen/>
        }
    };

    _cartHeaderTitle = () => {
        return (
            <Col size={1}
                 style={{paddingLeft: 5, alignItems: 'flex-start', justifyContent: 'center'}}>
                <Row>
                    <Icon size={16}
                          name={'cutlery'}
                          color={Colors.background}
                          type='font-awesome'/>
                    <Text style={styles.headerTitle}>MY CART</Text>
                </Row>
            </Col>
        )
    };

    _headerButtonShowPreviousOrders = () => {
        return (
            <Col size={1}
                 style={{paddingLeft: 5, alignItems: 'flex-start', justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => {this._showPreviousOrders()}}>
                    <Row>
                        <Icon size={16}
                              name={'archive'}
                              color={Colors.background}
                              onPress={() => {
                              }}/>
                        <Text style={styles.headerRightButton}>ORDERS</Text>
                    </Row>
                </TouchableOpacity>
            </Col>
        )
    };

    render() {
        return (
            <View style={styles.container}>
                <Header leftComponent={this._cartHeaderTitle()}
                        rightComponent={this._headerButtonShowPreviousOrders()}
                        backgroundColor={Colors.background}
                        outerContainerStyles={styles.headerContainer}/>
                <ScrollView>
                    {this._renderCustomerCart()}
                </ScrollView>

                <Row style={{
                    height: 45,
                    backgroundColor: Colors.background,
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 10,
                    borderRadius: 3
                }}>
                    <TouchableOpacity onPress={() => {
                        this._doCheckout()
                    }}>
                        <Row style={{
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: Metrics.screenWidth
                        }}>
                            <Text style={{fontWeight: 'bold', fontSize: 14, color: Colors.snow}}>CHECKOUT:
                                <Text style={{fontWeight: 'bold', fontSize: 17, color: Colors.snow}}>
                                    $ {this.state.totalCost}</Text>
                            </Text>
                        </Row>
                    </TouchableOpacity>
                </Row>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => (bindActionCreators(cartActionCreators, dispatch));
const mapStateToProps = (state) => {
    return {
        cart: state.cart.cart
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MerchantOrders)
