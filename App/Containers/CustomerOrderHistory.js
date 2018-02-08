import React, {Component} from 'react'
import {
    FlatList,
    ScrollView,
    View,
    Text,
    Image,
    Platform,
    StyleSheet,
    Modal,
    Button
} from 'react-native'
import {connect} from 'react-redux'
import style from './Styles/CustomerOrderHistory.style'
import {Col} from 'react-native-easy-grid';
import {Colors, Metrics, Images} from '../Themes/index'
import {bindActionCreators} from 'redux';
import {NavigationActions} from 'react-navigation'
import {orderActionCreators} from '../Redux/Order/OrderActions';
import CustomerOrder from '../Components/CustomerOrder'
import {LoadingSpinner} from '../Components/index'
import Icon from 'react-native-vector-icons/FontAwesome';
import {Header, Left, Body, Right, Title, Form, Item, Input, Label} from 'native-base';

const testStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    innerContainer: {
        alignItems: 'center',
    },
});

class CustomerOrderHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            modalVisible: false,
        }
    }

    componentDidMount = () => {
        this.props.orderActions.getOrders(this.props.user.uid)
    };

    openModal() {
        this.setState({modalVisible:true});
    }

    closeModal() {
        this.setState({modalVisible:false});
    }

    renderHistory = () => {
        const {orders} = this.props.order;

        if (orders && orders.length > 0) {
            return (
                <FlatList data={orders} renderItem={({item}) => CustomerOrder(item)}/>
            )
        } else {
            return (
                <View style={style.emptyHistoryContainer}>
                    <Image source={Images.emptyCart} style={style.emptyHistoryLogo}/>
                    <Text style={{
                        color: Colors.backgroundGray,
                        marginTop: Metrics.doubleBaseMargin,
                        fontWeight: 'bold',
                        fontSize: 18
                    }}>Your have no previous orders!</Text>
                </View>
            )
        }
    };

    render() {
        return (
            <View style={testStyle.container}>
                <Button
                    onPress={() => this.openModal()}
                    title="Open modal"
                />
                <Modal
                    visible={this.state.modalVisible}
                    animationType={'slide'}
                    onRequestClose={() => this.closeModal()}>
                    <View style={testStyle.modalContainer}>
                        <View style={testStyle.innerContainer}>
                            <Text>This is content inside of modal component</Text>
                            <Button
                                onPress={() => this.closeModal()}
                                title="Close modal">
                            </Button>
                        </View>
                    </View>
                </Modal>
            </View>

            // <Col style={style.container}>
            //      <Header iosBarStyle="dark-content"
            //             style={{backgroundColor: Colors.snow, paddingBottom: Platform.OS === 'android' ? 80 : 0}}>
            //         <Left style={{marginTop: Platform.OS === 'android' ? 110 : 0}}>
            //             <Button transparent onPress={() => this.props.navigation.dispatch(NavigationActions.back())}>
            //                 <Icon name="chevron-left" size={20} color={Colors.background}/>
            //             </Button>
            //         </Left>
            //         <Body>
            //         <Title style={{
            //             color: Colors.background,
            //             marginTop: Platform.OS === 'android' ? 110 : 0,
            //         }}>Order History</Title>
            //         </Body>
            //         <Right/>
            //     </Header>
            //
            //     <ScrollView style={{flex: 1, backgroundColor: '#fff'} }>
            //         <LoadingSpinner show={this.props.order && this.props.order.showActivityIndicator}/>
            //         {this.renderHistory()}
            //     </ScrollView>
            // </Col>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.settings.user,
        order: state.order
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        orderActions: bindActionCreators(orderActionCreators, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(CustomerOrderHistory)