"use client";
import { useState, useEffect } from "react";

export default function FoodSelector({ onSelectDiet }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(false);

    const API_ID = process.env.NEXT_PUBLIC_NUTRITIONIX_APP_ID; // Securely load API ID
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
                `https://trackapi.nutritionix.com/v2/search/instant?query=${query}`,
                {
                    method: "GET",
                    headers: {
                        "x-app-id": API_ID,
                        "x-app-key": API_KEY,
                    },
                }
            );

            if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

            const data = await response.json();
            const filteredFoods = data.common.slice(0, 5); // Get first 5 results

            setFoods(filteredFoods);
        } catch (error) {
            console.error("Error fetching foods:", error);
        } finally {
            setLoading(false);
        }
    };

    // Function to capitalize the first letter of each word
    const capitalizeWords = (str) => {
        return str.replace(/\b\w/g, (char) => char.toUpperCase());
    };

    return (
        <div className="food-selector">
            <h2>Search for a Food Item</h2>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search for a food..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onBlur={() => setTimeout(() => setFoods([]), 200)}
                className="food-search"
            />

            {loading && <p className="loading-text">Loading...</p>}

            {/* Food List */}
            {foods.length > 0 && (
                <div className="food-dropdown-container">
                    {foods.map((food, index) => (
                        <div
                            key={index}
                            className="food-dropdown"
                            onClick={() => onSelectDiet(food)}
                        >
                            {/* Food Image */}
                            <img
                                src={food.photo?.thumb || "/placeholder.jpg"}
                                alt={food.food_name}
                                className="food-image"
                            />

                            {/* Food Details */}
                            <div className="food-info">
                                <span className="food-name">{capitalizeWords(food.food_name)}</span>
                                {food.brand_name && <span className="food-brand"> ({food.brand_name})</span>}
                                <span className="food-calories"> {food.nf_calories} kcal</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}