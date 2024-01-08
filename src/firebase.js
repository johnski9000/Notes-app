import "firebase/compat/auth";
import firebase from "firebase/compat/app";

const app = firebase.initializeApp({
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID
  apiKey: "AIzaSyCBheBA7aV-p_7FIp1tKh8_31-5uPOvgDE",
  authDomain: "to-do-app-dev-73c20.firebaseapp.com",
  projectId: "to-do-app-dev-73c20",
  storageBucket: "to-do-app-dev-73c20.appspot.com",
  messagingSenderId: "410274541661",
  appId: "1:410274541661:web:1d798a73c79c83735a9db4",
});

export const auth = app.auth();
export default app;
