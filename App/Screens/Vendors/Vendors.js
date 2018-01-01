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
import {Header, SearchBar, Avatar, Rating} from 'react-native-elements'
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Colors,} from '../../Themes/index'
import {vendorActionCreators} from '../../Redux/Vendors/VendorActions'
import {LoadingSpinner} from '../../Components/index'

// Styles
const styles = CooksTabStyle;

class Vendors extends Component {
    constructor(props) {
        super(props);
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

    _renderRow(rowData) {
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('VendorDetails', {selectedCook: rowData})}>
                <View style={styles.row}>
                    <View style={styles.rowInnerContainer}>
                        <Grid>
                            <Col style={{width: 60}}>
                                <Avatar
                                    medium
                                    rounded
                                    source={{uri: rowData.avatar}}
                                />
                            </Col>
                            <Col style={{paddingLeft: 5}}>
                                <Row style={{height: 20}}>
                                    <Text style={styles.boldLabel}>{rowData.name}</Text>
                                </Row>
                                <Row style={{height: 18}}>
                                    <Text style={{fontSize: 12, color: Colors.charcoal}}>Cousine Type
                                        <Text style={{fontWeight: 'bold'}}>: {rowData.cousineType}</Text>
                                    </Text>
                                </Row>
                                <Row style={{height: 18}}>
                                    <Col>
                                        <Text style={{
                                            fontSize: 12,
                                            textAlign: 'left',
                                            paddingRight: 5,
                                            color: Colors.charcoal
                                        }}>{rowData.quotaUsed} of {rowData.quotaLimit} left</Text>
                                    </Col>
                                </Row>
                                <Row style={{height: 22}}>
                                    <Rating
                                        type="star"
                                        ratingColor={Colors.pink2}
                                        fractions={1}
                                        startingValue={Number(rowData.rating)}
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
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    // leftComponent={{icon: 'filter', color: Colors.background, type: 'font-awesome'}}
                    centerComponent={{text: 'VENDORS', style: {color: Colors.background, fontWeight: 'bold'}}}
                    rightComponent={{icon: 'search', color: Colors.background}}
                    outerContainerStyles={styles.headerOuterContainer}/>
                <LoadingSpinner show={this.props.vendors && this.props.vendors.showActivityIndicator}/>
                <FlatList
                    contentContainerStyle={styles.listContent}
                    data={this.props.vendors.vendors}
                    renderItem={({item}) => this._renderRow(item)}/>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        vendors: state.vendors
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        vendorActions: bindActionCreators(vendorActionCreators, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Vendors)
