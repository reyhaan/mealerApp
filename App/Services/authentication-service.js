import db from '../Config/database'
import {AsyncStorage} from 'react-native';

let authenticationService = {};

// Sign user in
authenticationService.signIn = (userCredentials) => {
    userCredentials.email = userCredentials.email.toLowerCase();
    return db.firebase.auth().signInWithEmailAndPassword(userCredentials.email, userCredentials.password);
};

// Sign up user
authenticationService.signUp = (userCredentials) => {
    userCredentials.email = userCredentials.email.toLowerCase();
    return db.firebase.auth().createUserWithEmailAndPassword(userCredentials.email, userCredentials.password);
};

// Add user
authenticationService.addUser = async (user) => {
    const userRef = db.user(user.uid);
    delete user.password; // !important
    await db.user(user.uid).set(user);
    const userSnapshot = await userRef.once('value');
    return {uid: userSnapshot.key, ...userSnapshot.val()};
};

// Remove vendor menu
authenticationService.removeUser = async (userId) => {
    try {
        let userRef = db.user(userId);
        return userRef.remove();
    } catch (error) {
        return {error};
    }
};

// Sign user out
authenticationService.signOut = () => {
    return db.firebase.auth().signOut();
};

// Fetch the user
authenticationService.fetchUser = (id) => {
    return new Promise((resolve, reject) => {
        db.user(id).once('value').then((snapshot) => {
            resolve(snapshot.val());
        }).catch(error =>{
            reject (error);
        })
    });
};

// Get the current signed in user information
authenticationService.currentUser = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem("userSession").then((value) => {
            resolve(JSON.parse(value));
        }).catch(error =>{
            reject (error);
        })
    });
};

authenticationService.fetchUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.user().orderByChild('email').equalTo(email).once('value').then((snapshot) => {
      const user = resolve(snapshot.val())
      console.log('service-----', snapshot.val())
      if (snapshot.val()) {
        db.firebase.auth().sendPasswordResetEmail(email, {setHandleCodeInApp: true})
        console.log('-----------------------------------sent!!')
      }
      return user
    }).catch(error => {
      console.log('error ', error)
      reject(error)
    })
  })
}

export default authenticationService;


