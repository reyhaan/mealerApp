import axios from 'axios';

const img = {};

// storage reference
img.uploadBase64Image = async (name, base64Img) => {
    try {
        name = name.replace(/\s/g, '')  + "mealer_app_image"; // remove spaces from name
        const body = {name, base64Img};
        const SERVER_URL = 'https://airnd-rest-api-dev.herokuapp.com/';
        const response = await axios.post(SERVER_URL + "api/image/uploadImage", body);

        console.log(response.data.imageURL)

        return response.data.imageURL
    } catch (e) {
        console.log(e);
    }
};


export default img;