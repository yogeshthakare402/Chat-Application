import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAmCKDN69ipe3VpJU48s57L_9K-gIij5YY",
  authDomain: "chat-application-fe4e0.firebaseapp.com",
  projectId: "chat-application-fe4e0",
  storageBucket: "chat-application-fe4e0.appspot.com",
  messagingSenderId: "1004275809352",
  appId: "1:1004275809352:web:207ecc5c2a649d146a2c7d",
  measurementId: "G-JFKTQ2MNEP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)