"use client";
import { useState, useEffect } from "react";

export default function ExerciseSelector({ onSave }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [exercises, setExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]); // Stores added exercises
    const [loading, setLoading] = useState(false);
    const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;

    // Fetch exercises when user types
    useEffect(() => {
        if (searchTerm.length < 3) {
            setExercises([]);
            return;
        }

        const timeoutId = setTimeout(() => {
            searchExercises(searchTerm);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const searchExercises = async (query) => {
        setLoading(true);
        try {
            const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises?limit=10`, {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": API_KEY,
                    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
                },
            });

            if (!response.ok) throw new Error(`API Error: ${response.status}`);

            const data = await response.json();
            setExercises(data.filter(ex => ex.name.toLowerCase().includes(query.toLowerCase())));
        } catch (error) {
            console.error("Error fetching exercises:", error);
        } finally {
            setLoading(false);
        }
    };

    // When user selects an exercise, show input fields for sets/reps/weight
    const handleSelectExercise = (exercise) => {
        setSelectedExercises([...selectedExercises, { ...exercise, sets: 3, reps: 10, weight: 0 }]);
        setSearchTerm(""); // Reset search
        setExercises([]);
    };

    // Handle input changes for sets, reps, weight
    const updateExerciseField = (index, field, value) => {
        const updatedExercises = [...selectedExercises];
        updatedExercises[index][field] = value;
        setSelectedExercises(updatedExercises);
    };

    // When user presses "Save Routine"
    const handleSaveRoutine = () => {
        if (selectedExercises.length === 0) {
            alert("Please add at least one exercise.");
            return;
        }

        onSave(selectedExercises); // Pass the data to the parent component
        setSelectedExercises([]); // Clear the form after saving
    };

    return (
        <div className="p-4 bg-white rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Exercises</h2>

            {/* Exercise Search Box */}
            <input
                type="text"
                placeholder="Search for an exercise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 rounded w-full mb-4"
            />

            {loading && <p>Loading...</p>}

            {/* Search Results */}
            {exercises.length > 0 && (
                <ul className="border rounded p-2 max-h-40 overflow-y-auto">
                    {exercises.map((exercise, index) => (
                        <li
                            key={index}
                            className="p-2 border-b cursor-pointer hover:bg-gray-200"
                            onClick={() => handleSelectExercise(exercise)}
                        >
                            {exercise.name}
                        </li>
                    ))}
                </ul>
            )}

            {/* List of Selected Exercises with Input Fields */}
            {selectedExercises.length > 0 && (
                <div className="mt-4">
                    {selectedExercises.map((exercise, index) => (
                        <div key={index} className="p-2 border rounded mb-2">
                            <p className="font-bold">{exercise.name}</p>

                            <div className="flex space-x-2">
                                <input
                                    type="number"
                                    value={exercise.sets}
                                    min="1"
                                    onChange={(e) => updateExerciseField(index, "sets", e.target.value)}
                                    className="border p-2 rounded w-1/3"
                                    placeholder="Sets"
                                />
                                <input
                                    type="number"
                                    value={exercise.reps}
                                    min="1"
                                    onChange={(e) => updateExerciseField(index, "reps", e.target.value)}
                                    className="border p-2 rounded w-1/3"
                                    placeholder="Reps"
                                />
                                <input
                                    type="number"
                                    value={exercise.weight}
                                    min="0"
                                    onChange={(e) => updateExerciseField(index, "weight", e.target.value)}
                                    className="border p-2 rounded w-1/3"
                                    placeholder="Weight"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* "Add Another Exercise" Button */}
            <button
                onClick={() => setSearchTerm("")}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
            >
                + Add Another Exercise
            </button>

            {/* Save Routine Button */}
            <button
                onClick={handleSaveRoutine}
                className="bg-green-500 text-white px-4 py-2 rounded mt-4"
            >
                Save Routine
            </button>
        </div>
    );
}