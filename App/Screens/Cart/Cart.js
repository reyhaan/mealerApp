import React, {Component} from 'react'
import {connect} from 'react-redux'
import styles from './Cart.style'
import {CustomerCartScreen} from '../../Components/index'
import {Colors, Metrics, Images} from '../../Themes/index'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {bindActionCreators} from 'redux'
import {cartActionCreators} from '../../Redux/Cart/CartActions'
import {LoadingSpinner} from '../../Components/index'
import Icon from 'react-native-vector-icons/FontAwesome';
import {Header, Left, Body, Right, Button, Title, Form, Item, Input, Label} from 'native-base';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'

class MerchantOrders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCartEmpty: true
        };
    }

    componentDidMount = () => {
        this.props.cartActions.getCart();
    };

    placeOrder = () => {
        this.props.cartActions.checkout();
    };

    renderCustomerCart = () => {
        if (this.props.cart && !this.props.cart.isEmpty) {
            return <CustomerCartScreen/>
        } else {
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
        }
    };

    renderCheckoutButton = () => {
        if (this.props.cart && !this.props.cart.isEmpty) {
            return (<TouchableOpacity
                disabled={this.props.cart && this.props.cart.showActivityIndicator}
                onPress={() => {
                    this.placeOrder()
                }}
                style={styles.checkoutButtonContainer}>
                <Row style={styles.checkoutButton}>
                    <Text style={{fontWeight: 'bold', fontSize: 14, color: Colors.snow}}>CHECKOUT:
                        <Text style={{fontWeight: 'bold', fontSize: 17, color: Colors.snow}}>
                            $ {this.props.cart.cost}</Text>
                    </Text>
                </Row>
            </TouchableOpacity>)
        } else {
            return null;
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Header iosBarStyle="dark-content" style={{backgroundColor: Colors.snow, paddingTop: 15 }}>
                    <Left/>
                    <Body>
                    <Title style={{color: Colors.background}}>Cart</Title>
                    </Body>
                    <Right/>
                </Header>

                <ScrollView>
                    <LoadingSpinner show={this.props.cart && this.props.cart.showActivityIndicator}/>
                    {this.renderCustomerCart()}
                </ScrollView>
                {this.renderCheckoutButton()}
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        cartActions: bindActionCreators(cartActionCreators, dispatch)
    }
};

const mapStateToProps = (state) => {
    return {
        cart: state.cart.cart
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MerchantOrders)
