import React, {Component} from 'react'
import {connect} from 'react-redux'
import styles from './Cart.style'
import {CustomerCartScreen} from '../../Components/index'
import {Colors, Metrics, Images} from '../../Themes/index'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {bindActionCreators} from 'redux'
import {cartActionCreators} from '../../Redux/Cart/CartActions'
import {LoadingSpinner} from '../../Components/index'
import {Header, Left, Body, Right, Button, Title, Form, Item, Input, Label} from 'native-base';
import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Platform,
    Alert
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
        Alert.alert(
            'Checkout', 'Are you sure you want to place your order ?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => this.props.cartActions.checkout()},
            ],
            { cancelable: false }
        );
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
                disabled={this.props.request && this.props.request.showLoadingSpinner}
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
                <Header iosBarStyle="dark-content" style={{backgroundColor: Colors.snow, paddingBottom: Platform.OS === 'android' ? 80 : 0}} >
                    <Body>
                    <Title style={{
                        color: Colors.background,
                        marginTop: Platform.OS === 'android' ? 110 : 0,
                    }}>Cart</Title>
                    </Body>
                </Header>

                <ScrollView>
                    <LoadingSpinner show={this.props.request && this.props.request.showLoadingSpinner}/>
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
        cart: state.cart.cart,
        request: state.request
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MerchantOrders)
