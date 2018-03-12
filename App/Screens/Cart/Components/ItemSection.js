import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Colors } from '../../../Themes/index';
import styles from './VendorsInCart.style';

export default class ItemSection extends PureComponent {
  updateItemCount = (itemId, merchantId, newCount) => {
    const count = newCount < 1 ? 1 : newCount;
    this.props.cartActions.updateItemCount({ itemId, merchantId, newCount: count });
  };

  removeItem = (itemId, merchantId) => {
    this.props.cartActions.removeItemFromCart({ itemId, merchantId });
  };

  render() {
    const { item } = this.props;

    return (
      <View style={styles.row}>
        <View style={styles.rowInnerContainer}>
          <Grid style={{ borderBottomColor: Colors.gray2, borderBottomWidth: 1 }}>

            <Row style={{ height: 30 }}>
              <Col size={1}>
                <Row style={{ height: 20 }}>
                  <Text style={{ color: Colors.gray }}>{item.itemName}</Text>
                </Row>
              </Col>

              <Col style={{ width: 100 }}>
                <Row style={{ height: 20, flexDirection: 'column', alignItems: 'flex-end' }}>
                  <Text style={{ color: Colors.gray }}>$ {item.itemCost}</Text>
                </Row>
              </Col>
            </Row>

            <Row style={{ height: 34 }}>
              <Col>
                <TouchableOpacity onPress={() => {
                  this.removeItem(item.id, item.merchantInfo.uid);
                }}
                >
                  <Row style={{ height: 30, width: 70, backgroundColor: Colors.clear }}>
                    <Icon
                      size={14}
                      name="trash-o"
                      color={Colors.background}
                      type="font-awesome"
                    />
                    <Text style={styles.itemModify}>&nbsp; Remove</Text>
                  </Row>
                </TouchableOpacity>
              </Col>

              <Col style={{ width: 125, padding: 2 }}>
                <Row style={{ height: 30, backgroundColor: Colors.clear }}>
                  <TouchableOpacity onPress={() => {
                    this.updateItemCount(item.id, item.merchantInfo.uid, item.itemCount - 1);
                  }}
                  >
                    <Col style={styles.itemCountButton}>
                      <Icon
                        size={14}
                        name="minus"
                        color={Colors.background}
                        type="font-awesome"
                      />
                    </Col>
                  </TouchableOpacity>

                  <Col style={{ width: 65 }}>
                    <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={styles.itemCount}>{item.itemCount}</Text>
                    </Row>
                  </Col>

                  <TouchableOpacity onPress={() => {
                    this.updateItemCount(item.id, item.merchantInfo.uid, item.itemCount + 1);
                  }}
                  >
                    <Col style={styles.itemCountButton}>
                      <Icon
                        size={14}
                        name="plus"
                        color={Colors.background}
                        type="font-awesome"
                      />
                    </Col>
                  </TouchableOpacity>
                </Row>
              </Col>
            </Row>

          </Grid>
        </View>
      </View>
    );
  }
}
