"use client";
import { useState, useEffect } from "react";

export default function ExerciseSelector({ onSelectExercise }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(false);

    const API_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY; // Securely load API key

    useEffect(() => {
        if (searchTerm.length < 3) {
            setExercises([]); // Clear list if input is too short
            return;
        }

        const timeoutId = setTimeout(() => {
            searchExercises(searchTerm.toLowerCase());
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const searchExercises = async (query) => {
        setLoading(true);
        try {
            console.log("Fetching exercises for:", query);
            const response = await fetch(
                "https://exercisedb.p.rapidapi.com/exercises?limit=1000",
                {
                    method: "GET",
                    headers: {
                        "X-RapidAPI-Key": API_KEY,
                        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
                    },
                }
            );

            if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

            const data = await response.json();
            const cleanedQuery = query.toLowerCase().replace(/\s+/g, "");
            const filteredExercises = data.filter(({ name }) =>
                name.toLowerCase().replace(/\s+/g, "").includes(cleanedQuery)
            );

            setExercises(filteredExercises.slice(0, 5)); // Show top 5 results
        } catch (error) {
            console.error("Error fetching exercises:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="exercise-selector">
            <h2>Search for an Exercise</h2>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search for an exercise..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={() => setTimeout(() => setExercises([]), 200)}
                className="exercise-search"
            />

            {loading && <p className="loading-text">Loading...</p>}

            {/* Exercise List */}
            {exercises.length > 0 && (
                <div className="exercise-dropdown-container">
                    {exercises.map((exercise, index) => (
                        <div
                            key={index}
                            className="exercise-dropdown"
                            onClick={() => onSelectExercise(exercise)}
                        >
                            {/* Image (Check for static image, otherwise use GIF) */}
                            <img
                                src={exercise.image || exercise.gifUrl}
                                alt={exercise.name}
                                className="exercise-image"
                            />

                            {/* Exercise Details */}
                            <div className="exercise-details">
                                <span className="exercise-name">{exercise.name}</span>
                                <span className="exercise-bodypart">{exercise.bodyPart}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}