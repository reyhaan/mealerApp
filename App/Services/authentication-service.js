import firebase from '../Config/firebaseConfig'

let authentication = {};
export default authentication;

authentication.signUp = (userCredentials) => {
    userCredentials.email = userCredentials.email.toLowerCase();
    userCredentials.password = userCredentials.password.toLowerCase();
    return firebase.auth().createUserWithEmailAndPassword(userCredentials.email, userCredentials.password);
};

authentication.currentUser = () => {
    return firebase.auth().currentUser();
};

