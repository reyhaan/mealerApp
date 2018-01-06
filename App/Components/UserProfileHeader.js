import React, {Component} from 'react'
// import PropTypes from 'prop-types';
import {View, Text, Image, TouchableOpacity, Platform, StatusBar} from 'react-native'
import {Header, Icon, Button, Avatar, Rating} from 'react-native-elements'
import {ImagePicker} from 'expo';
import {Grid, Col, Row} from 'react-native-easy-grid'
import {NavigationActions} from 'react-navigation'

import {Colors, Fonts, Images, Metrics} from '../Themes'
import styles from './Styles/UserProfileHeaderStyle'
import _ from 'lodash'
import menuService from '../Services/menu-service'

export default class UserProfileHeader extends Component {
    constructor(props) {
        super(props);
        const user = this.props.user;
        this.state = {
            user: user,
            numOfItems: 0,
            rating: user.rating ? (user.rating.cumulativeRating / user.rating.numberOfRatings) : 0
        }
    }

    componentDidMount = async () => {
        let menu = await menuService.getMenu(this.state.user.id);
        this.setState({
            numOfItems: menu.length
        })
    };

    _backButton = () => {
        return (
            <Icon
                name={'close'}
                color={Colors.gray}
                style={{padding: 10}}
                onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
            />
        )
    };

    _infoButton = () => {
        return (
            <Icon
                name={'ios-information-circle-outline'}
                type='ionicon'
                color={Colors.gray}
                size={28}
                style={{padding: 10}}
                onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
            />
        )
    };

    render() {
        let {user} = this.props;
        return (
            <View style={styles.mainContainer}>

                <StatusBar barStyle='dark-content'/>

                <Image
                    style={{
                        flex: 1,
                        resizeMode: 'cover',
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center'
                    }}
                    source={Images.bg1}>

                    <Grid style={{backgroundColor: Colors.windowDark}}>
                        <Col size={1} style={{alignItems: 'center', justifyContent: 'center'}}></Col>

                        <Col size={1} style={{alignItems: 'center', justifyContent: 'center'}}>
                            <Image
                                source={{uri: user.avatar}}
                                style={styles.userImage}>
                            </Image>
                        </Col>

                        <Col size={1} style={{alignItems: 'center', justifyContent: 'center'}}></Col>
                    </Grid>

                    <View style={styles.subContainer}>
                        <Grid>

                            <Row style={{height: 30, alignItems: 'center', justifyContent: 'center', marginTop: 5}}>
                                <Text style={styles.userName}>{user.name}</Text>
                            </Row>

                            <Row size={1}>
                                <Col size={1}>
                                    <Row size={1} style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                                        <Text style={{
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                            color: Colors.snow
                                        }}>{user.quota || 20}</Text>
                                    </Row>
                                    <Row size={1} style={{
                                        flex: 1,
                                        alignItems: 'flex-start',
                                        justifyContent: 'center',
                                        paddingTop: 2
                                    }}>
                                        <Text style={{color: Colors.snow, fontSize: 12}}>ORDER LIMIT</Text>
                                    </Row>
                                </Col>

                                <Col size={1}>
                                    <Row size={1} style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                                        <Text style={{
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                            color: Colors.snow
                                        }}>{this.state.rating.toFixed(1)}</Text>
                                    </Row>
                                    <Row size={1} style={{
                                        flex: 1,
                                        alignItems: 'flex-start',
                                        justifyContent: 'center',
                                        paddingTop: 2
                                    }}>
                                        <Text style={{color: Colors.snow, fontSize: 12}}>RATING</Text>
                                    </Row>
                                </Col>

                                <Col size={1}>
                                    <Row size={1} style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                                        <Text style={{
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                            color: Colors.snow
                                        }}>{this.state.numOfItems}</Text>
                                    </Row>
                                    <Row size={1} style={{
                                        flex: 1,
                                        alignItems: 'flex-start',
                                        justifyContent: 'center',
                                        paddingTop: 2
                                    }}>
                                        <Text style={{color: Colors.snow, fontSize: 12}}>ITEMS</Text>
                                    </Row>
                                </Col>
                            </Row>

                        </Grid>

                    </View>
                </Image>

            </View>
        )
    }
}
