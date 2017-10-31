import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Login } from '../Components'

class LoginScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <Login navigation={this.props.navigation}/>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({})
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)