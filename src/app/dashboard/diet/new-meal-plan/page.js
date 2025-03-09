"use client";
import { db, auth } from "../../../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import FoodSelector from "../../../../components/FoodSelector";
import NavBar from "../../../../components/NavBar";
import Footer from "../../../../components/Footer";
import "../../../../styles/global.css";
import styles from "./new-meal-plan.module.css";

export default function NewMealPlanPage() {
    const [selectedFoods, setSelectedFoods] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const router = useRouter();

    const [mealPlan, setMealPlan] = useState([]);
    const [mealPlanName, setMealPlanName] = useState("");

    useEffect(() => onAuthStateChanged(auth, setCurrentUser), []);

    const updateFoods = (foodIndex, updateFn) => {
        setSelectedFoods(prevFoods => prevFoods.map((food, fIdx) =>
            fIdx === foodIndex ? updateFn(food) : food
        ));
    };

    const handleSelectFood = (food) => {
        setSelectedFoods((prevFoods) => {
            return [
                ...prevFoods,
                {
                    ...food,
                    servings: 1,
                    mealNumber: prevFoods.length + 1, // ✅ Assigns a unique meal number once
                    calories: food.nf_calories || 0,
                },
            ];
        });
    };

    const handleFoodChange = (foodIndex, field, value) => {
        console.log(`Updated Food:`, food);
        console.log(`Calories Per Serving: ${food.nf_calories}, Total Calories: ${updatedCalories}`);

        updateFoods(foodIndex, (food) => {
            let updatedValue = value || 1; // Ensure minimum of 1 serving
            let updatedCalories = food.nf_calories * updatedValue; // Recalculate calories

            return {
                ...food,
                [field]: updatedValue,
                total_calories: Math.round(updatedCalories) // Ensure whole number
            };
        });
    };

    const removeFood = (index) => {
        setSelectedFoods((prevFoods) => prevFoods.filter((_, i) => i !== index));
    };

    const handleSaveMealPlan = async () => {
        if (!currentUser) return alert("You must be logged in to save a meal plan!");

        if (!mealPlanName.trim()) {
            alert("Please enter a name for your meal plan.");
            return;
        }

        try {
            await addDoc(collection(db, "users", currentUser.uid, "mealPlans"), {
                name: mealPlanName,
                foods: selectedFoods,
                userId: currentUser.uid,
                createdAt: new Date()
            });

            alert("Meal Plan saved successfully!");
            setMealPlanName(""); // Clear input field after saving
            router.push("/dashboard/diet");
        } catch (error) {
            console.error("Error saving meal plan:", error);
            alert("Failed to save meal plan.");
        }
    };

    return (
        <>
            <NavBar />
            <div className={styles["meal-plan-container"]}>
                {/* Meal Plan Name Input */}
                <input
                    type="text"
                    className={styles["meal-plan-name-input"]}
                    placeholder="Name your meal plan..."
                    value={mealPlanName}
                    onChange={(e) => setMealPlanName(e.target.value)}
                />

                <FoodSelector onSelectDiet={handleSelectFood} />
                <div className={styles["selected-foods"]}>
                    {selectedFoods.map((food, foodIndex) => (
                        <div key={food.food_name} className={styles["food-card"]}>
                            <div className={styles["food-header"]}>
                                <img
                                    src={food.photo?.thumb || food.photo || "/placeholder.jpg"}
                                    alt={food.food_name}
                                    className={styles["food-image"]}
                                />
                                <p className={styles["food-name"]}>
                                    {food.food_name}
                                    {food.brand_name && <span className={styles["food-brand"]}> ({food.brand_name})</span>}
                                </p>
                            </div>
                            <div className={styles["food-content"]}>
                                <table className={styles["food-table"]}>
                                    <thead>
                                        <tr>
                                            <th>#</th> {/* Unique Number for Each Food */}
                                            <th>Servings</th>
                                            <th>Calories</th>
                                            <th>Protein</th>
                                            <th>Carbs</th>
                                            <th>Fats</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{foodIndex + 1}</td> {/* Keeps numbering unique per food */}
                                            <td>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={food.servings}
                                                    className={styles["serving-input"]}
                                                    onChange={(e) => updateServings(foodIndex, e.target.value)}
                                                />
                                            </td>
                                            <td>{food.calories * (food.servings || 1)} kcal</td>
                                            <td>{food.protein * (food.servings || 1)}g</td>
                                            <td>{food.carbs * (food.servings || 1)}g</td>
                                            <td>{food.fats * (food.servings || 1)}g</td>
                                            <td>
                                                <button
                                                    className={styles["delete-food-btn"]}
                                                    onClick={() => removeFood(foodIndex)}
                                                >
                                                    ❌
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
                <button onClick={handleSaveMealPlan} className={styles["save-meal-plan-btn"]}>Save Meal Plan</button>
            </div>
            <Footer />
        </>
    );
}