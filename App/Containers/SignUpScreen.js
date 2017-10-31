import React, { Component } from 'react'
import { connect } from 'react-redux'
import { UserSignUp } from '../Components'

class SignUpScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <UserSignUp navigation={this.props.navigation}/>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)