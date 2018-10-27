import { auth, provider } from './firebase';

// Sign Up
export const doCreateUserWithEmailAndPassword = (email: string, password: string) =>
  auth.createUserWithEmailAndPassword(email, password);

  // Sign In
export const doSignInWithEmailAndPassword = (email: string, password: string) =>
auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () =>
  auth.signOut();


  // Password Reset
export const doPasswordReset = (email: string) =>
auth.sendPasswordResetEmail(email);

// Password Change
export const doPasswordUpdate = (password: string) =>
auth && auth.currentUser && auth.currentUser.updatePassword(password);

// Facebook
export const doFacebookSignIn = () => auth.signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const token = result;
    // The signed-in user info.
    const user = result.user;
    console.log("user", user);
    console.log("token", token);
    
    
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("errorCode", errorCode);
    console.log("errorMessage", errorMessage);
    
    // The email of the user's account used.
    const email = error.email;
    console.log("email", email);
    
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;
    console.log("credential", credential);
    
    // ...
  });