"use client";

import { useState, useEffect } from "react";
import { FaRegEdit } from "react-icons/fa";
import NavBar from "../../components/NavBar";
import styles from "./dashboard.module.css";
import Link from "next/link";

export default function Dashboard() {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(""); // Initialize with an empty string
    const [feature, setFeature] = useState("Fitness Enthusiast");

    // On component mount, check if name exists in localStorage and set it
    useEffect(() => {
        const savedName = localStorage.getItem("userName");
        if (savedName) {
            setName(savedName); // Set the name from localStorage
        } else {
            setName("John Doe"); // Default name
        }
    }, []);

    const handleSave = () => {
        console.log("Saved:", name, feature);
        localStorage.setItem("userName", name); // Save name to localStorage
        setIsEditing(false); // Stop editing mode
    };

    const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"];
    const nutritionData = {
        consumed: 0,
        remaining: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
    };

    return (
        <div className={styles.dashboardContainer}>
            <NavBar />
            {/* Buttons Bar */}
            <div className={styles.buttonBar}>
                <Link href="/dashboard" className={styles.barButton}>Home</Link>
                <Link href="/dashboard/diet" className={styles.barButton}>Diet</Link>
                <Link href="/dashboard/workout" className={styles.barButton}>Workout</Link>
            </div>

            <hr className={styles.barDivider} />

            {/* Profile and Calorie Box Container */}
            <div className={styles.profileCalorieContainer}>
                {/* Profile Box */}
                <div className={styles.profileBox}>
                    <div className={styles.profileHeader}>
                        <div className={styles.profilePic}>{name.slice(0, 2).toUpperCase()}</div> {/* Initials */}
                        <button 
                            className={styles.editButton} 
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            <FaRegEdit size={20} />
                        </button>
                    </div>
                    {isEditing ? (
                        <div className={styles.profileEditForm}>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)} // Update name
                            />
                            <input
                                type="text"
                                value={feature}
                                onChange={(e) => setFeature(e.target.value)} // Update feature
                            />
                            <button 
                                className={styles.saveButton} 
                                onClick={handleSave}
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <>
                            <h3>{name}</h3>
                            <p>{feature}</p>
                        </>
                    )}

                    <div className={styles.profileStats}>
                        <div className={styles.profileStatItem}>
                            <h4>Age</h4>
                            <p>28</p>
                        </div>
                        <div className={styles.profileStatItem}>
                            <h4>Weight</h4>
                            <p>75 kg</p>
                        </div>
                        <div className={styles.profileStatItem}>
                            <h4>Height</h4>
                            <p>180 cm</p>
                        </div>
                    </div>
                </div>

                {/* Calorie Box */}
                <div className={styles.calorieBox}>
                    <h3>Calories</h3>
                    <p>2070</p>
                    <p>Recovery</p>
                    <div className={styles.progressBar}>
                        <div
                            className={styles.progress}
                            style={{ width: "30%" }}
                        ></div>
                    </div>
                </div>
            </div>

            {/* Weekly Nutrition Section */}
            <div className={styles.weeklyNutrition}>
                <h2>Weekly Nutrition</h2>
                <div className={styles.weekDays}>
                    {daysOfWeek.map((day, index) => (
                        <span key={index}>{day}</span>
                    ))}
                </div>

                <div className={styles.nutritionStats}>
                    <div className={styles.statItem}>
                        <h4>Consumed</h4>
                        <p>{nutritionData.consumed} of 1450</p>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progress}
                                style={{ width: `${(nutritionData.consumed / 1450) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className={styles.statItem}>
                        <h4>Remaining</h4>
                        <p>{nutritionData.remaining} of 1450</p>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progress}
                                style={{ width: `${(nutritionData.remaining / 1450) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className={styles.statItem}>
                        <h4>Protein</h4>
                        <p>{nutritionData.protein} of 148</p>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progress}
                                style={{ width: `${(nutritionData.protein / 148) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className={styles.statItem}>
                        <h4>Fat</h4>
                        <p>{nutritionData.fat} of 49</p>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progress}
                                style={{ width: `${(nutritionData.fat / 49) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className={styles.statItem}>
                        <h4>Carbs</h4>
                        <p>{nutritionData.carbs} of 112</p>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progress}
                                style={{ width: `${(nutritionData.carbs / 112) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
