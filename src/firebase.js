// Import Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDyLgcrzPlq1BGU2Jk7EQTcTf_ivjmr-WA",
    authDomain: "fitness-tracker-3dd10.firebaseapp.com",
    projectId: "fitness-tracker-3dd10",
    storageBucket: "fitness-tracker-3dd10.appspot.com",
    messagingSenderId: "405702616690",
    appId: "1:405702616690:web:bf2dc2c36f5eb9273744eb",
    measurementId: "G-7NF77107F9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Function to trigger Google Sign-In
const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        console.log("User Info:", result.user); // Logs user info
    } catch (error) {
        console.error("Google Sign-In Error:", error);
    }
};

// Function to sign out
const logout = async () => {
    try {
        await signOut(auth);
        console.log("User signed out");
    } catch (error) {
        console.error("Logout Error:", error);
    }
};

// Export
export { auth, provider, db, signInWithGoogle, logout };
