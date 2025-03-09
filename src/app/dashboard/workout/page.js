"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { db, auth } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import NavBar from "../../../components/NavBar"; // Corrected import path
import Footer from "../../../components/Footer"; // Corrected import path
import styles from "./workout.module.css"; // Import the CSS module

export default function WorkoutPage() {
    const [currentUser, setCurrentUser] = useState(null);
    const [routines, setRoutines] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!currentUser) return;

        const fetchRoutines = async () => {
            const routinesRef = collection(db, "users", currentUser.uid, "routines");
            const snapshot = await getDocs(routinesRef);
            const fetchedRoutines = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setRoutines(fetchedRoutines);
        };

        fetchRoutines();
    }, [currentUser]);

    return (
        <div className={styles.container}>
            {/* Add NavBar at the top */}
            <NavBar />

            {/* Main Content */}
            <div className={styles.content}>
                {/* Centered Text with Button */}
                <div className={styles.centeredText}>
                    <p>Want to start creating your own personalized routine?</p>
                    <Link href="/dashboard/workout/new-routine">
                        <button className={styles.createButton}>Create Routine</button>
                    </Link>
                </div>
            </div>

            {/* Add Footer at the bottom */}
            <footer className={styles.footer}>
                <Footer />
            </footer>
        </div>
    );
}
