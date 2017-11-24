import React, { Component } from 'react'
import { ScrollView, Text, View, FlatList } from 'react-native'
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
        key: 1,
        name: "Mohammad Rehaan",
        avatar: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAARGAAAAJGE5ZTUxOWE3LWUwNjItNGZiMi1hMDdkLTA1MzE5YWVlYzBmZQ.jpg",
        cousineType: "Indian",
        rating: 3.6,
        quotaLimit: 30,
        quotaUsed: 24
      },
      {
        key: 2,
        name: "Mohammad Rehaan",
        avatar: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAARGAAAAJGE5ZTUxOWE3LWUwNjItNGZiMi1hMDdkLTA1MzE5YWVlYzBmZQ.jpg",
        cousineType: "Indian",
        rating: 3.6,
        quotaLimit: 30,
        quotaUsed: 24
      },
      {
        key: 3,
        name: "Mohammad Rehaan",
        avatar: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAARGAAAAJGE5ZTUxOWE3LWUwNjItNGZiMi1hMDdkLTA1MzE5YWVlYzBmZQ.jpg",
        cousineType: "Indian",
        rating: 3.6,
        quotaLimit: 30,
        quotaUsed: 24
      },
      {
        key: 4,
        name: "Mohammad Rehaan",
        avatar: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAARGAAAAJGE5ZTUxOWE3LWUwNjItNGZiMi1hMDdkLTA1MzE5YWVlYzBmZQ.jpg",
        cousineType: "Indian",
        rating: 3.6,
        quotaLimit: 30,
        quotaUsed: 24
      },
      {
        key: 5,
        name: "Mohammad Rehaan",
        avatar: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAARGAAAAJGE5ZTUxOWE3LWUwNjItNGZiMi1hMDdkLTA1MzE5YWVlYzBmZQ.jpg",
        cousineType: "Indian",
        rating: 3.6,
        quotaLimit: 30,
        quotaUsed: 24
      },
      {
        key: 6,
        name: "Mohammad Rehaan",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        cousineType: "Indian",
        rating: 3.6,
        quotaLimit: 30,
        quotaUsed: 24
      },
      {
        key: 7,
        name: "Mohammad Rehaan",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        cousineType: "Indian",
        rating: 3.6,
        quotaLimit: 30,
        quotaUsed: 24
      },
      {
        key: 8,
        name: "Mohammad Rehaan",
        avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
        cousineType: "Indian",
        rating: 3.6,
        quotaLimit: 30,
        quotaUsed: 24
      }
    ]

    // const rowHasChanged = (r1, r2) => r1 !== r2

    // const ds = new ListView.DataSource({rowHasChanged})

    this.state = {
      dataSource: userObject
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
              <Col style={{ paddingLeft: 5 }}>
                <Row style={{ height: 20}}>
                    <Text style={styles.boldLabel}>{rowData.name}</Text>
                </Row>
                <Row style={{ height: 18 }}>
                    <Text style={{fontSize: 12, color: Colors.charcoal}} >Cousine Type 
                      <Text style={{ fontWeight: 'bold' }}>: {rowData.cousineType}</Text>
                    </Text>
                </Row>
                <Row style={{ height: 18 }}>
                  <Col>
                      <Text style={{ fontSize: 12, textAlign: 'left', paddingRight: 5, color: Colors.charcoal }} >{rowData.quotaUsed} of {rowData.quotaLimit} left</Text>
                  </Col>
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

        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataSource}
          renderItem={({item}) => this._renderRow(item)}
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
