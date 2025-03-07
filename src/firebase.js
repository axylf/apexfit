// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDyLgcrzPlq1BGU2Jk7EQTcTf_ivjmr-WA",
    authDomain: "fitness-tracker-3dd10.firebaseapp.com",
    projectId: "fitness-tracker-3dd10",
    storageBucket: "fitness-tracker-3dd10.firebasestorage.app",
    messagingSenderId: "405702616690",
    appId: "1:405702616690:web:bf2dc2c36f5eb9273744eb",
    measurementId: "G-7NF77107F9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };