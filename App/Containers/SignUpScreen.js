import React, {Component} from 'react'
import {ScrollView, Text} from 'react-native'
import {connect} from 'react-redux'

class SignUpScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <ScrollView>
                <Text>Sign up screen</Text>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)