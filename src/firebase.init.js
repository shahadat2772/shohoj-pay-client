// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCnMcxddtbwMbd3Cxu7IcHYLGdHCPCtLow",
  authDomain: "app-shohoj-pay.firebaseapp.com",
  projectId: "app-shohoj-pay",
  storageBucket: "app-shohoj-pay.appspot.com",
  messagingSenderId: "630250828541",
  appId: "1:630250828541:web:7b6c29db67f4a245be8494",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
