import React, {Component} from 'react';
import {  View, Text, StyleSheet, ScrollView, Alert,
  Image, TouchableOpacity, NativeModules, Dimensions
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
//needs to link before it can work
var ImagePicker = NativeModules.ImageCropPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: 'blue',
    marginBottom: 10
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  }
});



class UserAvatar extends Component {
  constructor() {
    super();
    this.state = {
      image: null 
    }
  }
  renderImage(image) {
    return <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
  }
  renderAsset(image) {
    return this.renderImage(image);
  }
  pickSingle(cropit, circular=false) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      cropperCircleOverlay: circular,
      compressImageMaxWidth: 640,
      compressImageMaxHeight: 480,
      compressImageQuality: 0.5,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
    }).then(image => {
      console.log('received image', image);
      this.setState({
        image: {uri: image.path, width: image.width, height: image.height, mime: image.mime}
      });
    }).catch(e => {
      console.log(e);
      Alert.alert(e.message ? e.message : e);
    });
  }

  render () {
    return (
      <View style={styles.container}> 
        <ScrollView>
        {this.state.image ? this.renderAsset(this.state.image) : null}
       </ScrollView>

       <TouchableOpacity onPress={() => this.pickSingle(true)} style={styles.button}>
        <Text style={styles.text}>Select Single With Cropping</Text>
      </TouchableOpacity>
      </View>
    )
  }
}

export default UserAvatar