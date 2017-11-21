import db from '../Config/database'
import {AsyncStorage} from 'react-native';

let authentication = {};

// Sign user in
authentication.signIn = (userCredentials) => {
    userCredentials.email = userCredentials.email.toLowerCase();
    return db.firebase.auth().signInWithEmailAndPassword(userCredentials.email, userCredentials.password);
};

// Sign up user
authentication.signUp = (userCredentials) => {
    userCredentials.email = userCredentials.email.toLowerCase();
    return db.firebase.auth().createUserWithEmailAndPassword(userCredentials.email, userCredentials.password);
};

// Sign user out
authentication.signOut = () => {
    return db.firebase.auth().signOut();
};

// Fetch the user
authentication.fetchUser = (id) => {
    return new Promise((resolve, reject) => {
        db.user(id).once('value').then((snapshot) => {
            resolve(snapshot.val());
        }).catch(error =>{
            reject (error);
        })
    });
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

export default authentication;


