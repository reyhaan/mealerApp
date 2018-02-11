import React, {Component} from 'react'
import {View, Text, TouchableWithoutFeedback} from 'react-native'
import {Colors, Fonts} from '../../../Themes/index'
import {Button} from 'native-base';
import style from './AddToCartButton.style'
import {Col, Row, Grid} from 'react-native-easy-grid'
import {Icon} from 'react-native-elements'

export default class AddToCartButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemCount: 1
        }
    }

    decreaseItemCount = () => {
        this.setState({
            itemCount: this.state.itemCount > 1 ? this.state.itemCount - 1 : this.state.itemCount
        })
    };

    increaseItemCount = () => {
        this.setState({
            itemCount: this.state.itemCount + 1
        })
    };

    render() {
        return (
            <View style={style.container}>
                <Grid style={{borderRadius: 5}}>
                    <Col size={1} style={style.minusItem}>
                        <Icon
                            name={'minus'}
                            color={Colors.snow}
                            type='font-awesome'
                            onPress={() => this.decreaseItemCount()}
                        />
                    </Col>

                    <Col size={1} style={style.itemCount}>
                        <Text style={[Fonts.style.bold, {
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: Colors.snow
                        }]}>{this.state.itemCount}</Text>
                    </Col>

                    <Col size={1} style={style.addItem}>
                        <Icon
                            name={'plus'}
                            color={Colors.snow}
                            type='font-awesome'
                            onPress={() => this.increaseItemCount()}
                        />
                    </Col>

                    <Col size={3} style={style.addToCartButton}>
                        <TouchableWithoutFeedback onPress={() => this.props.callback(this.state.itemCount)}>
                            <View style={style.buttonTextWrapper}>
                                <Text style={style.buttonText}>ADD TO CART</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </Col>
                </Grid>
            </View>
        )
    }
}