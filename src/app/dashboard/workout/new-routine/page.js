"use client";
import { db, auth } from "../../../../firebase"; // Correct path based on your firebase.js
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

import ExerciseSelector from "../../../../components/ExerciseSelector";
import NavBar from "../../../../components/NavBar";
import Footer from "../../../../components/Footer";
import "../../../../styles/global.css";
import styles from "./new-routine.module.css";

export default function NewRoutinePage() {
    const [selectedExercises, setSelectedExercises] = useState([]);

    // Capitalize function for exercise names and body parts
    const capitalizeWords = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    const handleSelectExercise = (exercise) => {
        setSelectedExercises([
            ...selectedExercises,
            { ...exercise, sets: [{ set: 1, lbs: "", reps: "" }] },
        ]);
    };

    const handleSetChange = (exerciseIndex, setIndex, field, value) => {
        setSelectedExercises((prevExercises) =>
            prevExercises.map((exercise, exIdx) => {
                if (exIdx !== exerciseIndex) return exercise;

                return {
                    ...exercise,
                    sets: exercise.sets.map((set, sIdx) => {
                        if (sIdx !== setIndex) return set;
                        return { ...set, [field]: value };
                    }),
                };
            })
        );
    };

    // Function to add a new set
    const addSet = (exerciseIndex) => {
        setSelectedExercises((prevExercises) =>
            prevExercises.map((exercise, exIdx) => {
                if (exIdx !== exerciseIndex) return exercise;
                return {
                    ...exercise,
                    sets: [...exercise.sets, { set: exercise.sets.length + 1, lbs: "", reps: "" }],
                };
            })
        );
    };

    // Function to remove a set
    const removeSet = (exerciseIndex, setIndex) => {
        setSelectedExercises((prevExercises) =>
            prevExercises.map((exercise, exIdx) => {
                if (exIdx !== exerciseIndex) return exercise;

                const updatedSets = exercise.sets.filter((_, sIdx) => sIdx !== setIndex);
                return { ...exercise, sets: updatedSets };
            })
        );
    };

    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    const handleSaveRoutine = async () => {
        if (!currentUser) {
            alert("You must be logged in to save a routine!");
            return;
        }

        const routineName = prompt("Enter a name for your routine:");
        if (!routineName) return;

        const routineData = {
            name: routineName,
            exercises: selectedExercises,
            userId: currentUser.uid, // Corrected auth usage
            createdAt: new Date()
        };

        try {
            await addDoc(collection(db, "users", currentUser.uid, "routines"), routineData);
            alert("Routine saved successfully!");
        } catch (error) {
            console.error("Error saving routine:", error);
            alert("Failed to save routine.");
        }
    };

    return (
        <>
            <NavBar />
            <div className={styles["routine-container"]}>
                <h1 className={styles["routine-title"]}>Create Routine</h1>

                <ExerciseSelector onSelectExercise={handleSelectExercise} />

                {/* Selected Exercises List */}
                <div className={styles["selected-exercises"]}>
                    {selectedExercises.map((exercise, exerciseIndex) => (
                        <div key={exerciseIndex} className={styles["exercise-card"]}>
                            {/* Exercise Name & Body Part */}
                            <div className={styles["exercise-header"]}>
                                <p className={styles["exercise-name"]}>
                                    {capitalizeWords(exercise.name)}
                                    <span className={styles["exercise-body-part"]}>
                                        ({capitalizeWords(exercise.bodyPart)})
                                    </span>
                                </p>
                            </div>

                            {/* Exercise Row */}
                            <div className={styles["exercise-content"]}>
                                <img src={exercise.gifUrl} alt={exercise.name} className={styles["exercise-image"]} />

                                {/* Set, LBS, Reps Table */}
                                <table className={styles["exercise-table"]}>
                                    <thead>
                                        <tr>
                                            <>
                                                <th>SET</th>
                                                <th>LBS</th>
                                                <th>REPS</th>
                                            </>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {exercise.sets.map((set, setIndex) => (
                                            <tr key={setIndex}>
                                                <td>{set.set}</td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={set.lbs}
                                                        onChange={(e) => handleSetChange(exerciseIndex, setIndex, "lbs", e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={set.reps}
                                                        onChange={(e) => handleSetChange(exerciseIndex, setIndex, "reps", e.target.value)}
                                                    />
                                                </td>
                                                <td>
                                                    <button className={styles["delete-set-btn"]} onClick={() => removeSet(exerciseIndex, setIndex)}>❌</button>
                                                </td>
                                            </tr>
                                        ))}

                                        {/* "Add Set" Button inside table */}
                                        <tr>
                                            <td colSpan="4" style={{ textAlign: "center" }}>
                                                <button onClick={() => addSet(exerciseIndex)} className={styles["add-set-btn"]}>
                                                    + Add Set
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Save Routine Button */}
                <button onClick={handleSaveRoutine} className={styles["save-routine-btn"]}>
                    Save Routine
                </button>
            </div>
            <Footer />
        </>
    );
}