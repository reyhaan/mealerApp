import React, { Component } from 'react'
import { ScrollView, Text, View, ListView } from 'react-native'
import { connect } from 'react-redux'
import CooksTabStyle  from './CooksTab.style'
import { Header, SearchBar, Avatar, Rating } from 'react-native-elements' 
import { Col, Row, Grid } from 'react-native-easy-grid';

import { Colors, Fonts } from '../../../Themes'

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
const styles = CooksTabStyle

class CooksTab extends Component {
  constructor (props) {
    super(props)

    const userObject = [
      {
        name: "Mohammad Rehaan",
        avatar: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAARGAAAAJGE5ZTUxOWE3LWUwNjItNGZiMi1hMDdkLTA1MzE5YWVlYzBmZQ.jpg",
        cousineType: "Indian",
        rating: 3.6,
        quotaLimit: 30,
        quotaUsed: 24
      },
      {
        name: "Mohammad Rehaan",
        avatar: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAARGAAAAJGE5ZTUxOWE3LWUwNjItNGZiMi1hMDdkLTA1MzE5YWVlYzBmZQ.jpg",
        cousineType: "Indian",
        rating: 3.6,
        quotaLimit: 30,
        quotaUsed: 24
      },
      {
        name: "Mohammad Rehaan",
        avatar: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAARGAAAAJGE5ZTUxOWE3LWUwNjItNGZiMi1hMDdkLTA1MzE5YWVlYzBmZQ.jpg",
        cousineType: "Indian",
        rating: 3.6,
        quotaLimit: 30,
        quotaUsed: 24
      },
      {
        name: "Mohammad Rehaan",
        avatar: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAARGAAAAJGE5ZTUxOWE3LWUwNjItNGZiMi1hMDdkLTA1MzE5YWVlYzBmZQ.jpg",
        cousineType: "Indian",
        rating: 3.6,
        quotaLimit: 30,
        quotaUsed: 24
      },
      {
        name: "Mohammad Rehaan",
        avatar: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAARGAAAAJGE5ZTUxOWE3LWUwNjItNGZiMi1hMDdkLTA1MzE5YWVlYzBmZQ.jpg",
        cousineType: "Indian",
        rating: 3.6,
        quotaLimit: 30,
        quotaUsed: 24
      },
      {
        name: "Mohammad Rehaan",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        cousineType: "Indian",
        rating: 3.6,
        quotaLimit: 30,
        quotaUsed: 24
      },
      {
        name: "Mohammad Rehaan",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        cousineType: "Indian",
        rating: 3.6,
        quotaLimit: 30,
        quotaUsed: 24
      },
      {
        name: "Mohammad Rehaan",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        cousineType: "Indian",
        rating: 3.6,
        quotaLimit: 30,
        quotaUsed: 24
      }
    ]

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

  _renderRow (rowData) {
    return (
      <View style={styles.row}>
        <View style={styles.rowInnerContainer}>
          <Grid>
              <Col style={{ width: 60 }}>
                  <Avatar
                    medium
                    rounded
                    source={{uri: rowData.avatar}}
                  />
              </Col>
              <Col>
                  <Row style={{ height: 20}}>
                      <Text style={styles.boldLabel}>{rowData.name}</Text>
                  </Row>
                  <Row style={{ height: 18 }}>
                      <Text style={{fontSize: 11, color: Colors.charcoal}} >Cousine Type: {rowData.cousineType}</Text>
                  </Row>
                  <Row style={{ height: 22 }}>
                    <Rating
                      type="star"
                      ratingColor={Colors.pink2}
                      fractions={1}
                      startingValue={rowData.rating}
                      readonly
                      imageSize={10}
                      onFinishRating={this.ratingCompleted}
                      style={{ paddingVertical: 2 }}
                    />
                  </Row>
              </Col>
              <Col>
                    <Row style={{ height: 20}}>
                        <Text style={styles.boldLabel}>{rowData.name}</Text>
                    </Row>
                    <Row style={{ height: 18 }}>
                        <Text style={{fontSize: 11, color: Colors.charcoal}} >Cousine Type: {rowData.cousineType}</Text>
                    </Row>
                    <Row style={{ height: 22 }}>
                      <Rating
                        type="star"
                        ratingColor={Colors.pink2}
                        fractions={1}
                        startingValue={rowData.rating}
                        readonly
                        imageSize={10}
                        onFinishRating={this.ratingCompleted}
                        style={{ paddingVertical: 2 }}
                      />
                    </Row>
                    <Row style={{ height: 18 }}>
                      <Col>
                          <Text style={{ fontSize: 12, textAlign: 'right', paddingRight: 5 }} >Remaining: {rowData.quotaUsed}/{rowData.quotaLimit}</Text>
                      </Col>
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
