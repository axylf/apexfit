"use client"
import Link from "next/link";
import { useState, useEffect } from "react";

export default function NavBar() {
    return (
        <header>
            <div className="logo-container">
                <img src="apexfitlogo.svg" />
            </div>
            <div className="auth-links">
                <Link href="../app/login">Log In</Link>
                <Link href="../app/signup" className="signup">Sign Up</Link>
            </div>
        </header>
    );

}
