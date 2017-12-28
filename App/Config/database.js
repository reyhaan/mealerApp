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

// Root reference
database.root = () => {
    return firebase.database().ref();
};

// Customer user Orders reference
database.ordersFromCustomer = (id) => {
    if (id) {
        return firebase.database().ref('ordersFromCustomer').child(id);
    } else {
        return firebase.database().ref('ordersFromCustomer');
    }
};

// Vendor user Orders reference
database.ordersToVendor = (id) => {
    if (id) {
        return firebase.database().ref('ordersToVendor').child(id);
    } else {
        return firebase.database().ref('ordersToVendor');
    }
};

// orders reference
database.ordersList = (id) => {
    if (id) {
        return firebase.database().ref('ordersList').child(id);
    } else {
        return firebase.database().ref('ordersList');
    }
};

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

export default database;