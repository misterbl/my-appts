import * as firebase from 'firebase/app';
import 'firebase/auth';


const config = {
    apiKey: "AIzaSyAUFtb8M2Pzfgpn48-F736NVgKlCcc2haQ",
    authDomain: "kidappi-app.firebaseapp.com",
    databaseURL: "https://kidappi-app.firebaseio.com",
    projectId: "kidappi-app",
    storageBucket: "kidappi-app.appspot.com",
    messagingSenderId: "600523020740"
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  const auth = firebase.auth();
  auth.useDeviceLanguage();
  const provider = new firebase.auth.FacebookAuthProvider()
export {
  auth,
  provider,
};