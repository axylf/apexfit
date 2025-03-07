"use client";
import Link from "next/link";

export default function LoginPage() {
    return (
        <div>
            {/* Header */}
            <header>
                <div className="logo">TundraFit</div>
                <nav>
                    <ul>
                        <li><Link href="/exercise">Exercise</Link></li>
                        <li><Link href="/apps">Apps</Link></li>
                        <li><Link href="/community">Community</Link></li>
                        <li><Link href="/blog">Blog</Link></li>
                        <li><Link href="/premium">Premium</Link></li>
                    </ul>
                </nav>
                <div className="auth-links">
                    <Link href="/login">Log In</Link>
                    <Link href="/signup" className="signup">Sign Up</Link>
                </div>
            </header>

            {/* Login Container */}
            <div className="login-container">
                <h2>Member Login</h2>
                <form id="loginForm">
                    <input type="email" id="email" placeholder="Email Address" required />
                    <p className="error-message" id="emailError"></p>

                    <input type="password" id="password" placeholder="Password" required />
                    <p className="error-message" id="passwordError"></p>

                    <button type="submit">Log In</button>

                    <p><Link href="#">Forgot password?</Link></p>

                    <div className="verify-human">
                        <button type="button" id="verifyHuman">Verify Human</button>
                    </div>

                    <div className="social-login">
                        <button className="google-login">Continue with Google</button>
                        <button className="facebook-login">Continue with Facebook</button>
                    </div>
                </form>
                <p>Not a member yet? <Link href="/signup">Sign up now!</Link></p>
            </div>

            {/* Footer */}
            <footer>
                <div className="footer-content">
                    <p>&copy; 2025 TundraFit. All Rights Reserved.</p>
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