"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { db, auth } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

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
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Workout Routines</h1>

            <Link href="/dashboard/workout/new-routine">
                <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
                    Create Routine
                </button>
            </Link>

            {routines.length > 0 ? (
                <ul>
                    {routines.map((routine) => (
                        <li key={routine.id} className="border p-4 mb-2">
                            <Link href={`/dashboard/workout/${routine.id}`} className="text-xl font-semibold cursor-pointer hover:underline">
                                {routine.name}
                            </Link>
                            <p>{routine.exercises.length} exercises</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No routines saved yet.</p>
            )}
        </div>
    );
}