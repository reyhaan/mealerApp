import React, { Component, PureComponent } from 'react'
import { ScrollView, View, Text, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import OrdersTabStyle from './OrdersTab.style'
import { Header } from 'react-native-elements' 
import { IndividualOrderList } from '../../Components'
import { Colors, Metrics } from '../../Themes'
import { TabViewAnimated, TabBar, SceneMap, TabViewPagerPan, TabViewPagerAndroid } from 'react-native-tab-view';

// Styles
const styles = OrdersTabStyle;

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const FirstRoute = () => {
  return( 
    <ScrollView>
    
      <IndividualOrderList></IndividualOrderList>
      <IndividualOrderList></IndividualOrderList>
      <IndividualOrderList></IndividualOrderList>
      <IndividualOrderList></IndividualOrderList>

    </ScrollView>
  )
}
const SecondRoute = () => <View style={[ styles.container, { backgroundColor: '#673ab7' } ]} />;

class OrdersTab extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
      ],
    }
  }

  _handleIndexChange = index => { 
    console.log(index)
    this.setState({ 
      index: index
    });
  }

  _renderHeader = props => <TabBar {...props} />;

  _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  render () {
    return (
      <View style={styles.container}>
        <Header
          centerComponent = {{ text: 'ORDERS', style: { color: '#fff', fontWeight: 'bold' } }}
          backgroundColor = {Colors.background}
          outerContainerStyles = { styles.headerOuterContainer }
        />

        <TabViewAnimated
          swipeEnabled={true}
          animationEnabled={true}
          style={styles.container}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
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

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTab)
