// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_apiKey,
//   authDomain: process.env.REACT_APP_authDomain,
//   projectId: process.env.REACT_APP_projectId,
//   storageBucket: process.env.REACT_APP_storageBucket,
//   messagingSenderId: process.env.REACT_APP_messagingSenderId,
//   appId: process.env.REACT_APP_appId,
// };
const firebaseConfig = {
  apiKey: "AIzaSyDSopuy0s7hVZ04IlzRfjmPY4PW6S0EGWo",
  authDomain: "shohoj-pay-app.firebaseapp.com",
  projectId: "shohoj-pay-app",
  storageBucket: "shohoj-pay-app.appspot.com",
  messagingSenderId: "327654270059",
  appId: "1:327654270059:web:b6802803fc173a8c70bd2e",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
