import React, {Component} from 'react'
import {ScrollView, View, Alert} from 'react-native'
import {connect} from 'react-redux'
import {List, ListItem} from 'react-native-elements'
import SettingsTabStyle from './Account.style'
import {bindActionCreators} from 'redux'
import {Colors} from '../../Themes/index'
import {authActionCreators} from '../../Redux/Auth/AuthActions'
import {Header, Left, Body, Right, Button, Title} from 'native-base';

const styles = SettingsTabStyle;

class Settings extends Component {
    logout = () => {
        Alert.alert(
            'Are you sure you want to logout ?', '',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: () => this.props.signOut()},
            ],
            { cancelable: false }
        );
    };

    render() {
        const {user} = this.props.settings;
        return (
            <View style={styles.container}>
                <Header iosBarStyle="dark-content" style={{backgroundColor: Colors.snow, paddingTop: 15}}>
                    <Body>
                    <Title style={{color: Colors.background}}>Account</Title>
                    </Body>
                </Header>

                <ScrollView style={styles.scrollContainer}>
                    <List wrapperStyle={styles.listWrapper} containerStyle={styles.listContainer}>
                        <ListItem
                            onPress={() => {
                                this.props.navigation.navigate("UserAccount", {page: "User Account"})
                            }}
                            chevronColor={Colors.background}
                            titleStyle={styles.listTitle}
                            containerStyle={styles.listItem}
                            leftIcon={{
                                name: 'user-circle',
                                type: 'font-awesome',
                                style: {color: Colors.background, fontSize: 18}
                            }}
                            title={'User Account'}
                        />
                        {
                            user && user.type === 'customer' ?
                                <ListItem
                                    onPress={() => {
                                        this.props.navigation.navigate('CustomerOrderHistory')
                                    }}
                                    chevronColor={Colors.background}
                                    titleStyle={styles.listTitle}
                                    containerStyle={styles.listItem}
                                    leftIcon={{
                                        name: 'history',
                                        type: 'font-awesome',
                                        style: {color: Colors.background, fontSize: 18}
                                    }}
                                    title={'Order History'}
                                /> : null
                        }

                        <ListItem
                            onPress={() => {
                                this.logout()
                            }}
                            style={{marginTop: 10}}
                            chevronColor={Colors.background}
                            titleStyle={styles.listTitle}
                            containerStyle={styles.listItem}
                            leftIcon={{
                                name: 'sign-out',
                                type: 'font-awesome',
                                style: {color: Colors.background, fontSize: 18}
                            }}
                            title={'Logout'}
                        />
                    </List>
                </ScrollView>
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch) => (bindActionCreators(authActionCreators, dispatch));
const mapStateToProps = (state) => {
    return {
        settings: state.settings
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings)
