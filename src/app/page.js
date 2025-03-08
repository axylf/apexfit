"use client"; 

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useEffect, useRef } from "react";
import * as THREE from "three"; // Required for Vanta.js
import HALO from "vanta/dist/vanta.halo.min"; // Import the Halo effect

export default function Home() {
    const vantaRef = useRef(null); // Create a ref for the Vanta.js container

    useEffect(() => {
        // Initialize Vanta.js with the new configuration
        const vantaEffect = HALO({
            el: vantaRef.current, // Target the ref element
            THREE: THREE, // Pass the THREE.js library
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            baseColor: 0x9d0cca, // New base color
            backgroundColor: 0x10107, // New background color
            amplitudeFactor: 2.50, // New amplitude factor
            yOffset: -0.03, // New yOffset
            size: 0.70, // New size
        });

        // Clean up Vanta.js on component unmount
        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, []);

    return (
        <>
            <NavBar />
            {/* Add a container for the Vanta.js background */}
            <div ref={vantaRef} className="vanta-container">
                <h2 className="text-4xl font-bold mb-4 welcome-text">
                    Welcome to <span className="red-letter">A</span>pex<span className="blue-letter">F</span>itness
                </h2>
                <p className="text-lg welcome-paragraph">Track workouts, log progress, and stay fit!</p>
            </div>
            <Footer />
        </>
    );
}
