"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { db, auth } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import NavBar from "../../../components/NavBar"; // Ensure correct import path
import Footer from "../../../components/Footer"; // Ensure correct import path
import styles from "./diet.module.css"; // Import the CSS module

export default function DietPage() {
    const [currentUser, setCurrentUser] = useState(null);
    const [mealPlans, setMealPlans] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!currentUser) return;

        const fetchMealPlans = async () => {
            const mealPlansRef = collection(db, "users", currentUser.uid, "mealPlans");
            const snapshot = await getDocs(mealPlansRef);
            const fetchedMealPlans = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMealPlans(fetchedMealPlans);
        };

        fetchMealPlans();
    }, [currentUser]);

    return (
        <div className={styles.container}>
            {/* NavBar */}
            <NavBar />

            {/* Main Content */}
            <div className={styles.content}>
                {/* Centered Text with Button */}
                <div className={styles.centeredText}>
                    <p>Want to start creating your own personalized meal plan?</p>
                    <Link href="/dashboard/diet/new-meal-plan">
                        <button className={styles.createButton}>Create Meal Plan</button>
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className={styles.footer}>
                <Footer />
            </footer>
        </div>
    );
}