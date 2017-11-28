import React, {Component} from 'react'
import {ScrollView} from 'react-native'
import {connect} from 'react-redux'
import {List, ListItem} from 'react-native-elements'
import SettingsTabStyle from './SettingsTab.style'
import {Header} from 'react-native-elements'
import {bindActionCreators} from 'redux'
import {Colors} from '../../Themes/index'
import {authActionCreators} from '../../Redux/Auth/AuthActions'

const styles = SettingsTabStyle;

class SettingsTab extends Component {

    onSignOut = () => {
        this.props.signOut()
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <Header
                    centerComponent={{text: 'SETTINGS', style: {color: '#fff', fontWeight: 'bold'}}}
                    backgroundColor={Colors.background}
                    outerContainerStyles={styles.headerOuterContainer}/>

                <List wrapperStyle={styles.listWrapper} containerStyle={styles.listContainer}>
                    <ListItem
                        onPress={() => {
                            this.props.navigation.navigate("UserInfoChangeScreen", {page: "Update Profile"})
                        }}
                        chevronColor={Colors.background}
                        titleStyle={styles.listTitle}
                        containerStyle={styles.listItem}
                        leftIcon={{
                            name: 'home',
                            type: 'font-awesome',
                            style: {color: Colors.background, fontSize: 18}
                        }}
                        title={'Update Profile'}
                    />
                    <ListItem
                        onPress={() => {
                            this.onSignOut()
                        }}
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
        )
    }
}


const mapDispatchToProps = (dispatch) => (bindActionCreators(authActionCreators, dispatch));
const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsTab)
