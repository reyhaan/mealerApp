import React, {Component} from 'react'
import {ScrollView, View} from 'react-native'
import {connect} from 'react-redux'
import {List, ListItem} from 'react-native-elements'
import SettingsTabStyle from './Settings.style'
import {Header} from 'react-native-elements'
import {bindActionCreators} from 'redux'
import {Colors} from '../../Themes/index'
import {authActionCreators} from '../../Redux/Auth/AuthActions'

const styles = SettingsTabStyle;

class Settings extends Component {

    onSignOut = () => {
        this.props.signOut()
    };

    render() {
        return (
            <View style={styles.container}>
                <Header
                    centerComponent={{text: 'SETTINGS', style: {color: Colors.background, fontWeight: 'bold'}}}
                    backgroundColor={Colors.snow}
                    outerContainerStyles={styles.headerOuterContainer}/>

                <ScrollView style={styles.scrollContainer}>
                    <List wrapperStyle={styles.listWrapper} containerStyle={styles.listContainer}>
                        <ListItem
                            onPress={() => {
                                this.props.navigation.navigate("UserSettings", {page: "Update Profile"})
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
            </View>
        )
    }
}


const mapDispatchToProps = (dispatch) => (bindActionCreators(authActionCreators, dispatch));
const mapStateToProps = state => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Settings)