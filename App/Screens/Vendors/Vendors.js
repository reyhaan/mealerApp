import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Avatar, Rating } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CooksTabStyle from './Vendors.style';
import LoadingSpinner from '../../Components/LoadingSpinner';
import { Colors } from '../../Themes/index';
import { vendorActionCreators } from '../../Store/Vendor/VendorActions';
import ScreenHeader from '../../Components/ScreenHeader';

const styles = CooksTabStyle;

class Vendors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentWillReceiveProps() {
    const { props } = this;
    const currentScreen = props.navState.routes[props.navState.index];
    this.setState({
      currentScreen: { ...currentScreen },
    });
  }

  fetchVendors = () => {
    const { props } = this;
    props.vendorActions.fetchVendors();
  };

    renderVendor = (data) => {
      const { props } = this;
      const vendor = data.item;
      return (
        <TouchableOpacity onPress={() => {
                props.vendorActions.setSelectedVendor(vendor);
                props.vendorActions.getSelectedVendor(vendor);
                props.navigation.navigate('Vendor');
            }}
        >
          <View style={styles.row}>
            <View style={styles.rowInnerContainer}>
              <Grid>
                <Col style={{ width: 60 }}>
                  <Avatar
                    medium
                    rounded
                    source={{ uri: vendor.avatar }}
                  />
                </Col>
                <Col style={{ paddingLeft: 5 }}>
                  <Row style={{ height: 20 }}>
                    <Text style={styles.boldLabel}>{vendor.name}</Text>
                  </Row>
                  <Row style={{ height: 18 }}>
                    <Text style={{ fontSize: 12, color: Colors.charcoal }}>Cousine Type
                      <Text style={{ fontWeight: 'bold' }}>: {vendor.cousineType}</Text>
                    </Text>
                  </Row>
                  <Row style={{ height: 18 }}>
                    <Col>
                      <Text style={{
                                            fontSize: 12,
                                            textAlign: 'left',
                                            paddingRight: 5,
                                            color: Colors.charcoal,
                                        }}
                      >{vendor.quotaUsed} of {vendor.quotaLimit} left
                      </Text>
                    </Col>
                  </Row>
                  <Row style={{ height: 22 }}>
                    <Rating
                      type="star"
                      ratingColor={Colors.pink2}
                      fractions={1}
                      startingValue={Number(vendor.rating)}
                      readonly
                      imageSize={10}
                      onFinishRating={this.ratingCompleted}
                      style={{ paddingVertical: 2 }}
                    />
                  </Row>
                </Col>
              </Grid>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    render() {
      const { props } = this;
      let { refreshing } = this.state;
      if (props.request === true || props.request === false) {
        refreshing = props.request.showLoadingSpinner;
      }

      return (
        <View style={styles.container}>
          <ScreenHeader title="Vendors" />
          <LoadingSpinner show={props.request && props.request.showLoadingSpinner && this.state.currentScreen.routName === 'CustomerTab'} />

          <FlatList
            contentContainerStyle={styles.listContent}
            data={props.vendors}
            refreshing={refreshing}
            onRefresh={() => this.fetchVendors()}
            renderItem={this.renderVendor}
          />
        </View>
      );
    }
}

const mapStateToProps = state => ({
  vendor: state.vendor,
  vendors: state.vendors,
  request: state.request,
  navState: state.navigation,
});

const mapDispatchToProps = dispatch => ({
  vendorActions: bindActionCreators(vendorActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Vendors);
