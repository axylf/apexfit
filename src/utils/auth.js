import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (error) {
        console.error("Google Sign-In Error:", error);
        throw error;
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Log Out Error:", error);
        throw error;
    }
};