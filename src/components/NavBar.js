"use client"
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { logout } from "../utils/auth";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";

export default function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const router = useRouter();

    // Track authentication state with Firebase
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setIsLoggedIn(true);
                setUser(user.displayName || "User"); // Set username if available
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        });
        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            setIsLoggedIn(false);
            setUser(null);
            router.push("/");
        } catch (error) {
            console.error("Log Out Error:", error);
        }
    };

    return (
        <header>
            <div className="logo-container">
                <Image src="/apexfitlogo.svg" alt="ApexFit Logo" width={100} height={100} />
            </div>
            <div className="auth-links">
                {isLoggedIn ? (
                    <div className="user-info">
                        <span>Hello, {user}!</span>
                        <button onClick={handleLogout} className="logout">Log Out</button>
                    </div>
                ) : (
                    <>
                        <Link href="/login">Log In</Link>
                        <Link href="/signup" className="signup">Sign Up</Link>
                    </>
                )}  
            </div>
        </header>
    );
}