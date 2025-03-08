"use client"
import Link from "next/link";

export default function NavBar() {
    return (
        <header>
            <div className="logo-container">
                <img src="apexfitlogo.svg" />
            </div>
            <div className="auth-links">
                <Link href="../login">Log In</Link>
                <Link href="../signup" className="signup">Sign Up</Link>
            </div>
        </header>
    );

}
