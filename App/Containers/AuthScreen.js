import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Login } from '../Components'

class AuthScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <Login/>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)