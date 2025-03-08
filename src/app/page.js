import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Home() {
    return (
        <>
            <NavBar />
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h2 className="text-4xl font-bold mb-4">Welcome to ApexFitness</h2>
                <p className="text-lg text-gray-700">Track workouts, log progress, and stay fit!</p>
            </div>
            <Footer/>
        </>

    );
}