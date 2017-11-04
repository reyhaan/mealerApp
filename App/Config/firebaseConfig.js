import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC0L2KrdGf3dEytlugKapfeTaazRyBfgno",
    authDomain: "mealer-app.firebaseapp.com",
    databaseURL: "https://mealer-app.firebaseio.com",
    projectId: "mealer-app",
    storageBucket: "mealer-app.appspot.com",
    messagingSenderId: "256455255788"
};

firebase.initializeApp(firebaseConfig);

export default firebase;