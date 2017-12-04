import React, { Component } from 'react'
import { ScrollView, Text, View, FlatList, TouchableHighlight, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux';
import CooksTabStyle  from './CooksTab.style'
import { Header, SearchBar, Avatar, Rating } from 'react-native-elements' 
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Colors, Fonts } from '../../../Themes'
import { customerActionCreators } from '../../../Redux/Customer/CustomerActions'

// Styles
const styles = CooksTabStyle

class CooksTab extends Component {
  constructor (props) {
    super(props);
    this.props.fetchCooks();
    this.state = {
      dataSource: []
    }
    
  }
  
  componentWillReceiveProps = (newProps) => {

    let cooks = newProps.cooks.map(cook => {
        cook.key = cook.id;
        return cook
    });

    this.setState({
      dataSource: cooks
    })
  };
  
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
      <TouchableOpacity onPress={
        () => this.props.navigation.navigate('CookDetailsScreen', {selectedCook: rowData})
      }
      >
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
      </TouchableOpacity>
    )
  }

  render () {

    return (
      <View style = {styles.container}>
        <Header
          leftComponent = {{ icon: 'filter', color: Colors.background, type: 'font-awesome' }}
          centerComponent = {{ text: 'COOKS', style: { color: Colors.background, fontWeight: 'bold' } }}
          rightComponent = {{ icon: 'search', color: Colors.background }}
          backgroundColor = {Colors.snow}
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
    cooks: state.customer.cooks
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(customerActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CooksTab)
