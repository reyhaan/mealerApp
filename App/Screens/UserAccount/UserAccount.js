import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import SnackBar from 'react-native-snackbar-component';
import { TextInputMask } from 'react-native-masked-text';
import { ScrollView, View, KeyboardAvoidingView, Text, Alert } from 'react-native';
import { Button, Form, Item, Input, Label } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation';
import { Col, Row, Grid } from 'react-native-easy-grid';
import UserInfoChangeScreenStyle from './UserAccount.style';
import { Colors, Fonts, Metrics, Images } from '../../Themes/index';
import { userActionCreators } from '../../Store/User/UserActions';
import UserAvatar from '../../Components/UserAvatar';
import ScreenHeader from '../../Components/ScreenHeader';

const styles = UserInfoChangeScreenStyle;

class UserAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        id: '',
        name: '',
        address: '',
        phone: '',
        email: '',
        avatar: '',
        userImage: '',
      },
      showToast: false,
      toastMessage: '',
    };
  }

  componentWillMount() {
    const { user } = this.props;
    const { currentUser } = user;
    if (currentUser) {
      this.setState({
        currentUser: {
          name: currentUser.name || '',
          avatar: currentUser.avatar || { uri: Images.addImagePlaceHolder },
          address: currentUser.address || '',
          phone: currentUser.phone || '',
          email: currentUser.email || '',
        },
      });
    } else {
      Alert.alert('Error:', 'unable to retrieve your info');
    }
  }

  onInputChange = (value, name) => {
    let validValue;
    if (name === 'phone' && value.length > 14) {
      validValue = value.slice(0, 14);
    } else {
      validValue = value;
    }
    this.setState({ currentUser: { ...this.state.currentUser, [name]: validValue } });
  };

  setUserAvatar = (image) => {
    this.setState({ currentUser: { ...this.state.currentUser, avatar: image.uri, base64Img: image.base64 } });
  };

  navigateBack = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  };

  displayToast = (message) => {
    this.setState({ showToast: true, toastMessage: message }, () =>
      setTimeout(() => {
        this.setState({ showToast: false, toastMessage: '' });
      }, 2000));
  };

  _updateUserDetails = () => {
    const {
      name: newName, address: newAddress, email: newEmail, phone: newPhone, avatar,
    } = this.state.currentUser;

    const existingUser = this.props.user.currentUser;
    if (!(newName && newEmail)) {
      if (newName && newEmail || newName && newEmail) {
        Alert.alert('Name and Email is required');
      } else {
        this.displayToast('Update Error');
      }
    } else {
      const conditionToUpdateUser = existingUser.avatar !== avatar ||
        existingUser.name !== newName ||
        existingUser.address !== newAddress ||
        existingUser.email !== newEmail ||
        existingUser.phone !== newPhone;
      if (conditionToUpdateUser) {
        this.props.userActions.updateUser({
          uid: this.props.user.currentUser.uid,
          currentUser: this.state.currentUser,
        });
        this.displayToast('Successfully Updated ');
      } else {
        this.displayToast('Nothing to update');
      }
    }
  };

  headerLeftComponent = () => {
    return (
      <Button transparent onPress={() => this.navigateBack()}>
        <Icon name="chevron-left" size={20} color={Colors.background} />
      </Button>
    );
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.container}>
          <ScreenHeader title="Account" leftComponent={this.headerLeftComponent} />
          <ScrollView>
            <Grid>
              <Row size={1} style={{ backgroundColor: Colors.cloud }}>
                <View style={styles.formContainer}>
                  <UserAvatar image={this.state.currentUser.avatar} setUserAvatar={this.setUserAvatar} />
                  <Form>
                    <Item stackedLabel style={styles.formItemContainer}>
                      <Label>Display Name</Label>
                      <Input
                        autoCapitalize="none"
                        value={this.state.currentUser.name}
                        placeholder="Your name"
                        onChangeText={value => this.onInputChange(value, 'name')}
                      />
                    </Item>
                    <Item stackedLabel style={styles.formItemContainer}>
                      <Label>Address</Label>
                      <Input
                        autoCapitalize="none"
                        keyboardType="default"
                        value={this.state.currentUser.address}
                        onChangeText={value => this.onInputChange(value, 'address')}
                      />
                    </Item>
                    <Item stackedLabel style={styles.formItemContainer}>
                      <Label>Email</Label>
                      <Input
                        autoCapitalize="none"
                        keyboardType="email-address"
                        value={this.state.currentUser.email}
                        onChangeText={value => this.onInputChange(value, 'email')}
                      />
                    </Item>
                    <Item stackedLabel style={styles.formItemContainer}>
                      <Label>Phone Number</Label>
                      <TextInputMask
                        underlineColorAndroid="transparent"
                        ref="celPhone"
                        type="cel-phone"
                        options={{
                          withDDD: true,
                          dddMask: '(999) 999-9999',
                        }}
                        value={this.state.currentUser.phone}
                        onChangeText={value => this.onInputChange(value, 'phone')}
                        style={{ width: '100%', height: 45 }}
                        placeholder="613-XXX-XXXX"
                        keyboardType="number-pad"
                      />
                    </Item>
                  </Form>

                  <Row style={{
                    height: 40,
                    marginTop: Metrics.doubleBaseMargin,
                    marginBottom: Metrics.doubleBaseMargin,
                    marginLeft: 20,
                    marginRight: 20,
                  }}
                  >

                    <Col size={1}>
                      <Button
                        block
                        style={{ backgroundColor: Colors.green }}
                        textStyle={{
                          textAlign: 'center',
                          fontFamily: Fonts.type.bold,
                          fontWeight: 'bold',
                        }}
                        onPress={() => this._updateUserDetails()}
                      >
                        <Text style={{ color: Colors.white, fontWeight: 'bold' }}> UPDATE </Text>
                      </Button>
                    </Col>
                  </Row>
                </View>
              </Row>
            </Grid>
          </ScrollView>
        </View>
        <View style={{
          display: 'flex', justifyContent: 'center', marginLeft: 20, marginRight: 20,
        }}
        >
          <SnackBar
            visible={this.state.showToast}
            textMessage={this.state.toastMessage}
            bottom={0}
            position="bottom"
            backgroundColor="#272A2F"
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  menu: state.menu,
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  userActions: bindActionCreators(userActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
