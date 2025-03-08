"use client"
import { useState } from "react";
import ExerciseSelector from "../../../../components/ExerciseSelector";
import "../../../../styles/global.css";
import Footer from "../../../../components/Footer"
import NavBar from "../../../../components/NavBar"

export default function NewRoutinePage() {
    const [selectedExercises, setSelectedExercises] = useState([]);

    const handleSelectExercise = (exercise) => {
        setSelectedExercises([...selectedExercises, exercise]); // Add selected exercise
        console.log("Selected Exercise:", exercise);
    };

    const handleSaveRoutine = () => {
        console.log("Routine Saved:", selectedExercises);
        // Save to Firestore later
    };

    return (
        <>
            <NavBar />
            <div className="routine-container">
                <h1 className="routine-title">Create Routine</h1>

                {/* Pass the correct prop */}
                <ExerciseSelector onSelectExercise={handleSelectExercise} />

                {/* Display selected exercises */}
                <div className="selected-exercises">
                    {selectedExercises.map((ex, index) => (
                        <div key={index} className="exercise-card">
                            <img src={ex.gifUrl} alt={ex.name} className="exercise-image" />
                            <div className="exercise-info">
                                <p className="exercise-name">{ex.name}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Save Routine Button */}
                <button onClick={handleSaveRoutine} className="save-routine-btn">
                    Save Routine
                </button>
            </div>
            <Footer />
        </>
    );
}