// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBXFU2Ob1hsfAyrojlYNyCVqhxutb8V2Ik",
    authDomain: "circular-signal-224217.firebaseapp.com",
    projectId: "circular-signal-224217",
    storageBucket: "circular-signal-224217.appspot.com",
    messagingSenderId: "428598609900",
    appId: "1:428598609900:web:e8afcf5df7d3c3a58062c9",
    measurementId: "G-X25S690HZ7"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export {app, auth, analytics};