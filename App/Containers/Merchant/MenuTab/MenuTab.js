import React, { Component } from 'react'
import { ScrollView, Text, View, ListView } from 'react-native'
import { connect } from 'react-redux'
import { MenuTabStyle } from '../../Styles'
import { Header, SearchBar, Avatar, Rating, Icon } from 'react-native-elements'
import { Col, Row, Grid } from 'react-native-easy-grid';
import {NavigationActions} from 'react-navigation';

import { Colors, Images } from '../../../Themes';
import {menuCreators} from '../../../Redux/Menu/MenuActions';
import {bindActionCreators} from 'redux';
import {LoadingSpinner} from '../../../Components'

// Styles
const styles = MenuTabStyle;

class MenuTab extends Component {
  constructor (props) {
    super(props)
    this.props.fetchMenuCreator();
  }

  _renderRow (rowData) {
    const ItemCostStyle = { height: 20,
      flex: 1, flexDirection: 'column',
      justifyContent: 'center', alignItems: 'center'}
    return (
      <View style={styles.row}>
        <View style={styles.rowInnerContainer}>
          <Grid>
              <Col style={{ width: 60 }}>
                  <Avatar
                    medium
                    source={{uri:rowData.itemImage}}
                  />
              </Col>
              <Col>
                  <Row style={{ height: 20}}>
                      <Text style={styles.boldLabel}>{rowData.itemName}</Text>
                  </Row>
                  <Row style={{ height: 26 }}>
                      <Text style={{fontSize: 11, color: Colors.charcoal}} numberOfLines={2}>
                      {rowData.itemDetail}</Text>
                  </Row>
              </Col>
              <Col style={{ width: 60 }}>
                  <Row style={ItemCostStyle}>
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

  addMenuItemButton = () => {
    return (
      <Icon
        name='add'
        color={Colors.snow}
        onPress={() => this.props.navigation.navigate("CreateMenuItemScreen")}
      />
    )
  }

  editMenuButton = () => {
    return (
      <Icon
        name='edit'
        color={Colors.snow}
      />
    )
  }
  createListView = () => {
    let data
    if(this.props.menu){
      const {menu} = this.props
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      data = {dataSource:  ds.cloneWithRows(menu)}
      console.log('here:', menu)
      return (<ListView
        contentContainerStyle={styles.listContent}
        dataSource={data.dataSource}
        renderRow={this._renderRow}
        enableEmptySections
        pageSize={15}
      />)
    }
    else return (<LoadingSpinner show={true} />)

  }
  render () {
        return (
          <View style={styles.container}>
            <Header
              leftComponent = {this.editMenuButton()}
              rightComponent = {this.addMenuItemButton()}
              centerComponent = {{ text: 'MENU', style: { color: '#fff', fontWeight: 'bold' } }}
              backgroundColor = {Colors.background}
              outerContainerStyles = { styles.headerOuterContainer }
            />
            {this.createListView()}
          </View>
        ) 
  }
}

const mapStateToProps = (state) => {
  return {
    menu: state.menu,
    auth : state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(menuCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuTab)
