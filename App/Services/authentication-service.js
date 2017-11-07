import firebase from '../Config/firebaseConfig'
import {AsyncStorage, Alert} from 'react-native';

let authentication = {};
export default authentication;

// Sign user in
authentication.signIn = (userCredentials) => {
    userCredentials.email = userCredentials.email.toLowerCase();
    return firebase.auth().signInWithEmailAndPassword(userCredentials.email, userCredentials.password);
};

// Sign up user
authentication.signUp = (userCredentials) => {
    userCredentials.email = userCredentials.email.toLowerCase();
    return firebase.auth().createUserWithEmailAndPassword(userCredentials.email, userCredentials.password);
};

// Sign user out
authentication.signOut = () => {
    return firebase.auth().signOut();
};

// Get the current signed in user information
authentication.currentUser = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem("userSession").then((value) => {
            resolve(JSON.parse(value));
        }).catch(error =>{
            reject (error);
        })
    });
};


