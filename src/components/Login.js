"use client";
import { auth, provider } from "../firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Login() {
    const [user] = useAuthState(auth);

    const handleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Sign-in error:", error);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Sign-out error:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
            {user ? (
                <>
                    <p className="mb-4 text-lg">Welcome, {user.displayName}!</p>
                    <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded">
                        Logout
                    </button>
                </>
            ) : (
                <button onClick={handleSignIn} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Sign in with Google
                </button>
            )}
        </div>
    );
}
