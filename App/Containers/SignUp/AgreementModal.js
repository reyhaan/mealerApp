import React, {Component} from 'react'
import {Icon} from 'react-native-elements'
import {View, Text, Modal, StyleSheet} from 'react-native'
import {Colors} from '../../Themes/index'
import {Form, Item} from 'native-base'

export const getAgreementModal = (isAgreementModalOpen, closeAgreementModal) => {
  // TODO: add real terms and conditions
  return (
    <View style={styles.container}>
      <Modal
          visible={isAgreementModalOpen}
          animationType={'slide'}
          onRequestClose={() => closeAgreementModal()}>
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <View style={{alignSelf: 'flex-end'}}>
              <Icon
                raised
                name='times'
                type='font-awesome'
                color={Colors.bloodOrange}
                onPress={() => closeAgreementModal()} />
            </View>
            <Text style={{fontWeight: 'bold'}}>Terms and Conditions</Text>
            <Text style={{textAlign: 'justify', paddingBottom: 10}}>
            I am responsible for all the food i ourchase and consume
            he majority have suffered alteration dfnldg;dgkgd;g djd
            ds which don't look even slightly believable.
            If you are going to use a passage of Lorem Ipsum, you need to 
            be sure there isn't anything embarrassing hidden in the midd
            le of text. All the Lorem Ipsum generators on the Internet ten
            d to repeat predefined chunks as necessary, making this the fi
            rst true generator on the Internet. It uses a dictionary of over 200
            Latin words, combined with a handful of model sentence structur
            es, to generate Lorem Ipsum which looks reasonable. 
            The generated Lorem Ipsum is therefore always free from re.
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    overflow: 'scroll'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  innerContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 40,
    marginTop: 10,
    borderRadius: 5,
    padding: 5
  },
});