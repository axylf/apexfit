"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { signInWithGoogle } from "../../utils/auth";

export default function LoginPage() {
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        try {
            const user = await signInWithGoogle();
            if (user) {
                router.push("/dashboard");
            }
        } catch (error) {
            console.error("Google Sign-In Error:", error);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Login form submitted! (Backend integration needed)");
    };

    return (
        <div>
            <NavBar />

            {/* Login Container */}
            <div className="login-container">
                <h2>Member Login</h2>
                <form id="loginForm" onSubmit={handleSubmit}>
                    <input type="email" id="email" placeholder="Email Address" required />
                    <p className="error-message" id="emailError"></p>

                    <input type="password" id="password" placeholder="Password" required />
                    <p className="error-message" id="passwordError"></p>

                    <button type="submit">Log In</button>

                    <p><Link href="#">Forgot password?</Link></p>

                    {/* Google Login Button */}
                    <div className="social-login">
                        <button type="button" className="google-login" onClick={handleGoogleSignIn}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>
                            Continue with Google
                        </button>
                    </div>

                    {/* Facebook Login Button (non-functional for now) */}
                    <div className="social-login">
                        <button type="button" className="facebook-login">
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
            <Footer />
        </div>
    );
}