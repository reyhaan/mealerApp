import React, {Component} from 'react'
import {
    Text,
    View,
    FlatList,
    TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import CooksTabStyle from './Vendors.style'
import {SearchBar, Avatar, Rating} from 'react-native-elements'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Colors,} from '../../Themes/index'
import {vendorActionCreators} from '../../Redux/Vendor/VendorActions'
import {Header, Left, Body, Right, Button, Title, Form, Item, Input, Label} from 'native-base';
// Styles
const styles = CooksTabStyle;

class Vendors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        }
    }

    componentDidMount = () => {
        this.props.vendorActions.fetchVendors();
    };

    searchComponent() {
        return (
            <SearchBar
                darkTheme
                clearIcon
                containerStyle={{backgroundColor: Colors.background, borderBottomColor: Colors.pink2}}
                inputStyle={{backgroundColor: Colors.background, color: Colors.snow}}
                placeholder='Type Here...'/>
        )
    }

    fetchVendors = () => {
        this.props.vendorActions.fetchVendors();
    };

    renderVendor = data => {
        const vendor = data.item;
        return (
            <TouchableOpacity onPress={() => {
                this.props.vendorActions.setSelectedVendor(vendor);
                this.props.vendorActions.getSelectedVendor(vendor);
                this.props.navigation.navigate('VendorDetails');
            }}>
                <View style={styles.row}>
                    <View style={styles.rowInnerContainer}>
                        <Grid>
                            <Col style={{width: 60}}>
                                <Avatar
                                    medium
                                    rounded
                                    source={{uri: vendor.avatar}}
                                />
                            </Col>
                            <Col style={{paddingLeft: 5}}>
                                <Row style={{height: 20}}>
                                    <Text style={styles.boldLabel}>{vendor.name}</Text>
                                </Row>
                                <Row style={{height: 18}}>
                                    <Text style={{fontSize: 12, color: Colors.charcoal}}>Cousine Type
                                        <Text style={{fontWeight: 'bold'}}>: {vendor.cousineType}</Text>
                                    </Text>
                                </Row>
                                <Row style={{height: 18}}>
                                    <Col>
                                        <Text style={{
                                            fontSize: 12,
                                            textAlign: 'left',
                                            paddingRight: 5,
                                            color: Colors.charcoal
                                        }}>{vendor.quotaUsed} of {vendor.quotaLimit} left</Text>
                                    </Col>
                                </Row>
                                <Row style={{height: 22}}>
                                    <Rating
                                        type="star"
                                        ratingColor={Colors.pink2}
                                        fractions={1}
                                        startingValue={Number(vendor.rating)}
                                        readonly
                                        imageSize={10}
                                        onFinishRating={this.ratingCompleted}
                                        style={{paddingVertical: 2}}
                                    />
                                </Row>
                            </Col>
                        </Grid>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    render() {
        return (
            <View style={styles.container}>
                <Header iosBarStyle="dark-content" style={{backgroundColor: Colors.snow, paddingTop: 15 }}>
                    <Left/>
                    <Body>
                    <Title style={{color: Colors.background}}>Vendors</Title>
                    </Body>
                    <Right/>
                </Header>
                <FlatList
                    contentContainerStyle={styles.listContent}
                    data={this.props.vendor.vendors}
                    renderItem={this.renderVendor}/>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        vendor: state.vendor,
        request: state.request
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        vendorActions: bindActionCreators(vendorActionCreators, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Vendors)
