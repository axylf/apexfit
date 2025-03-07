"use client";
import WorkoutLogger from "../components/WorkoutLogger";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

export default function Home() {
    const [user] = useAuthState(auth);

    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Fitness Tracker</h1>
            {user && <WorkoutLogger />}
        </main>
    );
}