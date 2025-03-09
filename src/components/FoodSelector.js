"use client";
import { useState, useEffect } from "react";

export default function FoodSelector({ onSelectDiet }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(false);

    const API_KEY = process.env.NEXT_PUBLIC_NUTRITIONIX_API_KEY; // Securely load API key

    useEffect(() => {
        if (searchTerm.length < 3) {
            setFoods([]); // Clear list if input is too short
            return;
        }

        const timeoutId = setTimeout(() => {
            searchFoods(searchTerm.toLowerCase());
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const searchFoods = async (query) => {
        setLoading(true);
        try {
            console.log("Fetching foods for:", query);
            const response = await fetch(
                "https://trackapi.nutritionix.com/v2/search/instant?limit=1000",
                {
                    method: "GET",
                    headers: {
                        "X-Nutritionix-Key": API_KEY,
                        "X-Nutritionix-Host": "https://trackapi.nutritionix.com/",
                    },
                }
            );

            if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

            const data = await response.json();
            const cleanedQuery = query.toLowerCase().replace(/\s+/g, "");
            const filteredDiets = data.filter(({ name }) =>
                name.toLowerCase().replace(/\s+/g, "").includes(cleanedQuery)
            );

            setFoods(filteredFoods.slice(0, 5)); // Show top 5 results
        } catch (error) {
            console.error("Error fetching Foods:", error);
        } finally {
            setLoading(false);
        }
    };

    // Function to capitalize the first letter of each word
    const capitalizeWords = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    return (
        <div className="exercise-selector">
            <h2>Search for an Food</h2>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search for a food..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={() => setTimeout(() => setFoods([]), 200)}
                className="exercise-search"
            />

            {loading && <p className="loading-text">Loading...</p>}

            {/* Exercise List */}
            {foods.length > 0 && (
                <div className="exercise-dropdown-container">
                    {foods.map((food, index) => (
                        <div
                            key={index}
                            className="exercise-dropdown"
                            onClick={() => onSelectFood(food)}
                        >
                            {/* Image (Check for static image, otherwise use GIF) */}
                            <img
                                src={food.image || food.gifUrl}
                                alt={food.name}
                                className="exercise-image"
                            />

                            {/* Exercise Details */}
                            <div className="exercise-info">
                                <span className="exercise-name">{capitalizeWords(food.name)}</span>
                                <span className="exercise-bodyPart"> (<strong>{capitalizeWords(food.bodyPart)}</strong>)</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}