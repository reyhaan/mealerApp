import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity, ListView } from 'react-native'
import { Header, Icon, Button, Avatar } from 'react-native-elements'
import { Col, Row, Grid } from 'react-native-easy-grid';

import { Colors, Fonts, Images } from '../Themes'
import styles from './Styles/IndividualOrderListStyle'

export default class MlImagePicker extends Component {
	constructor (props) {
		super(props)

    const menuObject = [
      {
        itemName: "Chicken Biryani",
        itemImage: Images.biryani,
        itemDetail: "A famous dish from India, made with slowly cooking rice with spicy chicken.",
        itemCost: 6.99
      },
      {
        itemName: "Chicken Biryani",
        itemImage: Images.biryani,
        itemDetail: "A famous dish from India, made with slowly cooking rice with spicy chicken.",
        itemCost: 6.99
      },
      {
        itemName: "Chicken Biryani",
        itemImage: Images.biryani,
        itemDetail: "A famous dish from India, made with slowly cooking rice with spicy chicken.",
        itemCost: 6.99
      }
    ]

		const rowHasChanged = (r1, r2) => r1 !== r2

		const ds = new ListView.DataSource({rowHasChanged})

		this.state = {
				dataSource: ds.cloneWithRows(menuObject)
		}

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
        <Grid>
					<Col style={{ padding: 10 }}>

						<Row style={{ height: 45, backgroundColor: Colors.bloodOrange }}>
						
						</Row>

						<Row size={1} style={styles.listContainer}>
							<ListView
								contentContainerStyle={styles.listContent}
								dataSource={this.state.dataSource}
								renderRow={this._renderRow}
								enableEmptySections
								pageSize={15}
							/> 
						</Row>

						<Row style={{ height: 45, backgroundColor: Colors.charcoal }}>
						
						</Row>

					</Col>
        </Grid>
      </View>
    )
  }
}