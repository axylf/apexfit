"use client"
import ExerciseSelector from "../../../../components/ExerciseSelector";

export default function NewRoutinePage() {
    const handleSaveRoutine = (exercises) => {
        console.log("Routine Saved:", exercises);
        // Save to Firestore later
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Create Routine</h1>
            <ExerciseSelector onSave={handleSaveRoutine} />
        </div>
    );
}