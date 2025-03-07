"use client";
import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

export default function WorkoutLogger() {
    const [user] = useAuthState(auth);
    const [searchTerm, setSearchTerm] = useState("");
    const [exercises, setExercises] = useState([]);
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [loading, setLoading] = useState(false);
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");
    const [weight, setWeight] = useState("");
    const [rest, setRest] = useState("");

    const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY; // Load API key securely

    // Debounce function: waits before making an API call
    useEffect(() => {
        if (searchTerm.length < 3 || selectedExercise) {
            setExercises([]); // Clear dropdown if input is too short OR an exercise is selected
            return;
        }

        const timeoutId = setTimeout(() => {
            searchExercises(searchTerm.toLowerCase());
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, selectedExercise]); // Depend on selectedExercise to clear dropdown

    // Fetch exercises from the API
    const searchExercises = async (query) => {
        setLoading(true);
        try {
            console.log("Fetching exercises for:", query.toLowerCase().replace(/\s+/g, "")); // Optional debugging

            const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises?limit=1000`, {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key": API_KEY,
                    "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
                },
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            // Normalize user input once
            const cleanedQuery = query.toLowerCase().replace(/\s+/g, "");

            // Filter exercises: Normalize names and match
            const filteredExercises = data.filter(({ name }) =>
                name.toLowerCase().replace(/\s+/g, "").includes(cleanedQuery)
            );

            console.log("Filtered Results:", filteredExercises);

            setExercises(filteredExercises.slice(0, 5)); // Limit results to 5
        } catch (error) {
            console.error("Error fetching exercises:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return alert("Please log in first.");
        if (!selectedExercise) return alert("Please select an exercise.");

        try {
            await addDoc(collection(db, "workouts"), {
                userId: user.uid,
                exercise: selectedExercise.name,
                bodyPart: selectedExercise.bodyPart,
                equipment: selectedExercise.equipment,
                sets: Number(sets),
                reps: Number(reps),
                weight: Number(weight),
                rest: Number(rest),
                timestamp: serverTimestamp(),
            });

            // Reset form
            setSearchTerm("");
            setExercises([]);
            setSelectedExercise(null);
            setSets("");
            setReps("");
            setWeight("");
            setRest("");
            alert("Workout logged!");
        } catch (error) {
            console.error("Error saving workout:", error);
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h2 className="text-xl font-bold mb-4">Search & Log Your Workout</h2>

            {/* Exercise Search Box */}
            <input
                type="text"
                placeholder="Search for an exercise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border p-2 rounded w-full"
            />

            {/* Loading Indicator */}
            {loading && <p className="text-gray-500">Loading...</p>}

            {/* Exercise Suggestions Dropdown */}
            {exercises.length > 0 && (
                <div className="w-full border rounded p-2 mt-2 bg-white max-h-40 overflow-y-auto">
                    {exercises.map((exercise, index) => (
                        <div
                            key={index}
                            className="p-2 bg-gray-300 hover:bg-gray-400 cursor-pointer border-b border-gray-500"
                            onClick={() => {
                                setSelectedExercise(exercise);
                                setSearchTerm(exercise.name);
                                setExercises([]); // Hide dropdown after selecting
                            }}
                        >
                            {exercise.name} ({exercise.bodyPart})
                        </div>
                    ))}
                </div>
            )}

            {/* Selected Exercise Info */}
            {selectedExercise && (
                <div className="mt-4 p-2 border rounded w-full">
                    <h3 className="font-bold">{selectedExercise.name}</h3>
                    <p>Muscle Group: {selectedExercise.bodyPart}</p>
                    <p>Equipment: {selectedExercise.equipment}</p>
                </div>
            )}

            {/* Workout Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
                <input type="number" placeholder="Sets" value={sets} onChange={(e) => setSets(e.target.value)} className="border p-2 rounded" required />
                <input type="number" placeholder="Reps per set" value={reps} onChange={(e) => setReps(e.target.value)} className="border p-2 rounded" required />
                <input type="number" placeholder="Weight (lbs)" value={weight} onChange={(e) => setWeight(e.target.value)} className="border p-2 rounded" />
                <input type="number" placeholder="Rest Time (seconds)" value={rest} onChange={(e) => setRest(e.target.value)} className="border p-2 rounded" />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save Workout</button>
            </form>
        </div>
    );
}