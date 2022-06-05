// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBm0iBfUzvWNifdKIykpUanIAJOlPlTyz0",
  authDomain: "mernchess.firebaseapp.com",
  projectId: "mernchess",
  storageBucket: "mernchess.appspot.com",
  messagingSenderId: "933550085253",
  appId: "1:933550085253:web:99774bd895a958f57185ec",
  measurementId: "G-4G1NKPNDDZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app)

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
