import "../styles/global.css"; // Loads Global Styles

export const metadata = {
    title: "ApexFit",
    description: "An all-in-one fitness and wellness tracker to log meals, workouts, and exercises.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body>{children}</body>
        </html>
    );
}