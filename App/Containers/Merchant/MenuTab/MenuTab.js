import React, { Component } from 'react'
import { ScrollView, Text, View, ListView } from 'react-native'
import { connect } from 'react-redux'
import { MenuTabStyle } from '../../Styles'
import { Header, SearchBar, Avatar, Rating } from 'react-native-elements' 
import { Col, Row, Grid } from 'react-native-easy-grid'; 

import { Colors, Images } from '../../../Themes';
import {fetchMenuCreator} from '../../../Redux/Menu/MenuActions';
import {bindActionCreators} from 'redux';
import {LoadingSpinner} from '../../../Components'

// Styles
const styles = MenuTabStyle;

class MenuTab extends Component {
  constructor (props) {
    super(props)
    this.props.fetchMenuCreator();

    const userObject = [
      {
        itemName: "Chicken Biryani",
        itemImage: Images.biryani,
        itemDetail: "A famous dish from India, made with slowly cooking rice with spicy chicken.",
        itemCost: 6.99
      }];

    const rowHasChanged = (r1, r2) => r1 !== r2

    const ds = new ListView.DataSource({rowHasChanged})

    this.state = {
      menuObject : userObject,
      dataSource:  ds.cloneWithRows(userObject)
    }

  }
  getMenu = ()=>{
    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({rowHasChanged});
    return this.props.fetchMenuReducer ? ()=>{this.setState({
          dataSource : ds.cloneWithRows(this.props.fetchMenuReducer)
        }); console.log(this.props.fetchMenuReducer); return true} : false;

  }
  _renderRow (rowData) {
    return (
      <View style={styles.row}>
        <View style={styles.rowInnerContainer}>
          <Grid>
              <Col style={{ width: 60 }}>
                  <Avatar
                    medium
                    source={rowData.itemImage}
                  />
              </Col>
              <Col>
                  <Row style={{ height: 20}}>
                      <Text style={styles.boldLabel}>{rowData.itemName}</Text>
                  </Row>
                  <Row style={{ height: 26 }}>
                      <Text style={{fontSize: 11, color: Colors.charcoal}} numberOfLines={2} >{rowData.itemDetail}</Text>
                  </Row>
              </Col>
              <Col style={{ width: 60 }}>
                  <Row style={{ height: 20, flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                      <Text style={styles.boldLabel}>$ {rowData.itemCost}</Text>
                  </Row>
              </Col>
          </Grid>
        </View>
      </View>
    )
  }

  _noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  render () {
        return (
          <View style={styles.container}>

            <Header
              centerComponent = {{ text: 'MENU', style: { color: '#fff', fontWeight: 'bold' } }}
              backgroundColor = {Colors.background}
              outerContainerStyles = { styles.headerOuterContainer }
            />

            <ListView
              contentContainerStyle={styles.listContent}
              dataSource={this.state.dataSource}
              renderRow={this._renderRow}
              enableEmptySections
              pageSize={15}
            /> 

          </View>
        )
    
  }
}

const mapStateToProps = (state) => {
  return {
    fetchMenuReducer: state.fetchMenuReducer,
    auth : state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchMenuCreator : fetchMenuCreator}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuTab)
