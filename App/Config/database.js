import * as firebase from 'firebase';

const database = {};

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyC0L2KrdGf3dEytlugKapfeTaazRyBfgno",
    authDomain: "mealer-app.firebaseapp.com",
    databaseURL: "https://mealer-app.firebaseio.com",
    projectId: "mealer-app",
    storageBucket: "mealer-app.appspot.com",
    messagingSenderId: "256455255788"
});

// firebase reference
database.firebase = firebase;

// user reference
database.user = (id) => {
    if (id) {
        return firebase.database().ref('users').child(id);
    } else {
        return firebase.database().ref('users');
    }
};

// menus reference
database.menus = (id) => {
    if (id) {
        return firebase.database().ref('menus').child(id);
    } else {
        return firebase.database().ref('menus');
    }
};

// orders reference
database.orders = (id) => {
    if (id) {
        return firebase.database().ref('orders').child(id);
    } else {
        return firebase.database().ref('orders');
    }
};

export default database;