import React, {Component} from 'react'
import {ScrollView} from 'react-native'
import {connect} from 'react-redux'
import {Button, Text, List, ListItem} from 'react-native-elements'
import SettingsTabStyle from './SettingsTab.style'
import {Header} from 'react-native-elements'
import {bindActionCreators} from 'redux'
import {Colors} from '../../Themes/index'
import {authActionCreators} from '../../Redux/Auth/AuthActions'

// Styles
const styles = SettingsTabStyle

const list = [
    {
        name: 'Update Profile',
        icon: 'home',
        screen: 'UserInfoChangeScreen'
    },
    {
        name: 'Delivery Address',
        icon: 'user',
        screen: 'UserInfoChangeScreen'
    },
    {
        name: 'Account Credits',
        icon: 'lock',
        screen: 'UserInfoChangeScreen'
    },
    {
        name: 'Refer Friends',
        icon: 'lock',
        screen: 'UserInfoChangeScreen'
    }
];


class SettingsTab extends Component {
    
    onSignOut = () => {
        this.props.signOut()
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Header
                    centerComponent={{text: 'SETTINGS', style: {color: '#fff', fontWeight: 'bold'}}}
                    backgroundColor={Colors.background}
                    outerContainerStyles={styles.headerOuterContainer}/>

                <List wrapperStyle={styles.listWrapper} containerStyle={styles.listContainer}>
                    {list.map((l, i) => (
                        <ListItem
                            underlayColor={Colors.backgroundDarker} //to be changed
                            onPress={() => {
                                this.props.navigation.navigate(l.screen, {page: l.name.toUpperCase()})
                            }}
                            chevronColor='#FFFFFF'
                            titleStyle={styles.listTitle}
                            containerStyle={styles.listItem}
                            leftIcon={{name: l.icon, type: 'font-awesome', style: {color: '#FFFFFF', fontSize: 18}}}
                            key={i}
                            title={l.name}
                        />
                    ))}
                    <ListItem
                        underlayColor={Colors.backgroundDarker} // to be changed
                        onPress={() => {
                            this.onSignOut()
                        }}
                        chevronColor='#FFFFFF'
                        titleStyle={styles.listTitle}
                        containerStyle={styles.listItem}
                        leftIcon={{
                            name: 'sign-out',
                            type: 'font-awesome',
                            style: {color: '#FFFFFF', fontSize: 18}
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
