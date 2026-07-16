import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WeatherScope — Live Global Weather Dashboard",
  description:
    "Real-time weather conditions across major world cities, powered by the WeatherAI API. Live temperature, forecasts, wind, and AI-generated summaries.",
  keywords: ["weather", "forecast", "live weather", "global weather", "WeatherAI"],
  openGraph: {
    title: "WeatherScope",
    description: "Real-time weather dashboard powered by WeatherAI",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
