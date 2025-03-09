"use client";
import { useState, useEffect } from "react";
import styles from "@/styles/FoodSelector.module.css";

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
                        "x-app-id": process.env.NEXT_PUBLIC_NUTRITIONIX_APP_ID,
                        "x-app-key": process.env.NEXT_PUBLIC_NUTRITIONIX_API_KEY,
                        "Content-Type": "application/json"
                    },
                }
            );

            if (!response.ok) throw new Error(`API Error: ${response.status} - ${response.statusText}`);

            const data = await response.json();
            console.log("API Response:", JSON.stringify(data, null, 2)); // Debugging

            if (!data.common || data.common.length === 0) {
                throw new Error("No foods found. Try a different search term.");
            }

            const processedFoods = await Promise.all(
                data.common.slice(0, 5).map(async (food) => {
                    const nutrition = await fetchFoodDetails(food.food_name); // ✅ Fetch both calories & protein

                    return {
                        food_name: food.food_name,
                        brand_name: food.brand_name || "Generic",
                        serving_qty: food.serving_qty || 1,
                        serving_unit: food.serving_unit || "unit",
                        nf_calories: nutrition.calories, // ✅ Store calories
                        nf_protein: nutrition.protein, // ✅ Store protein
                        photo: food.photo ? food.photo.thumb : "/placeholder.jpg"
                    };
                })
            );

            setFoods(processedFoods);
        } catch (error) {
            console.error("Error fetching foods:", error.message);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchFoodDetails = async (foodName) => {
        try {
            const response = await fetch(
                "https://trackapi.nutritionix.com/v2/natural/nutrients",
                {
                    method: "POST",
                    headers: {
                        "x-app-id": process.env.NEXT_PUBLIC_NUTRITIONIX_APP_ID,
                        "x-app-key": process.env.NEXT_PUBLIC_NUTRITIONIX_API_KEY,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ query: foodName }) // Send food name
                }
            );

            const data = await response.json();
            console.log(`📢 API Response for "${foodName}":`, data); // ✅ Logs full API response

            // Check if the response contains food data
            if (!data.foods || data.foods.length === 0) {
                console.warn(`⚠️ No nutrition data found for "${foodName}"`);
                return { calories: "N/A", protein: "N/A", carbs: "N/A", fats: "N/A", image: "/placeholder.jpg" };
            }

            return {
                calories: data.foods[0].nf_calories ?? "N/A",
                protein: data.foods[0].nf_protein ?? "N/A",
                carbs: data.foods[0].nf_total_carbohydrate ?? "N/A",
                fats: data.foods[0].nf_total_fat ?? "N/A",
                image: data.foods[0].photo?.highres || data.foods[0].photo?.thumb || "/placeholder.jpg"
            };
        } catch (error) {
            console.error("❌ Error fetching food details:", error);
            return { calories: "N/A", protein: "N/A", carbs: "N/A", fats: "N/A", image: "/placeholder.jpg" };
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
                onBlur={() => setTimeout(() => setFoods([]), 20000000)}
                className="food-search"
            />

            {loading && <p className="loading-text">Loading...</p>}

            {/* Food List */}
            {foods.length > 0 && (
                <div className={styles["food-dropdown-container"]}>
                    {foods.map((food, index) => (
                        <div
                            key={index}
                            className={styles["food-dropdown"]}
                            onClick={() => onSelectDiet(food)}
                        >
                            {/* Image */}
                            <img
                                src={food.photo || "/placeholder.jpg"}
                                alt={food.food_name}
                                className={styles["food-image"]}
                            />

                            {/* Food Details */}
                            <div className={styles["food-info"]}>
                                <span className={styles["food-name"]}>{capitalizeWords(food.food_name)}</span>
                                {food.brand_name && <span className={styles["food-brand"]}> ({food.brand_name})</span>}
                                <span className={styles["food-calories"]}> {food.nf_calories} kcal</span>
                                <span className={styles["food-protein"]}> {food.nf_protein}g protein</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}