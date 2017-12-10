import axios from 'axios';
import {Alert} from 'react-native';

const img = {};

// storage reference
img.uploadBase64Image = async (name, base64Img) => {
    try {
        const SERVER_URL = 'https://airnd-rest-api-dev.herokuapp.com/api/image/uploadImage';
        // const LOCAL_URL = "http://localhost:5000/mealer-app/us-central1/uploadBase64ImageToS3";
        name = name.replace(/\s/g, '') + "mealer_app_image"; // remove spaces from name
        const body = {name, base64Img};
        const response = await axios.post(SERVER_URL, body);
        return response.data.imageURL
    } catch (e) {
        Alert.alert('Error', e.data);
        return e
    }
};

export default img;