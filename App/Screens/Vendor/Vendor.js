import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Rating } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import SnackBar from 'react-native-snackbar-component';
import { Header, Left, Body, Right, Button, Title } from 'native-base';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { bindActionCreators } from 'redux';
import VendorEmail from './Components/VendorEmail';
import VendorAddress from './Components/VendorAddress';
import VendorPhone from './Components/VendorPhone';
import style from './Vendor.style';
import VendorInfo from './Components/VendorInfo';
import AddToCartModal from './Components/AddToCartModal';
import { Colors } from '../../Themes/index';
import { vendorActionCreators } from '../../Store/Vendor/VendorActions';
import { cartActionCreators } from '../../Store/Cart/CartActions';
import { LoadingSpinner } from '../../Components/index';

class Vendor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: true,
      showDetails: false,
      showSelectedItem: false,
      selectedItem: {
        itemName: '',
        itemImage: '',
        itemDetail: '',
        itemCost: '',
      },
    };
  }

  selectVendorItem = (mode, selectedItem) => {
    switch (mode) {
      case 'list':
        this.setState({
          selectedItem,
          showSelectedItem: true,
        });
        break;
      // TODO: made 2 cases because I want to apply transitions instead of dialog box
      case 'full':
        this.setState({
          selectedItem,
          showSelectedItem: true,
        });
        break;
      default:
        this.setState({
          selectedItem,
          showSelectedItem: true,
        });
        break;
    }
  };

  ratingCompleted = (rating) => {
    const { props } = this;
    const ratingData = {
      rating,
      merchantId: props.vendor.selectedVendor.uid,
    };
    props.vendorActions.updateRating(ratingData);

    this.setState({ showToast: true, toastMessage: 'Rating applied!' }, () =>
      setTimeout(() => {
        this.setState({ showToast: false, toastMessage: '' });
      }, 2000));
  };

  closeSelectedItemModal = () => {
    this.setState({
      showSelectedItem: false,
    });
  };

  _renderChefDetails = () => {
    const { props } = this;
    let ratingStartingValue = 5;
    if (props.vendor.selectedVendor.rating &&
      props.vendor.selectedVendor.rating.cumulativeRating) {
      ratingStartingValue = props.vendor.selectedVendor.rating.cumulativeRating /
        props.vendor.selectedVendor.rating.numberOfRatings
        || 2.5;
    }

    return (
      <Col style={{ padding: 20 }}>
        <Row style={{
          paddingBottom: 10,
          marginBottom: 10,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
        >

          <Rating
            showRating
            type="star"
            fractions={1}
            startingValue={ratingStartingValue}
            imageSize={20}
            onFinishRating={this.ratingCompleted}
            style={{ paddingVertical: 10, paddingTop: 0 }}
          />
          <Text style={{ color: Colors.gray, fontSize: 10 }}>slide over to rate</Text>
        </Row>

        <VendorAddress address={props.vendor.selectedVendor.address} />
        <VendorPhone phone={props.vendor.selectedVendor.phone} />
        <VendorEmail email={props.vendor.selectedVendor.email} />
      </Col>
    );
  };

  switchView = (mode) => {
    switch (mode) {
      case 'menu':
        this.setState({
          showMenu: true,
          showDetails: false,
        });
        break;
      case 'details':
        this.setState({
          showMenu: false,
          showDetails: true,
        });
        break;
      default:
        this.setState({
          showMenu: true,
          showDetails: false,
        });
        break;
    }
  };

  navigateBack = () => {
    const { props } = this;
    props.navigation.dispatch(NavigationActions.back());
  };

  renderVendorItem = item => (
    <TouchableOpacity onPress={() => this.selectVendorItem('full', item)} style={style.fullModeItemContainer}>
      <Grid>
        <Row style={{ height: 200 }}>
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
          }}
          >
            <Image
              style={style.fullModeItemImage}
              source={{ uri: item.itemImage }}
            />
          </View>
        </Row>

        <Row style={{ height: 60 }}>
          <Col size={2} style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
            <Text
              ellipsizeMode="tail"
              numberOfLines={2}
              style={style.fullModeItemName}
            >{item.itemName}
            </Text>
          </Col>
          <Col size={1} style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
            <Text style={style.fullModeItemCost}>$ {parseFloat(item.itemCost).toFixed(2)}</Text>
          </Col>
        </Row>
      </Grid>
    </TouchableOpacity>
  );

  render() {
    const { props } = this;
    return (
      <Col>
        <Header
          iosBarStyle="dark-content"
          style={{ backgroundColor: Colors.snow, paddingBottom: Platform.OS === 'android' ? 80 : 0 }}
        >
          <Left style={{ marginTop: Platform.OS === 'android' ? 110 : 0 }} >
            <Button transparent onPress={() => this.navigateBack()}>
              <Icon name="chevron-left" size={20} color={Colors.background} />
            </Button>
          </Left>
          <Body>
            <Title style={{
            color: Colors.background,
            marginTop: Platform.OS === 'android' ? 110 : 0,
          }}
            >{props.vendor.selectedVendor.name}
            </Title>
          </Body>
          <Right />
        </Header>

        <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>

          <AddToCartModal
            showSelectedItem={this.state.showSelectedItem}
            selectedItem={this.state.selectedItem}
            closeSelectedItemModal={this.closeSelectedItemModal}
            selectedVendor={props.vendor.selectedVendor}
          />

          <VendorInfo user={props.vendor.selectedVendor} />

          <View style={{
            height: 50,
            borderBottomColor: Colors.lightGray,
            borderBottomWidth: 1,
            backgroundColor: Colors.silver,
          }}
          >
            <Grid>
              <TouchableWithoutFeedback onPress={() => this.switchView('menu')}>
                <Col
                  size={1}
                  style={{
                    backgroundColor: (this.state.showMenu) ? Colors.background : Colors.clear,
                    borderLeftColor: Colors.gray2,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <View>
                    <Text style={{
                      color: (this.state.showMenu) ? Colors.snow : Colors.charcoal,
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}
                    >MENU
                    </Text>
                  </View>
                </Col>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={() => this.switchView('details')}>
                <Col
                  size={1}
                  style={{
                    backgroundColor: (this.state.showDetails) ? Colors.background : Colors.clear,
                    borderLeftWidth: 1,
                    borderLeftColor: Colors.gray2,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <View>
                    <Text style={{
                      color: (this.state.showDetails) ? Colors.snow : Colors.charcoal,
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}
                    >CONTACT INFO
                    </Text>
                  </View>
                </Col>
              </TouchableWithoutFeedback>
            </Grid>
          </View>

          {this.state.showDetails && this._renderChefDetails()}

          <LoadingSpinner show={props.request && props.request.showLoadingSpinner} />

          {this.state.showMenu &&
          <FlatList
            style={{ backgroundColor: Colors.snow, paddingTop: 10 }}
            data={props.vendor.selectedVendor.menus}
            renderItem={({ item }) => this.renderVendorItem(item)}
          />}

          {!props.vendor.selectedVendor.menus || props.vendor.selectedVendor.menus.length === 0 &&
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            <Text style={{ color: Colors.gray, fontSize: 15, marginTop: 30 }}>
              Vendor has no listings:(
            </Text>
          </View>}

        </ScrollView>

        <SnackBar
          visible={this.state.showToast}
          textMessage={this.state.toastMessage}
          bottom={0}
          position="bottom"
          backgroundColor="#272A2F"
        />
      </Col>
    );
  }
}

const mapStateToProps = state => ({
  vendor: state.vendor,
  menu: state.menu,
  auth: state.auth,
  request: state.request,
  navState: state.navigation,
});
const mapDispatchToProps = dispatch => ({
  vendorActions: bindActionCreators(vendorActionCreators, dispatch),
  cartActions: bindActionCreators(cartActionCreators, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Vendor);
