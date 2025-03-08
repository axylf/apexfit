import NavBar from "../../components/NavBar";
import styles from "./dashboard.module.css";
import Link from "next/link";

export default function Dashboard() {
    const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"]; // Days of the week
    const nutritionData = {
        consumed: 0, // Example data
        remaining: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
    };

    return (
        <div className={styles.dashboardContainer}>
            <NavBar />
            <div className={styles.navLinks}>
                <Link href="/dashboard">Home</Link>
                <Link href="/dashboard/diet">Diet</Link>
                <Link href="/dashboard/workout">Workout</Link>
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
