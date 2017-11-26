import React, {Component} from 'react'
import {ScrollView, View, Platform, KeyboardAvoidingView, TextInput} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
import {Header, Icon, Button, FormInput, FormLabel} from 'react-native-elements'
import UserInfoChangeScreenStyle from './UserInfoChangeScreen.style'
import {Colors, Fonts, Metrics} from '../../Themes/index'
import {NavigationActions} from 'react-navigation'
import {Col, Row, Grid} from 'react-native-easy-grid'
import {settingsActionCreators} from '../../Redux/Settings/SettingsActions'
import {Alert} from 'react-native';
import {Form, Item, Input, Label} from 'native-base';
const styles = UserInfoChangeScreenStyle;

class UserInfoChangeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
            phone: '',
            email: ''
        }
    }

    componentDidMount() {
        // const currentUser = this.props.settings.user;
        // currentUser
        //     ? this.setState({
        //         name: currentUser.name || '',
        //         address: currentUser.address || '',
        //         phone: currentUser.phone || '',
        //         email: currentUser.email || ''
        //     })
        //     : Alert.alert('Error:', 'unable to retrieve your info')
    }

    _backButton = () => {
        return (
            <Icon
                name={Platform.OS === 'ios' ? 'chevron-left' : 'arrow-back'}
                color={Colors.snow}
                onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
            />
        )
    }

    _updateUserDetails = () => {
        const {name: newName, address: newAddress, email: newEmail, phone: newPhone} = this.state
        const existingUser = this.props.settings.user
        if (newName && newEmail) {
            ((existingUser.name !== newName)
                || (existingUser.address !== newAddress)
                || (existingUser.email !== newEmail)
                || (existingUser.phone !== newPhone))
                ? this.props.updateUserInfo({uid: existingUser.uid, userDetails: this.state})
                : ''
        }
        else Alert.alert('Name and Email is required')
    }

    onInputChange = (value, name) => {
        this.setState({[name]: value})
    };

    render() {
        const {params} = this.props.navigation.state;

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.container}>
                    <Header
                        leftComponent={this._backButton()}
                        centerComponent={{text: "Settings", style: {color: '#fff', fontWeight: 'bold'}}}
                        backgroundColor={Colors.background}
                        outerContainerStyles={styles.headerOuterContainer}
                    />
                    <ScrollView>
                        <Grid>
                            <Row size={1} style={{backgroundColor: Colors.cloud}}>
                                <View style={styles.formContainer}>
                                    <Form>
                                        <Item floatingLabel>
                                            <Label>Display Name</Label>
                                            <Input
                                                autoCapitalize="none"
                                                value={this.state.name}
                                                onChangeText={(value) => this.onInputChange(value, 'name')}/>
                                        </Item>
                                        <Item floatingLabel>
                                            <Label>Address</Label>
                                            <Input
                                                autoCapitalize="none"
                                                keyboardType="default"
                                                value={this.state.address}
                                                onChangeText={(value) => this.onInputChange(value, 'address')}/>
                                        </Item>
                                        <Item floatingLabel>
                                            <Label>Email</Label>
                                            <Input
                                                autoCapitalize="none"
                                                keyboardType="email-address"
                                                value={this.state.email}
                                                onChangeText={(value) => this.onInputChange(value, 'email')}/>
                                        </Item>
                                        <Item floatingLabel>
                                            <Label>Phone Number</Label>
                                            <Input
                                                autoCapitalize="none"
                                                keyboardType="number-pad"
                                                value={this.state.phone}
                                                onChangeText={(value) => this.onInputChange(value, 'phone')}/>
                                        </Item>
                                    </Form>

                                    <Row style={{
                                        height: 40,
                                        marginTop: Metrics.doubleBaseMargin,
                                        marginBottom: Metrics.doubleBaseMargin
                                    }}>

                                        <Col size={1}>
                                            <Button
                                                onPress={() => {
                                                    this._updateUserDetails()
                                                }}
                                                buttonStyle={[styles.greenButton]}
                                                textStyle={{
                                                    textAlign: 'center',
                                                    fontFamily: Fonts.type.bold,
                                                    fontWeight: 'bold'
                                                }}
                                                title={`UPDATE`}/>
                                        </Col>

                                    </Row>
                                </View>
                            </Row>

                        </Grid>
                    </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoChangeScreen)
