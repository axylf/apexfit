"use client";
import Link from "next/link";

export default function WorkoutPage() {
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Workout Routines</h1>

            {/* Redirect to the New Routine Page */}
            <Link href="/dashboard/workout/new-routine">
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                    Create Routine
                </button>
            </Link>
        </div>
    );
}