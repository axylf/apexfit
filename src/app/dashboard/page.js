import NavBar from "../../components/NavBar";
import styles from "./dashboard.module.css";
import Link from "next/link";

export default function Dashboard() {
    return (
        <div className={styles.dashboardContainer}>
            <NavBar />
            <div className={styles.navLinks}>
                <Link href="/dashboard">Home</Link>
                <Link href="/dashboard/diet">Diet</Link>
                <Link href="/dashboard/workout">Workout</Link>
            </div>
        </div>
    );
}
