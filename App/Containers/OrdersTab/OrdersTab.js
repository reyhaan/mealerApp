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
    <View style={[ styles.container, { backgroundColor: Colors.banner } ]} />
    // <ScrollView>
    
    //   <IndividualOrderList></IndividualOrderList>
    //   <IndividualOrderList></IndividualOrderList>
    //   <IndividualOrderList></IndividualOrderList>
    //   <IndividualOrderList></IndividualOrderList>

    // </ScrollView>
  )
}
const SecondRoute = () => <View style={[ styles.container, { backgroundColor: '#673ab7' } ]} />;

const ThirdRoute = () => <View style={[ styles.container, { backgroundColor: Colors.orange } ]} />;

const FourthRoute = () => <View style={[ styles.container, { backgroundColor: Colors.banner } ]} />;

const FifthRoute = () => <View style={[ styles.container, { backgroundColor: Colors.background } ]} />;

class OrdersTab extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
        { key: 'third', title: 'Third' },
        { key: 'fourth', title: 'Fourth' },
        { key: 'fifth', title: 'Fifth' },
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
        <Header
          centerComponent = {{ text: 'ORDERS', style: { color: '#fff', fontWeight: 'bold' } }}
          backgroundColor = {Colors.background}
          outerContainerStyles = { styles.headerOuterContainer }
        />

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
