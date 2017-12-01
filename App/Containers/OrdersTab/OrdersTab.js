import React, { Component, PureComponent } from 'react'
import { ScrollView, View, Text, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import OrdersTabStyle from './OrdersTab.style'
import { Header } from 'react-native-elements' 
import { IndividualOrderList } from '../../Components'
import { Colors, Metrics } from '../../Themes'
import { TabViewAnimated, TabBar, SceneMap, TabViewPagerPan, TabViewPagerAndroid } from '../../ForkedComponents/react-native-tab-view';
import { initializeApp } from 'firebase';

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
const SecondRoute = () => <View style={[ styles.container, { backgroundColor: Colors.snow } ]} />;

const ThirdRoute = () => <View style={[ styles.container, { backgroundColor: Colors.snow } ]} />;

const FourthRoute = () => <View style={[ styles.container, { backgroundColor: Colors.snow } ]} />;

const FifthRoute = () => <View style={[ styles.container, { backgroundColor: Colors.snow } ]} />;

class OrdersTab extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Active' },
        { key: 'second', title: 'Confirmed' },
        { key: 'third', title: 'Cancelled' },
        { key: 'fourth', title: 'Delivered' },
        { key: 'fifth', title: 'History' },
      ],
    }
  }

  _handleIndexChange = index => {
    this.setState({ 
      index: index
    });
  }

  _renderHeader = props => {
    return (
      <TabBar 
        {...props} 
        scrollEnabled={true}
        style={{ 
          backgroundColor: Colors.snow
        }}
        labelStyle={{ color: Colors.background, fontSize: 12, fontWeight: 'bold' }}
        indicatorStyle={{ backgroundColor: Colors.background, height: 30, width:100, marginLeft: 32, marginBottom: 10 }}
      />
    )
  }

  _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
    fifth: FifthRoute,
  });

  render () {
    return (
      <View style={styles.container}>
        {/* <Header
          centerComponent = {{ text: 'CART', style: { color: '#fff', fontWeight: 'bold' } }}
          backgroundColor = {Colors.background}
          outerContainerStyles = { styles.headerOuterContainer }
        /> */}

        <TabViewAnimated
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
