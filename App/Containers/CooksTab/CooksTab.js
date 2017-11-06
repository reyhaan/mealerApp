import React, { Component } from 'react'
import { ScrollView, Text, View, ListView } from 'react-native'
import { connect } from 'react-redux'
import { CooksTabStyle } from '../Styles'
import { Header, SearchBar, Avatar } from 'react-native-elements' 
import { Col, Row, Grid } from 'react-native-easy-grid';

import { Colors, Fonts } from '../../Themes'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
const styles = CooksTabStyle

class CooksTab extends Component {
  constructor (props) {
    super(props)
    
    const dataObjects = [
      {title: '1 Title', description: 'First Description'},
      {title: '2 Title', description: 'Second Description'},
      {title: '3 Title', description: 'Third Description'},
      {title: '4 Title', description: 'Fourth Description'},
      {title: '5 Title', description: 'Fifth Description'},
      {title: '6 Title', description: 'Sixth Description'},
      {title: '7 Title', description: 'Seventh Description'},
      {title: '8 Title', description: 'Second Description'},
      {title: '9 Title', description: 'Third Description'},
      {title: '10 Title', description: 'Fourth Description'},
      {title: '11 Title', description: 'Fifth Description'},
      {title: '12 Title', description: 'Sixth Description'},
      {title: '13 Title', description: 'Second Description'},
      {title: '14 Title', description: 'Third Description'},
      {title: '15 Title', description: 'Fourth Description'},
      {title: '16 Title', description: 'Fifth Description'},
      {title: '17 Title', description: 'Sixth Description'},
      {title: '18 Title', description: 'Second Description'},
      {title: '19 Title', description: 'Third Description'},
      {title: '20 Title', description: 'Fourth Description'},
      {title: '21 Title', description: 'Fifth Description'},
      {title: '22 Title', description: 'Sixth Description'},
      {title: '23 Title', description: 'Second Description'},
      {title: '24 Title', description: 'Third Description'},
      {title: '25 Title', description: 'Fourth Description'},
      {title: '26 Title', description: 'Fifth Description'},
      {title: '27 Title', description: 'Sixth Description'}
    ]

    const rowHasChanged = (r1, r2) => r1 !== r2

    const ds = new ListView.DataSource({rowHasChanged})

    this.state = {
      dataSource: ds.cloneWithRows(dataObjects)
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

  _renderRow (rowData) {
    return (
      <View style={styles.row}>
        <View style={styles.rowInnerContainer}>
          <Grid>
              <Col style={{ width: 60 }}>
                  <Avatar
                    medium
                    rounded
                    source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg"}}
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                  />
              </Col>
              <Col>
                  <Row style={{ height: 20}}>
                      <Text style={styles.boldLabel}>Mohammad Rehaan</Text>
                  </Row>
                  <Row style={{ height: 18 }}>
                      <Text style={{fontSize: 11, color: Colors.charcoal}} >Cousine Type: Indian</Text>
                  </Row>
                  <Row style={{ height: 22 }}>
                      <Text style={{ fontSize: 11, color: Colors.charcoal }} >Rating: 4.5</Text>
                  </Row>
                  <Row style={{ height: 18 }}>
                    <Col>
                        <Text style={{ fontSize: 12, fontWeight: 'bold', color: Colors.background }} >View More</Text>
                    </Col>
                    <Col>
                        <Text style={{ fontSize: 12, textAlign: 'right', paddingRight: 10 }} >Quota: 24/30</Text>
                    </Col>
                  </Row>
              </Col>
          </Grid>
        </View>
        {/* <Text style={styles.boldLabel}>{rowData.title}</Text>
        <Text style={styles.label}>{rowData.description}</Text> */}
      </View>
    )
  }

  _noRowData () {
    return this.state.dataSource.getRowCount() === 0
  }

  render () {


    return (
      <View style = {styles.container}>
        <Header
          leftComponent = {{ icon: 'filter', color: '#fff', type: 'font-awesome' }}
          centerComponent = {{ text: 'COOKS', style: { color: '#fff', fontWeight: 'bold' } }}
          rightComponent = {{ icon: 'search', color: '#fff' }}
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CooksTab)
