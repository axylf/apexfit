"use client";
import Link from "next/link";
import NavBar from "../../components/NavBar";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase"; // Ensure correct import

export default function LoginPage() {
    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Google Sign-In Error:", error);
        }
    };

    return (
        <div>
            <NavBar/>

            {/* Login Container */}
            <div className="login-container">
                <h2>Member Login</h2>
                <form id="loginForm">
                    <input type="email" id="email" placeholder="Email Address" required />
                    <p className="error-message" id="emailError"></p>

                    <input type="password" id="passsword" placeholder="Password" required />
                    <p className="error-message" id="passwordError"></p>

                    <button type="submit">Log In</button>

                    <p><Link href="#">Forgot password?</Link></p>

                    {/* Google Login Button */}
                    <div className="social-login">
                        <button className="google-login" onClick={handleGoogleSignIn}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-380.2 274.7 65.7 65.8" width="20" height="20">
                                <circle cx="-347.3" cy="307.6" r="32.9" fill="#e0e0e0"></circle>
                                <circle cx="-347.3" cy="307.1" r="32.4" fill="#fff"></circle>
                                <g>
                                    <path d="M-370.8 320.3v-26l17 13z" fill="#fbbc05"></path>
                                    <path d="M-370.8 294.3l17 13 7-6.1 24-3.9v-14h-48z" fill="#ea4335"></path>
                                    <path d="M-370.8 320.3l30-23 7.9 1 10.1-15v48h-48z" fill="#34a853"></path>
                                    <path d="M-322.8 331.3l-31-24-4-3 35-10z" fill="#4285f4"></path>
                                </g>
                            </svg>
                            Continue with Google
                        </button>
                    </div>

                    {/* Facebook Login Button (non-functional for now) */}
                    <div className="social-login">
                        <button className="facebook-login">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                <circle cx="12" cy="12" r="12" fill="#1877F2"></circle>
                                <path fill="#fff" d="M15.1 12.4h-2.1v7.3h-3.2v-7.3H8.3V9.7h1.5V8.3c0-1.3.6-3.3 3.3-3.3h2.4v2.7h-1.7c-.3 0-.7.2-.7.8v1.2h2.4l-.4 2.7z"></path>
                            </svg>
                            Continue with Facebook
                        </button>
                    </div>
                </form>
                <p>Not a member yet? <Link href="/signup">Sign up now!</Link></p>
            </div>

            {/* Footer */}
            <footer>
                <div className="footer-content">
                    <p>&copy; 2025 ApexFitness. All Rights Reserved.</p>
                    <ul>
                        <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link href="/terms-of-service">Terms of Service</Link></li>
                        <li><Link href="/contact">Contact Us</Link></li>
                    </ul>
                </div>
            </footer>
        </div>
    );
}