import NavBar from "../../components/NavBar";
import styles from "./dashboard.module.css";
import Link from "next/link";

export default function Dashboard() {
    return (
        <div className={styles.dashboardContainer}>
            <NavBar />
            <nav className={styles.navLinks}>
                <Link href="/dashboard">Home</Link>
                <Link href="/dashboard/diet">Diet</Link>
                <Link href="/dashboard/workout">Workout</Link>
            </nav>
            <main className={styles.mainContent}>
                <h1> Have fun designing this Hazerakjshd :D </h1>
            </main>
        </div>
    );
}
