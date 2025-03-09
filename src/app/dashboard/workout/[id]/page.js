"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db, auth } from "../../../../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function EditRoutinePage({ params }) {
    const router = useRouter();
    const { id } = params; // Get routine ID from URL
    const [currentUser, setCurrentUser] = useState(null);
    const [routine, setRoutine] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!currentUser || !id) return;

        const fetchRoutine = async () => {
            const routineRef = doc(db, "users", currentUser.uid, "routines", id);
            const routineSnap = await getDoc(routineRef);

            if (routineSnap.exists()) {
                setRoutine({ id: routineSnap.id, ...routineSnap.data() });
            } else {
                alert("Routine not found");
                router.push("/dashboard/workout");
            }

            setLoading(false);
        };

        fetchRoutine();
    }, [currentUser, id]);

    const handleExerciseChange = (exerciseIndex, field, value) => {
        setRoutine((prev) => {
            const updatedExercises = [...prev.exercises];
            updatedExercises[exerciseIndex][field] = value;
            return { ...prev, exercises: updatedExercises };
        });
    };

    const handleSaveChanges = async () => {
        if (!routine) return;

        const routineRef = doc(db, "users", currentUser.uid, "routines", id);
        try {
            await updateDoc(routineRef, { exercises: routine.exercises });
            alert("Routine updated successfully!");
        } catch (error) {
            console.error("Error updating routine:", error);
            alert("Failed to update routine.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!routine) return <p>Routine not found.</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Routine: {routine.name}</h1>

            {routine.exercises.map((exercise, exerciseIndex) => (
                <div key={exerciseIndex} className="border p-2 mb-2">
                    <p className="font-semibold">{exercise.name}</p>
                    <input
                        type="number"
                        value={exercise.sets}
                        onChange={(e) => handleExerciseChange(exerciseIndex, "sets", e.target.value)}
                        className="border p-1"
                    />
                    <input
                        type="number"
                        value={exercise.reps}
                        onChange={(e) => handleExerciseChange(exerciseIndex, "reps", e.target.value)}
                        className="border p-1"
                    />
                </div>
            ))}

            <button onClick={handleSaveChanges} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                Save Changes
            </button>
        </div>
    );
}