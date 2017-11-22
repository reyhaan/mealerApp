import React, { Component } from 'react'
import { ScrollView, Text, View, ListView, TouchableHighlight, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import { CookDetailsStyle } from '../../Styles'
import { Header, SearchBar, Avatar, Rating, Icon } from 'react-native-elements' 
import { Col, Row, Grid } from 'react-native-easy-grid'
import TestData from '../../../Services/test-data-service'
import { NavigationActions } from 'react-navigation'
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog'

import { Colors, Fonts } from '../../../Themes'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
const styles = CookDetailsStyle

let _this

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

class CookDetails extends Component {
  constructor (props) {
    super(props)

    _this = this
    const userObject = TestData.merchantUser.menu;
    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({rowHasChanged})

    this.state = {
      dataSource: ds.cloneWithRows(userObject)
    }

  }

  searchComponent() {
    return (
      <SearchBar
        darkTheme
        clearIcon
        containerStyle={{backgroundColor: Colors.background, borderBottomColor: Colors.pink2}}
        inputStyle={{backgroundColor: Colors.background, color: Colors.snow }}
        placeholder='Type Here...' />
    )
  }

  showAddItemToOrderDialog = () => {
    _this.popupDialog.show();
  }

  _renderRow (rowData) {
    const ItemCostStyle = { height: 20, 
      flex: 1, flexDirection: 'column', 
      justifyContent: 'center', alignItems: 'center'}
    return (
      <TouchableOpacity onPress={() => {
        _this.showAddItemToOrderDialog()
      }}>
      <View style={styles.row}>
        <View style={styles.rowInnerContainer}>
          <Grid>
              <Col style={{ width: 60 }}>
                  <Avatar
                    medium
                    source={{ uri: rowData.itemImage }}
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
      </TouchableOpacity>
    )
  }

  _noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  _backButton = () => {
    return(
      <Icon
        name={Platform.OS === 'ios' ? 'chevron-left' : 'arrow-back'}
        color={Colors.snow}
        onPress={() => this.props.navigation.dispatch(NavigationActions.back())}
      />
    )
  }

  render () {
    return (
      <View style = {styles.container}>
        <Header
          leftComponent = {this._backButton()}
          centerComponent = {{ text: 'COOK DETAILS', style: { color: '#fff', fontWeight: 'bold' } }}
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

        <PopupDialog
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          dialogAnimation={slideAnimation}
        >
          <View>
            <Text>Hello</Text>
          </View>
        </PopupDialog> 

      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CookDetails)
