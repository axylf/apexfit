"use client";
import { db, auth } from "../../../../firebase";
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
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => onAuthStateChanged(auth, setCurrentUser), []);

    const capitalizeWords = (str) => str.replace(/\b\w/g, (char) => char.toUpperCase());

    const updateExercises = (exerciseIndex, updateFn) => {
        setSelectedExercises(prevExercises => prevExercises.map((exercise, exIdx) =>
            exIdx === exerciseIndex ? updateFn(exercise) : exercise
        ));
    };

    const handleSelectExercise = (exercise) => {
        setSelectedExercises([...selectedExercises, { ...exercise, sets: [{ set: 1, lbs: "-", reps: "-" }] }]);
    };

    const handleSetChange = (exerciseIndex, setIndex, field, value) => {
        updateExercises(exerciseIndex, (exercise) => ({
            ...exercise,
            sets: exercise.sets.map((set, sIdx) => sIdx === setIndex ? { ...set, [field]: value || "-" } : set)
        }));
    };

    const addSet = (exerciseIndex) => {
        updateExercises(exerciseIndex, (exercise) => ({
            ...exercise,
            sets: [...exercise.sets, { set: exercise.sets.length + 1, lbs: "-", reps: "-" }]
        }));
    };

    const removeSet = (exerciseIndex, setIndex) => {
        updateExercises(exerciseIndex, (exercise) => {
            if (exercise.sets.length === 1) return exercise;
            const updatedSets = exercise.sets.filter((_, sIdx) => sIdx !== setIndex)
                .map((set, idx) => ({ ...set, set: idx + 1 }));
            return { ...exercise, sets: updatedSets };
        });
    };

    const handleSaveRoutine = async () => {
        if (!currentUser) return alert("You must be logged in to save a routine!");
        const routineName = prompt("Enter a name for your routine:");
        if (!routineName) return;

        try {
            await addDoc(collection(db, "users", currentUser.uid, "routines"), {
                name: routineName,
                exercises: selectedExercises,
                userId: currentUser.uid,
                createdAt: new Date()
            });
            alert("Routine saved successfully!");
        } catch (error) {
            console.error("Error saving routine:", error);
            alert("Failed to save routine.");
        }
    };

    console.log("Spinner class:", styles["no-spinner"]);

    return (
        <>
            <NavBar />
            <div className={styles["routine-container"]}>
                <h1 className={styles["routine-title"]}>Create Routine</h1>
                <ExerciseSelector onSelectExercise={handleSelectExercise} />
                <div className={styles["selected-exercises"]}>
                    {selectedExercises.map((exercise, exerciseIndex) => (
                        <div key={exerciseIndex} className={styles["exercise-card"]}>
                            <div className={styles["exercise-header"]}>
                                <img src={exercise.gifUrl} alt={exercise.name} className={styles["exercise-image"]} />
                                <p className={styles["exercise-name"]}>
                                    {capitalizeWords(exercise.name)}
                                    <span className={styles["exercise-body-part"]}>
                                        ({capitalizeWords(exercise.bodyPart)})
                                    </span>
                                </p>
                            </div>
                            <div className={styles["exercise-content"]}>
                                <table className={styles["exercise-table"]}>
                                    <thead>
                                        <tr><th>SET</th><th>LBS</th><th>REPS</th></tr>
                                    </thead>
                                    <tbody>
                                        {exercise.sets.map((set, setIndex) => (
                                            <tr key={setIndex}>
                                                <td>{set.set}</td>
                                                <td>
                                                    <input type="number" className={styles["no-spinner"]} value={set.lbs}
                                                        onChange={(e) => handleSetChange(exerciseIndex, setIndex, "lbs", e.target.value)} />
                                                </td>
                                                <td>
                                                    <input type="number" className={styles["no-spinner"]} value={set.reps}
                                                        onChange={(e) => handleSetChange(exerciseIndex, setIndex, "reps", e.target.value)} />
                                                </td>
                                                <td className={styles["delete-column"]}>
                                                    {setIndex > 0 && (
                                                        <button className={styles["delete-set-btn"]}
                                                            onClick={() => removeSet(exerciseIndex, setIndex)}>❌</button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
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
                <button onClick={handleSaveRoutine} className={styles["save-routine-btn"]}>Save Routine</button>
            </div>
            <Footer />
        </>
    );
}