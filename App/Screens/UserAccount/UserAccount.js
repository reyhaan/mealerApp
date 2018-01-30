import React, {Component} from 'react'
import {ScrollView, View, KeyboardAvoidingView, Text, Platform} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import UserInfoChangeScreenStyle from './UserAccount.style'
import {Colors, Fonts, Metrics, Images} from '../../Themes/index'
import {NavigationActions} from 'react-navigation'
import {Col, Row, Grid} from 'react-native-easy-grid'
import {settingsActionCreators} from '../../Redux/Settings/SettingsActions'
import {Alert} from 'react-native';
import {Header, Left, Body, Right, Button, Title, Form, Item, Input, Label} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import SnackBar from 'react-native-snackbar-component'
import {TextInputMask} from 'react-native-masked-text';
import UserAvatar from '../../Components/UserAvatar'

const styles = UserInfoChangeScreenStyle;

class UserAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: '',
                name: '',
                address: '',
                phone: '',
                email: '',
                avatar: '',
                userImage: ''
            },
            showToast: false,
            toastMessage: ''
        };
        this.props.getUser(this.props.settings.user.uid)

    }

    async componentDidMount() {
        const currentUser = this.props.settings.user;
        currentUser
            ? this.setState({
                user: {
                    name: currentUser.name || '',
                    avatar: currentUser.avatar || {'uri': Images.addImagePlaceHolder}, //We need to use our own self defined place holder
                    address: currentUser.address || '',
                    phone: currentUser.phone || '',
                    email: currentUser.email || ''
                }
            })
            : Alert.alert('Error:', 'unable to retrieve your info')
    }

    setUserAvatar = (image) => {
        this.setState({user: {...this.state.user, avatar: image.uri, base64Img: image.base64}})
    };

    navigateBack = () => {
        this.props.navigation.dispatch(NavigationActions.back());
    };

    displayToast = (message) => {
        this.setState({showToast: true, toastMessage: message}, () =>
            setTimeout(() => {
                this.setState({showToast: false, toastMessage: ''})
            }, 2000))
    };

    _updateUserDetails = () => {
        const {name: newName, address: newAddress, email: newEmail, phone: newPhone, avatar: avatar} = this.state.user;
        const existingUser = this.props.settings.user;
        if (!(newName && newEmail)) {
            if (newName && newEmail || newName && newEmail) {
                Alert.alert('Name and Email is required')
            }
            else {
                this.displayToast("Update Error")
            }
        } else {
            const conditionToUpdateUser = existingUser.avatar !== avatar || existingUser.name !== newName || existingUser.address !== newAddress || existingUser.email !== newEmail || existingUser.phone !== newPhone
            if (conditionToUpdateUser) {
                this.props.updateUserInfo({uid: this.props.settings.user.uid, user: this.state.user});
                this.props.getUser(this.props.settings.user.uid);// refresh the cache after updating
                this.displayToast("Successfully Updated ")
            } else {
                this.displayToast("Nothing to update")
            }
        }
    };

    onInputChange = (value, name) => {
        let validValue;
        if (name === 'phone' && value.length > 14) {
            validValue = value.slice(0, 14)
        }
        else {
            validValue = value
        }
        this.setState({user: {...this.state.user, [name]: validValue}})
    };

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.container}>
                    <Header iosBarStyle="dark-content"
                            style={{backgroundColor: Colors.snow, paddingBottom: Platform.OS === 'android' ? 80 : 0}}>
                        <Left style={{marginTop: Platform.OS === 'android' ? 110 : 0}}>
                            <Button transparent onPress={() => this.navigateBack()}>
                                <Icon name="chevron-left" size={20} color={Colors.background}/>
                            </Button>
                        </Left>
                        <Body>
                        <Title style={{ color: Colors.background, marginTop: Platform.OS === 'android' ? 110 : 0}}>Account</Title>
                        </Body>
                        { Platform.OS === 'ios' && <Right/>}
                    </Header>

                    <ScrollView>
                        <Grid>
                            <Row size={1} style={{backgroundColor: Colors.cloud}}>
                                <View style={styles.formContainer}>
                                    <UserAvatar image={this.state.user.avatar} setUserAvatar={this.setUserAvatar}/>
                                    <Form>
                                        <Item stackedLabel style={styles.formItemContainer}>
                                            <Label>Display Name</Label>
                                            <Input
                                                autoCapitalize="none"
                                                value={this.state.user.name}
                                                placeholder={'Your name'}
                                                onChangeText={(value) => this.onInputChange(value, 'name')}/>
                                        </Item>
                                        <Item stackedLabel style={styles.formItemContainer}>
                                            <Label>Address</Label>
                                            <Input
                                                autoCapitalize="none"
                                                keyboardType="default"
                                                value={this.state.user.address}
                                                onChangeText={(value) => this.onInputChange(value, 'address')}/>
                                        </Item>
                                        <Item stackedLabel style={styles.formItemContainer}>
                                            <Label>Email</Label>
                                            <Input
                                                autoCapitalize="none"
                                                keyboardType="email-address"
                                                value={this.state.user.email}
                                                onChangeText={(value) => this.onInputChange(value, 'email')}/>
                                        </Item>
                                        <Item stackedLabel style={styles.formItemContainer}>
                                            <Label>Phone Number</Label>
                                            <TextInputMask
                                                underlineColorAndroid="transparent"
                                                ref={'celPhone'}
                                                type={'cel-phone'}
                                                options={{
                                                    withDDD: true,
                                                    dddMask: '(999) 999-9999'
                                                }}
                                                value={this.state.user.phone}
                                                onChangeText={(value) => this.onInputChange(value, 'phone')}
                                                style={{width: '100%', height: 45}}
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
                                        marginRight: 20
                                    }}>

                                        <Col size={1}>
                                            <Button block
                                                    style={{backgroundColor: Colors.green}}
                                                    textStyle={{
                                                        textAlign: 'center',
                                                        fontFamily: Fonts.type.bold,
                                                        fontWeight: 'bold',
                                                    }}
                                                    onPress={() => this._updateUserDetails()}
                                            >
                                                <Text style={{color: Colors.white, fontWeight: "bold"}}> UPDATE </Text>
                                            </Button>
                                        </Col>
                                    </Row>
                                </View>
                            </Row>
                        </Grid>
                    </ScrollView>
                </View>
                <View style={{display: 'flex', justifyContent: 'center', marginLeft: 20, marginRight: 20}}>
                    <SnackBar visible={this.state.showToast} textMessage={this.state.toastMessage}
                              bottom={0} position='bottom' backgroundColor='#272A2F'
                    />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        menu: state.menu,
        auth: state.auth,
        settings: state.settings
    }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(settingsActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount)
