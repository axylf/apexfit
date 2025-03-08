"use client"
import Link from "next/link";

export default function Footer() {
    return (
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
    );

}