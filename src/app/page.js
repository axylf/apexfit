import NavBar from "../components/NavBar";

export default function Home() {
    return (
        <>
            <NavBar />
            <main className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-4xl font-bold mb-4">Welcome to ApexFitness</h1>
                <p className="text-lg text-gray-700">Track workouts, log progress, and stay fit!</p>
            </main>
        </>

    );
}