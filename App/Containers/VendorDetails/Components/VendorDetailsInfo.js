import React, {Component} from 'react'
import {View, Text, Image} from 'react-native'
import {Grid, Col, Row} from 'react-native-easy-grid'
import {Colors} from '../../../Themes/index'
import styles from './VendorDetailsInfo.style'
import menuService from '../../../Services/menu-service'

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

    render() {
        let {user} = this.props;
        return (
            <View style={styles.mainContainer}>
                <Grid>
                    <Row size={70} style={{alignItems: 'center', justifyContent: 'center'}}>
                        <Image source={{uri: user.avatar}} style={styles.userImage}/>
                    </Row>
                    <Row size={30}>
                        <Col>
                            <Row size={1} style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: Colors.gray
                                }}>{user.quota || 20}</Text>
                            </Row>
                            <Row size={1} style={{
                                flex: 1,
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                paddingTop: 2
                            }}>
                                <Text style={{color: Colors.gray, fontSize: 12}}>ORDER LIMIT</Text>
                            </Row>
                        </Col>
                        <Col>
                            <Row size={1} style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: Colors.gray
                                }}>{this.state.rating.toFixed(1)}</Text>
                            </Row>
                            <Row size={1} style={{
                                flex: 1,
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                paddingTop: 2
                            }}>
                                <Text style={{color: Colors.gray, fontSize: 12}}>RATING</Text>
                            </Row>
                        </Col>
                        <Col>
                            <Row size={1} style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                                <Text style={{
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                    color: Colors.gray
                                }}>{this.state.numOfItems}</Text>
                            </Row>
                            <Row size={1} style={{
                                flex: 1,
                                alignItems: 'flex-start',
                                justifyContent: 'center',
                                paddingTop: 2
                            }}>
                                <Text style={{color: Colors.gray, fontSize: 12}}>ITEMS</Text>
                            </Row>
                        </Col>
                    </Row>
                </Grid>
            </View>
        )
    }
}
