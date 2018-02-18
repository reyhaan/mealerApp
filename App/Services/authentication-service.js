import { AsyncStorage } from 'react-native';
import db from '../Config/database';

const authenticationService = {};

// Sign user in
authenticationService.signIn = (userCredentials) => {
  const { password } = userCredentials;
  const email = userCredentials.email.toLowerCase();
  return db.firebase.auth().signInWithEmailAndPassword(email, password);
};

// Sign up user
authenticationService.signUp = (userCredentials) => {
  const { password } = userCredentials;
  const email = userCredentials.email.toLowerCase();
  return db.firebase.auth().createUserWithEmailAndPassword(email, password);
};

// Add user
authenticationService.addUser = async (u) => {
  const user = u;
  const userRef = db.user(user.uid);
  delete user.password; // !important
  await db.user(user.uid).set(user);
  const userSnapshot = await userRef.once('value');
  return { uid: userSnapshot.key, ...userSnapshot.val() };
};

// Remove vendor menu
authenticationService.removeUser = async (userId) => {
  try {
    const userRef = db.user(userId);
    return userRef.remove();
  } catch (error) {
    return { error };
  }
};

// Sign user out
authenticationService.signOut = () => db.firebase.auth().signOut();

// Fetch the user
authenticationService.fetchUser = id => new Promise((resolve, reject) => {
  db.user(id).once('value').then((snapshot) => {
    resolve(snapshot.val());
  }).catch((error) => {
    reject(error);
  });
});

// Get the current signed in user information
authenticationService.currentUser = () => new Promise((resolve, reject) => {
  AsyncStorage.getItem('userSession').then((value) => {
    resolve(JSON.parse(value));
  }).catch((error) => {
    reject(error);
  });
});

authenticationService.fetchUserByEmail = async (email) => {
  try {
    const snapshot = await db.user().orderByChild('email').equalTo(email).once('value');
    if (snapshot.val()) {
      const actionCodeSettings = {
        url: `https://mealer-app.firebaseapp.com/?email=${email}`,
        iOS: {
          bundleId: 'com.mealerapp.mealerapp',
        },
        android: {
          packageName: 'com.mealerapp.mealerapp',
          installApp: true,
          minimumVersion: '12',
        },
        handleCodeInApp: false,
      };
      await db.firebase.auth().sendPasswordResetEmail(email, actionCodeSettings);
      return { userFound: true };
    }
    return { error: 'No registered user with this email address' };
  } catch (error) {
    return { error: 'An error occured while sending email' };
  }
};

export default authenticationService;

