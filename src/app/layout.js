import "../styles/global.css"; // Loads Global Styles

export const metadata = {
    title: "TundraFit",
    description: "A fitness tracker to log workouts and exercises.",
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